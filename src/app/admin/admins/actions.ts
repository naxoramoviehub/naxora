'use server';

import { revalidatePath } from 'next/cache';
import { createSupabaseAdminClient, requireAdmin } from '@/lib/supabase-server';
import { SUPER_ADMIN_EMAIL } from '@/lib/admin-invites';

export async function deleteAdministrator(formData: FormData) {
  const session = await requireAdmin();
  if (!session || session.role !== 'super_admin') throw new Error('Unauthorized');
  const userId = String(formData.get('userId') || '');
  if (!userId || userId === session.user.id) throw new Error('The active super-admin account cannot be deleted.');
  const db = createSupabaseAdminClient();
  const { data: target } = await db.from('admin_users').select('email,role').eq('user_id', userId).maybeSingle();
  if (!target) return;
  if (target.role === 'super_admin' || target.email.toLowerCase() === SUPER_ADMIN_EMAIL) throw new Error('The primary super-admin account cannot be deleted.');
  const { error } = await db.auth.admin.deleteUser(userId);
  if (error) throw new Error('Could not delete the administrator account.');
  revalidatePath('/admin/admins');
}
