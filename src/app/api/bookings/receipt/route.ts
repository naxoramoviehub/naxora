import { NextResponse } from 'next/server';
import { z } from 'zod';
import { createSupabaseAdminClient } from '@/lib/supabase-server';
import { rateLimit, requestKey } from '@/lib/rate-limit';

const schema = z.object({ id: z.string().min(8).max(32), public_token: z.string().uuid(), receiptBase64: z.string().max(4_000_000).regex(/^data:image\/(png|jpeg|webp);base64,/), receiptFilename: z.string().max(120).optional() });
export async function POST(request: Request) {
  if (!rateLimit(requestKey(request, 'receipt'), 4, 10 * 60_000)) return NextResponse.json({ error: 'Too many uploads.' }, { status: 429 });
  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: 'Use a PNG, JPEG, or WebP image under 3 MB.' }, { status: 400 });
  const db = createSupabaseAdminClient();
  const { data, error } = await db.from('bookings').update({ receipt_url: parsed.data.receiptBase64, receipt_filename: parsed.data.receiptFilename || '' }).eq('id', parsed.data.id).eq('public_token', parsed.data.public_token).select().maybeSingle();
  if (error || !data) return NextResponse.json({ error: 'Booking could not be verified.' }, { status: 403 });
  return NextResponse.json({ booking: data });
}
