import type { Metadata } from 'next';
import { Suspense } from 'react';
import { redirect } from 'next/navigation';
import { ShieldCheck, Trash2, UserCog, Mail, Calendar } from 'lucide-react';
import { createSupabaseAdminClient, requireAdmin } from '@/lib/supabase-server';
import { deleteAdministrator } from './actions';
import AdminLayout from '@/components/admin/AdminLayout';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';

export const metadata: Metadata = { title: 'Manage administrators', robots: { index: false, follow: false } };

async function AdministratorList() {
  const session = await requireAdmin();
  if (!session || session.role !== 'super_admin') redirect('/admin');
  const db = createSupabaseAdminClient();
  const { data: administrators } = await db.from('admin_users').select('user_id,email,username,display_name,role,created_at').order('created_at', { ascending: true });
  
  return (
    <div className="space-y-4">
      {administrators?.map((administrator) => {
        const protectedAccount = administrator.role === 'super_admin';
        return (
          <Card key={administrator.user_id} glowColor="none" className="p-6 border border-glass-stroke">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className={`grid h-14 w-14 place-items-center rounded-xl ${protectedAccount ? 'bg-primary/15 text-primary' : 'bg-white/5 text-slate-400'}`}>
                  {protectedAccount ? <ShieldCheck className="h-7 w-7" /> : <UserCog className="h-7 w-7" />}
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h2 className="font-sans font-bold text-white text-lg">
                      {administrator.username || administrator.display_name || 'Administrator'}
                    </h2>
                    <Badge
                      variant={protectedAccount ? 'primary' : 'secondary'}
                      className={
                        protectedAccount 
                          ? '!bg-primary/20 !text-primary !border-primary/30' 
                          : '!bg-surface-container/30 !text-on-surface-variant !border-glass-stroke'
                      }
                    >
                      {administrator.role.replace('_', ' ')}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-on-surface-variant">
                    <div className="flex items-center gap-1.5">
                      <Mail className="w-4 h-4" />
                      <span>{administrator.email}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4" />
                      <span>Added {new Date(administrator.created_at).toLocaleDateString('en-LK')}</span>
                    </div>
                  </div>
                </div>
              </div>
              {protectedAccount ? (
                <span className="text-xs font-semibold text-slate-500 px-3 py-1.5 bg-surface-container/30 rounded-lg">
                  Protected account
                </span>
              ) : (
                <form action={deleteAdministrator}>
                  <input type="hidden" name="userId" value={administrator.user_id} />
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="!text-red-400 flex items-center gap-2"
                  >
                    <Trash2 className="h-4 w-4" />
                    Delete
                  </Button>
                </form>
              )}
            </div>
          </Card>
        );
      })}
    </div>
  );
}

export default function Page() {
  return (
    <AdminLayout 
      title="Administrators" 
      subtitle="Manage admin accounts and permissions"
    >
      <Suspense fallback={
        <div className="rounded-2xl border border-glass-stroke p-12 text-center text-on-surface-variant">
          Loading administrators…
        </div>
      }>
        <AdministratorList />
      </Suspense>
    </AdminLayout>
  );
}
