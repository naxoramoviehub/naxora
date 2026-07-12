'use server';

import { z } from 'zod';
import { redirect } from 'next/navigation';
import { createSupabaseAdminClient, createSupabaseServerClient } from '@/lib/supabase-server';
import { sendAdminMail, SUPER_ADMIN_EMAIL } from '@/lib/admin-invites';

export type AuthState = { error?: string; message?: string } | undefined;
const credentials = z.object({ email: z.string().email(), password: z.string().min(8).max(128) });

export async function signIn(_: AuthState, formData: FormData): Promise<AuthState> {
  const parsed = credentials.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { error: 'Enter a valid email and a password of at least 8 characters.' };
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.auth.signInWithPassword(parsed.data);
  if (error || !data.user) return { error: 'Invalid email or password.' };
  const { data: admin } = await supabase.from('admin_users').select('user_id').eq('user_id', data.user.id).maybeSingle();
  if (!admin) { await supabase.auth.signOut(); return { error: 'This account is not authorized as an administrator.' }; }
  redirect('/admin');
}

export async function signUp(_: AuthState, formData: FormData): Promise<AuthState> {
  const values = Object.fromEntries(formData);
  const emailResult = z.string().email().max(160).safeParse(values.email);
  if (!emailResult.success) return { error: 'Enter a valid email address.' };
  try {
    const admin = createSupabaseAdminClient();
    const normalizedEmail = emailResult.data.toLowerCase();
    const isSuperAdmin = normalizedEmail === SUPER_ADMIN_EMAIL;
    const { data: existingAdmin } = await admin.from('admin_users').select('user_id').eq('email', normalizedEmail).maybeSingle();
    if (existingAdmin) return { error: 'An administrator account already exists for this email.' };
    const intent = String(values.intent || 'request');
    if (intent === 'request') {
      if (isSuperAdmin) return { error: 'The primary super admin should use Complete registration; no invite code is required.' };
      const { data: existingInvite } = await admin.from('admin_invites').select('status').eq('email', normalizedEmail).maybeSingle();
      if (existingInvite) return { message: `Your request is already ${existingInvite.status}. Check your email or contact the super admin.` };
      const { error: requestError } = await admin.from('admin_invites').insert({ email: normalizedEmail });
      if (requestError) return { error: 'That email is already registered or awaiting approval.' };
      await sendAdminMail(SUPER_ADMIN_EMAIL, 'NAXORA admin access request', `${normalizedEmail} requested administrator access. Sign in and open /admin/invites to approve or reject the request.`).catch(() => undefined);
      return { message: 'Request sent. After the super admin approves it, a one-time code will be emailed to you.' };
    }
    const completion = credentials.extend({ username: z.string().trim().min(5).max(40).regex(/^[a-zA-Z0-9_-]+$/), confirmPassword: z.string(), inviteCode: z.string().trim().max(32).optional() }).refine((data) => data.password === data.confirmPassword, { message: 'Passwords do not match.', path: ['confirmPassword'] }).safeParse(values);
    if (!completion.success) return { error: completion.error.issues.some((issue) => issue.path.includes('confirmPassword')) ? 'Passwords do not match.' : 'Use a username of at least 5 characters and a password of at least 8 characters.' };
    const { data: usernameOwner } = await admin.from('admin_users').select('user_id').eq('username', completion.data.username).maybeSingle();
    if (usernameOwner) return { error: 'That username is already in use.' };
    if (isSuperAdmin) {
      const supabase = await createSupabaseServerClient();
      const { data, error } = await supabase.auth.signUp({ email: normalizedEmail, password: completion.data.password, options: { data: { username: completion.data.username } } });
      if (error || !data.user) return { error: error?.message || 'Could not create the super-admin account.' };
      const { error: allowError } = await admin.from('admin_users').insert({ user_id: data.user.id, email: normalizedEmail, username: completion.data.username, display_name: completion.data.username, role: 'super_admin' });
      if (allowError) return { error: 'Could not authorize the super-admin account.' };
      return { message: 'Super-admin account created. Check naxoramoviehub@gmail.com for the Supabase confirmation email before signing in.' };
    }
    let inviteId: string | undefined;
    if (!isSuperAdmin) {
      if (!completion.data.inviteCode) return { error: 'Enter the one-time invite code from your approval email.' };
      const { data: invite } = await admin.from('admin_invites').select('id,status,expires_at').eq('email', normalizedEmail).eq('invite_code', completion.data.inviteCode.toUpperCase()).maybeSingle();
      if (!invite || invite.status !== 'approved' || !invite.expires_at || new Date(invite.expires_at) <= new Date()) return { error: 'The invite code is invalid, expired, or not approved.' };
      inviteId = invite.id;
    }
    const { data, error } = await admin.auth.admin.createUser({ email: normalizedEmail, password: completion.data.password, email_confirm: true, user_metadata: { username: completion.data.username } });
    if (error || !data.user) return { error: error?.message || 'Could not create the administrator.' };
    const role = isSuperAdmin ? 'super_admin' : 'admin';
    const { error: allowError } = await admin.from('admin_users').insert({ user_id: data.user.id, email: normalizedEmail, username: completion.data.username, display_name: completion.data.username, role });
    if (allowError) { await admin.auth.admin.deleteUser(data.user.id); return { error: 'Could not authorize the administrator account.' }; }
    if (inviteId) await admin.from('admin_invites').update({ status: 'used', invite_code: null }).eq('id', inviteId);
    return { message: 'Administrator created. You can now sign in.' };
  } catch { return { error: 'Admin sign-up is not configured on this deployment.' }; }
}

export async function signOut() {
  const supabase = await createSupabaseServerClient();
  await supabase.auth.signOut();
  redirect('/admin/auth/sign-in');
}
