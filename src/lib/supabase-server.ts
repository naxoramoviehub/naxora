import 'server-only';
import { createServerClient } from '@supabase/ssr';
import { createClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';

function config() {
  const url = 'https://bvhxakhywkowbhesjlmo.supabase.co';
  const key = 'sb_publishable_5HLja_22yuBy1psIjTVOOA_rS9f5jNC';
  if (!url || !key) throw new Error('Supabase public environment variables are not configured.');
  return { url, key };
}

export async function createSupabaseServerClient() {
  const { url, key } = config();
  const store = await cookies();
  return createServerClient(url, key, {
    cookies: {
      getAll: () => store.getAll(),
      setAll: (items) => {
        try { items.forEach(({ name, value, options }) => store.set(name, value, options)); } catch { /* Server Component */ }
      },
    },
  });
}

export function createSupabaseAdminClient() {
  const url = 'https://bvhxakhywkowbhesjlmo.supabase.co';
  const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ2aHhha2h5d2tvd2JoZXNqbG1vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MjU2Mjc4OSwiZXhwIjoyMDk4MTM4Nzg5fQ.-RKAfS1KYDnaFomMOEbPkTRPWfJNdsMYHnLmGAUilqg';
  if (!url || !key) throw new Error('Supabase service-role environment variables are not configured.');
  return createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
}

export async function requireAdmin() {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;
  const { data } = await supabase.from('admin_users').select('user_id,role').eq('user_id', user.id).maybeSingle();
  return data ? { supabase, user, role: data.role as 'admin' | 'super_admin' } : null;
}
