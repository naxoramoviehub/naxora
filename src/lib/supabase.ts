import { createBrowserClient } from '@supabase/ssr';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
// Support both the legacy anon key name and the newer publishable key name
const supabaseKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  '';

export const supabase =
  supabaseUrl && supabaseKey
    ? createBrowserClient(supabaseUrl, supabaseKey)
    : null;
