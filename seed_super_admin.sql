-- Seed Super Admin User
-- IMPORTANT: First create the auth user in Supabase Dashboard:
-- 1. Go to Authentication → Users
-- 2. Click "Add user" 
-- 3. Email: naxoramoviehub@gmail.com
-- 4. Password: !]GL2zjmh02o
-- 5. Auto-confirm user: YES
-- 6. Create the user
-- 7. Copy the user ID from the user details page
-- 8. Replace 'YOUR_USER_ID_HERE' below with the actual user ID

-- Then run this SQL to add the admin_users entry
INSERT INTO public.admin_users (user_id, email, display_name, username, role)
VALUES (
    'YOUR_USER_ID_HERE',  -- Replace this with the actual user ID from Supabase Dashboard
    'naxoramoviehub@gmail.com',
    'Super Admin',
    'naxoramoviehub',
    'super_admin'
)
ON CONFLICT (user_id) DO UPDATE SET
    role = 'super_admin',
    username = 'naxoramoviehub',
    display_name = 'Super Admin';
