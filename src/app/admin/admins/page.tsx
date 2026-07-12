import type { Metadata } from 'next';
import Link from 'next/link';
import { Suspense } from 'react';
import { redirect } from 'next/navigation';
import { ShieldCheck, Trash2, UserCog } from 'lucide-react';
import { createSupabaseAdminClient, requireAdmin } from '@/lib/supabase-server';
import { deleteAdministrator } from './actions';

export const metadata: Metadata = { title: 'Manage administrators', robots: { index: false, follow: false } };

async function AdministratorList() {
  const session = await requireAdmin();
  if (!session || session.role !== 'super_admin') redirect('/admin');
  const db = createSupabaseAdminClient();
  const { data: administrators } = await db.from('admin_users').select('user_id,email,username,display_name,role,created_at').order('created_at', { ascending: true });
  return <div className="space-y-4">{administrators?.map((administrator) => {
    const protectedAccount = administrator.role === 'super_admin';
    return <article key={administrator.user_id} className="flex flex-col gap-5 rounded-2xl border border-white/10 bg-surface-container/70 p-5 sm:flex-row sm:items-center sm:justify-between"><div className="flex items-center gap-4"><span className={`grid h-12 w-12 place-items-center rounded-xl ${protectedAccount ? 'bg-primary/15 text-primary' : 'bg-white/5 text-slate-400'}`}>{protectedAccount ? <ShieldCheck className="h-6 w-6" /> : <UserCog className="h-6 w-6" />}</span><div><div className="flex flex-wrap items-center gap-2"><h2 className="font-bold">{administrator.username || administrator.display_name || 'Administrator'}</h2><span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary">{administrator.role.replace('_', ' ')}</span></div><p className="mt-1 text-sm text-on-surface-variant">{administrator.email}</p><p className="mt-1 text-xs text-slate-600">Added {new Date(administrator.created_at).toLocaleDateString('en-LK')}</p></div></div>{protectedAccount ? <span className="text-xs font-semibold text-slate-500">Protected account</span> : <form action={deleteAdministrator}><input type="hidden" name="userId" value={administrator.user_id} /><button className="inline-flex items-center gap-2 rounded-lg border border-red-400/20 px-4 py-2 text-sm font-semibold text-red-300 transition hover:bg-red-500/10"><Trash2 className="h-4 w-4" />Delete administrator</button></form>}</article>;
  })}</div>;
}

export default function Page() {
  return <main id="main-content" className="min-h-screen bg-background px-5 py-12 text-white"><div className="mx-auto max-w-5xl"><div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"><div><p className="text-xs font-bold uppercase tracking-[.2em] text-primary">Super-admin controls</p><h1 className="mt-2 text-3xl font-bold">Manage administrators</h1><p className="mt-2 text-on-surface-variant">Review active administrator accounts and permanently revoke access.</p></div><div className="flex gap-2"><Link href="/admin/invites" className="rounded-xl border border-primary/30 px-4 py-2 text-sm text-primary">Access requests</Link><Link href="/admin" className="rounded-xl border border-glass-stroke px-4 py-2 text-sm">Dashboard</Link></div></div><Suspense fallback={<p className="rounded-2xl border border-glass-stroke p-8 text-center text-on-surface-variant">Loading administrators…</p>}><AdministratorList /></Suspense></div></main>;
}
