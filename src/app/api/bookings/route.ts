import { NextResponse } from 'next/server';
import { z } from 'zod';
import { createSupabaseAdminClient } from '@/lib/supabase-server';
import { getExperience, formatLkr } from '@/lib/packages';
import { rateLimit, requestKey } from '@/lib/rate-limit';
import { sendAdminBookingNotification } from '@/lib/email';

const schema = z.object({
  customer_name: z.string().trim().min(2).max(80), customer_email: z.string().email().max(160),
  customer_phone: z.string().trim().min(7).max(24), experience_id: z.string().max(40),
  booking_date: z.string().date(), booking_time: z.enum(['09:30','13:00','16:30','20:00']),
  notes: z.string().trim().max(500).default(''),
});

export async function POST(request: Request) {
  if (!rateLimit(requestKey(request, 'booking'), 5, 10 * 60_000)) return NextResponse.json({ error: 'Too many booking attempts. Please try later.' }, { status: 429 });
  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: 'Please check the booking details.' }, { status: 400 });
  const experience = getExperience(parsed.data.experience_id);
  if (!experience) return NextResponse.json({ error: 'Package not found.' }, { status: 404 });
  const date = new Date(`${parsed.data.booking_date}T00:00:00+05:30`);
  const today = new Date(); today.setHours(0,0,0,0);
  if (Number.isNaN(date.valueOf()) || date < today) return NextResponse.json({ error: 'Choose a future booking date.' }, { status: 400 });
  const slot = ({ '09:30':'09:30 AM - 12:30 PM', '13:00':'01:00 PM - 04:00 PM', '16:30':'04:30 PM - 07:30 PM', '20:00':'08:00 PM - 11:00 PM' } as const)[parsed.data.booking_time];
  const db = createSupabaseAdminClient();
  const id = `NX-${crypto.randomUUID().replaceAll('-', '').slice(0, 10).toUpperCase()}`;
  const { data, error } = await db.from('bookings').insert({ ...parsed.data, id, package_title: experience.title, booking_time_display: slot, amount_due: formatLkr(experience.price), status: 'pending' }).select().single();
  if (error?.code === '23505') return NextResponse.json({ error: 'That time was just reserved. Please choose another slot.' }, { status: 409 });
  if (error) return NextResponse.json({ error: 'Could not create the booking.' }, { status: 500 });
  
  // Send admin notification email
  try {
    await sendAdminBookingNotification(data);
  } catch (emailError) {
    console.error('Failed to send admin notification email:', emailError);
  }
  
  return NextResponse.json({ booking: data }, { status: 201 });
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const date = url.searchParams.get('date'); const experience = url.searchParams.get('experience');
  if (!date || !experience) return NextResponse.json({ error: 'Missing query.' }, { status: 400 });
  const db = createSupabaseAdminClient();
  const { data, error } = await db.from('bookings').select('booking_time,status').eq('booking_date', date).eq('experience_id', experience).neq('status', 'cancelled');
  if (error) return NextResponse.json({ error: 'Could not load availability.' }, { status: 500 });
  return NextResponse.json({ slots: (data || []).map((row) => ({ time: row.booking_time, status: row.status })) });
}
