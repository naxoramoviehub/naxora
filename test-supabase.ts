import { createClient } from '@supabase/supabase-js';

const url = 'https://bvhxakhywkowbhesjlmo.supabase.co';
const key = 'sb_publishable_5HLja_22yuBy1psIjTVOOA_rS9f5jNC';

async function main() {
  console.log('Testing Supabase connection...');
  console.log('URL:', url);
  console.log('Key:', key.substring(0, 20) + '...');

  try {
    const supabase = createClient(url, key);
    const { data, error } = await supabase.from('bookings').select('count').limit(1);
    
    if (error) {
      console.error('Supabase query error:', error);
    } else {
      console.log('✅ Supabase connection successful!');
      console.log('Data:', data);
    }
  } catch (err) {
    console.error('Connection failed:', err);
  }
}

main();
