import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { createSupabaseAdminClient, requireAdmin } from '@/lib/supabase-server';
import { reviewInvite } from './actions';
import { Suspense } from 'react';

export const metadata: Metadata = { title: 'Admin invitations', robots: { index: false, follow: false } };

async function InviteList() {
  const session = await requireAdmin();
  if (!session || session.role !== 'super_admin') redirect('/admin');
  const db = createSupabaseAdminClient();
  const { data } = await db.from('admin_invites').select('id,username,email,status,requested_at,expires_at').order('requested_at', { ascending: false });
  return <main className="min-h-screen bg-background px-5 py-12 text-white"><div className="mx-auto max-w-5xl"><div className="mb-8 flex items-center justify-between"><div><p className="text-xs font-bold uppercase tracking-[.2em] text-primary">Super admin</p><h1 className="text-3xl font-bold">Administrator invitations</h1></div><Link href="/admin" className="rounded-xl border border-glass-stroke px-4 py-2 text-sm">Back to dashboard</Link></div><div className="space-y-4">{!data?.length && <p className="rounded-2xl border border-glass-stroke p-8 text-center text-on-surface-variant">No access requests yet.</p>}{data?.map((invite) => <article key={invite.id} className="flex flex-col gap-4 rounded-2xl border border-glass-stroke bg-surface-container p-5 sm:flex-row sm:items-center sm:justify-between"><div><h2 className="font-bold">Access request</h2><p className="text-sm text-on-surface-variant">{invite.email}</p><p className="mt-1 text-xs uppercase tracking-wide text-primary">{invite.status}</p></div>{invite.status === 'pending' && <form action={reviewInvite} className="flex gap-2"><input type="hidden" name="id" value={invite.id} /><button name="decision" value="reject" className="rounded-lg border border-red-400/30 px-4 py-2 text-sm text-red-300">Reject</button><button name="decision" value="approve" className="rounded-lg bg-primary px-4 py-2 text-sm font-bold">Approve & email code</button></form>}</article>)}</div></div></main>;
}

export default function Page() {
  return <Suspense fallback={<main className="min-h-screen bg-background p-12 text-center text-on-surface-variant">Loading invitations…</main>}><InviteList /></Suspense>;
}
