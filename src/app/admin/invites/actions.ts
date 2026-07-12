'use server';

import { revalidatePath } from 'next/cache';
import { createInviteCode, sendAdminMail } from '@/lib/admin-invites';
import { createSupabaseAdminClient, requireAdmin } from '@/lib/supabase-server';

export async function reviewInvite(formData: FormData) {
  const session = await requireAdmin();
  if (!session || session.role !== 'super_admin') throw new Error('Unauthorized');
  const id = String(formData.get('id') || '');
  const decision = String(formData.get('decision') || '');
  const db = createSupabaseAdminClient();
  const { data: invite } = await db.from('admin_invites').select('id,email,username,status').eq('id', id).maybeSingle();
  if (!invite || invite.status !== 'pending') return;
  if (decision === 'reject') {
    await db.from('admin_invites').update({ status: 'rejected', approved_by: session.user.id }).eq('id', id);
    await sendAdminMail(invite.email, 'NAXORA administrator request update', 'Your request for NAXORA administrator access was not approved. Contact the super admin if you believe this is an error.');
  } else if (decision === 'approve') {
    const code = createInviteCode();
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();
    await db.from('admin_invites').update({ status: 'approved', invite_code: code, expires_at: expires, approved_at: new Date().toISOString(), approved_by: session.user.id }).eq('id', id);
    await sendAdminMail(invite.email, 'Your NAXORA administrator invite code', `Your administrator request was approved.\n\nInvite code: ${code}\n\nThis one-time code expires in 24 hours. Return to /admin/auth/sign-up and enter this email, the code, your chosen username, and your password.`);
  }
  revalidatePath('/admin/invites');
}
