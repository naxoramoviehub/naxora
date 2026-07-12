import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://bvhxakhywkowbhesjlmo.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ2aHhha2h5d2tvd2JoZXNqbG1vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MjU2Mjc4OSwiZXhwIjoyMDk4MTM4Nzg5fQ.-RKAfS1KYDnaFomMOEbPkTRPWfJNdsMYHnLmGAUilqg';

const admin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});

async function seedSuperAdmin() {
  const email = 'naxoramoviehub@gmail.com';
  const password = '!]GL2zjmh02o';
  const username = 'naxoramoviehub';

  console.log('Creating super admin user...');

  // Check if user already exists
  const { data: existingUser, error: checkError } = await admin.auth.admin.listUsers();
  if (checkError) {
    console.error('Error checking existing users:', checkError);
    process.exit(1);
  }

  const userExists = existingUser.users.find(u => u.email === email);

  let userId: string;

  if (userExists) {
    console.log('User already exists in auth.users, updating password and role...');
    userId = userExists.id;
    
    // Update the user's password
    const { error: updateError } = await admin.auth.admin.updateUserById(userId, {
      password: password,
      email_confirm: true,
    });
    
    if (updateError) {
      console.error('Error updating user password:', updateError);
      process.exit(1);
    }
  } else {
    console.log('Creating new auth user...');
    // Create the auth user
    const { data: newUser, error: createError } = await admin.auth.admin.createUser({
      email: email,
      password: password,
      email_confirm: true,
      user_metadata: {
        username: username,
      },
    });

    if (createError || !newUser.user) {
      console.error('Error creating auth user:', createError);
      process.exit(1);
    }

    userId = newUser.user.id;
    console.log('Auth user created successfully');
  }

  // Insert or update the admin_users entry
  const { error: adminError } = await admin
    .from('admin_users')
    .upsert({
      user_id: userId,
      email: email,
      display_name: 'Super Admin',
      username: username,
      role: 'super_admin',
    }, {
      onConflict: 'user_id',
    });

  if (adminError) {
    console.error('Error creating admin_users entry:', adminError);
    process.exit(1);
  }

  console.log('✅ Super admin seeded successfully!');
  console.log(`Email: ${email}`);
  console.log(`Password: ${password}`);
  console.log(`Username: ${username}`);
  console.log(`Role: super_admin`);
}

seedSuperAdmin().catch(console.error);
