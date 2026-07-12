-- NAXORA Supabase Database Schema
-- Run this SQL in your Supabase SQL Editor to set up the tables for booking management.

-- 1. Create Bookings Table
CREATE TABLE IF NOT EXISTS public.bookings (
    id TEXT PRIMARY KEY, -- Alphanumeric short ID (e.g. NX-2938)
    customer_name TEXT NOT NULL,
    customer_email TEXT NOT NULL,
    customer_phone TEXT NOT NULL,
    experience_id TEXT NOT NULL,
    package_title TEXT DEFAULT '',         -- Human-readable package name
    booking_date DATE NOT NULL,
    booking_time TEXT NOT NULL, -- HH:MM formatted
    booking_time_display TEXT DEFAULT '',  -- Human-readable time slot display (e.g. 09:30 AM - 12:30 PM)
    notes TEXT DEFAULT '',
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled')),
    receipt_url TEXT DEFAULT '',           -- Base64 encoded receipt image
    receipt_filename TEXT DEFAULT '',      -- Original filename of the receipt
    amount_due TEXT DEFAULT '',            -- Package price string (e.g. "2350 LKR")
    public_token UUID NOT NULL DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.admin_users (
    user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL UNIQUE,
    display_name TEXT NOT NULL DEFAULT '',
    username TEXT UNIQUE,
    role TEXT NOT NULL DEFAULT 'admin' CHECK (role IN ('admin', 'super_admin')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

CREATE TABLE IF NOT EXISTS public.admin_invites (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username TEXT UNIQUE,
    email TEXT NOT NULL UNIQUE,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'used', 'rejected')),
    invite_code TEXT UNIQUE,
    expires_at TIMESTAMP WITH TIME ZONE,
    requested_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    approved_at TIMESTAMP WITH TIME ZONE,
    approved_by UUID REFERENCES auth.users(id)
);

ALTER TABLE public.admin_invites ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_users ADD COLUMN IF NOT EXISTS role TEXT NOT NULL DEFAULT 'admin';
ALTER TABLE public.admin_users ADD COLUMN IF NOT EXISTS username TEXT UNIQUE;
ALTER TABLE public.admin_invites ALTER COLUMN username DROP NOT NULL;
DROP POLICY IF EXISTS "Super admins manage invitations" ON public.admin_invites;
CREATE POLICY "Super admins manage invitations" ON public.admin_invites FOR ALL TO authenticated
USING (EXISTS (SELECT 1 FROM public.admin_users a WHERE a.user_id = auth.uid() AND a.role = 'super_admin'))
WITH CHECK (EXISTS (SELECT 1 FROM public.admin_users a WHERE a.user_id = auth.uid() AND a.role = 'super_admin'));

ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Admins can read their membership" ON public.admin_users;
CREATE POLICY "Admins can read their membership" ON public.admin_users FOR SELECT TO authenticated
USING (user_id = auth.uid());

-- Enable Row Level Security (RLS)
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public booking creation" ON public.bookings;
DROP POLICY IF EXISTS "Allow public select by ID" ON public.bookings;
DROP POLICY IF EXISTS "Allow public receipt update" ON public.bookings;
DROP POLICY IF EXISTS "Allow admin full access" ON public.bookings;
DROP POLICY IF EXISTS "Allow public pending booking creation" ON public.bookings;
DROP POLICY IF EXISTS "Allow authorized admin full access" ON public.bookings;

-- 2. Minimal public access: customers can only create a pending booking.
-- Allow anyone to insert (public booking creation)
CREATE POLICY "Allow public pending booking creation"
ON public.bookings
FOR INSERT
TO anon
WITH CHECK (status = 'pending');

-- 3. Create Admin Policies (requires authenticated user)
-- Allow authenticated admins full control (select, update, delete)
CREATE POLICY "Allow authorized admin full access"
ON public.bookings
FOR ALL
TO authenticated
USING (EXISTS (SELECT 1 FROM public.admin_users a WHERE a.user_id = auth.uid()))
WITH CHECK (EXISTS (SELECT 1 FROM public.admin_users a WHERE a.user_id = auth.uid()));

-- Prevent double-booking at the database level. Cancelled bookings do not occupy a slot.
CREATE UNIQUE INDEX IF NOT EXISTS bookings_active_slot_unique
ON public.bookings (experience_id, booking_date, booking_time)
WHERE status <> 'cancelled';

-- ──────────────────────────────────────────────────────────────────────────────
-- MIGRATION: Run these ALTER statements if the table already exists
-- (safe to run even if columns already exist — will error but not break anything)
-- ──────────────────────────────────────────────────────────────────────────────
ALTER TABLE public.bookings ADD COLUMN IF NOT EXISTS package_title TEXT DEFAULT '';
ALTER TABLE public.bookings ADD COLUMN IF NOT EXISTS booking_time_display TEXT DEFAULT '';
ALTER TABLE public.bookings ADD COLUMN IF NOT EXISTS receipt_filename TEXT DEFAULT '';
ALTER TABLE public.bookings ADD COLUMN IF NOT EXISTS amount_due TEXT DEFAULT '';
ALTER TABLE public.admin_users ADD COLUMN IF NOT EXISTS role TEXT NOT NULL DEFAULT 'admin';
UPDATE public.admin_users SET role = 'super_admin' WHERE lower(email) = 'naxoramoviehub@gmail.com';
ALTER TABLE public.bookings ADD COLUMN IF NOT EXISTS public_token UUID DEFAULT gen_random_uuid();
UPDATE public.bookings SET public_token = gen_random_uuid() WHERE public_token IS NULL;
ALTER TABLE public.bookings ALTER COLUMN public_token SET NOT NULL;
CREATE UNIQUE INDEX IF NOT EXISTS bookings_public_token_unique ON public.bookings(public_token);

-- Packages Table
CREATE TABLE IF NOT EXISTS public.packages (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT DEFAULT '',
    price TEXT NOT NULL,
    price_numeric INTEGER NOT NULL,
    capacity TEXT DEFAULT 'Max 1 Pax',
    duration TEXT DEFAULT '2.5 Hours',
    extra_hour TEXT DEFAULT '900 LKR',
    image TEXT DEFAULT '/image-from-rawpixel-id-12136149-jpeg.jpg',
    category TEXT DEFAULT 'cinema',
    features TEXT[] DEFAULT '{}',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

ALTER TABLE public.packages ENABLE ROW LEVEL SECURITY;

-- Add new columns if they don't exist
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'packages' AND column_name = 'duration') THEN
        ALTER TABLE public.packages ADD COLUMN duration TEXT DEFAULT '2.5 Hours';
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'packages' AND column_name = 'extra_hour') THEN
        ALTER TABLE public.packages ADD COLUMN extra_hour TEXT DEFAULT '900 LKR';
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'packages' AND column_name = 'image') THEN
        ALTER TABLE public.packages ADD COLUMN image TEXT DEFAULT '/image-from-rawpixel-id-12136149-jpeg.jpg';
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'packages' AND column_name = 'category') THEN
        ALTER TABLE public.packages ADD COLUMN category TEXT DEFAULT 'cinema';
    END IF;
    
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'packages' AND column_name = 'capacity' AND data_type = 'integer') THEN
        ALTER TABLE public.packages ALTER COLUMN capacity TYPE TEXT USING 'Max ' || capacity || ' Pax';
    END IF;
END $$;

DROP POLICY IF EXISTS "Allow admin full access on packages" ON public.packages;
CREATE POLICY "Allow admin full access on packages"
ON public.packages
FOR ALL
TO authenticated
USING (EXISTS (SELECT 1 FROM public.admin_users a WHERE a.user_id = auth.uid()))
WITH CHECK (EXISTS (SELECT 1 FROM public.admin_users a WHERE a.user_id = auth.uid()));

-- Seed Packages Data
INSERT INTO public.packages (id, title, description, price, price_numeric, capacity, duration, extra_hour, image, category, features) VALUES
('mini-cabin', 'Mini Cabin Suite', 'Intimate private lounge perfect for couples or small groups.', '2350 LKR', 2350, 'Max 3 Pax', '2.5 Hours', '900 LKR', '/image-from-rawpixel-id-12136149-jpeg.jpg', 'cinema', ARRAY['Netflix / YouTube HD', 'Comfortable Sofa Cabin', '1080p Laser Projector', '5.1 Positional Audio']),
('elite-silver', 'Elite Silver Suite', 'Enhanced screen size and audio fidelity for a cinematic experience.', '2550 LKR', 2550, 'Max 4 Pax', '3.0 Hours', '900 LKR', '/image-from-rawpixel-id-14510238-jpeg.jpg', 'cinema', ARRAY['Netflix / YouTube HD', 'Premium Leather Recliners', 'Full HD Projector System', '5.1 Surround Sound Array']),
('gold', 'Gold VIP Cabin', 'Complete luxury with climate-control air conditioning and 4K resolution.', '3000 LKR', 3000, 'Max 4 Pax', '3.0 Hours', '1000 LKR', '/gold_vip_cabin.png', 'cinema', ARRAY['Climate A/C Control', 'Premium Reclining Sofa', 'Native 4K Projector Screen', '7.1 Positional Audio Setup']),
('platinum', 'Platinum Gamer Suite', 'High-performance console gaming setup coupled with cinematic movie streams.', '3450 LKR', 3450, 'Max 4 Pax', '3.0 Hours', '1000 LKR', '/image-from-rawpixel-id-12136149-jpeg.jpg', 'gaming', ARRAY['PS5 / PS4 Pro Console', '4 Wireless Controllers', 'Climate A/C Control', '7.1 Sound & 4K Projector']),
('royal', 'Royal VIP Suite', 'Generous suite size designed for larger family viewings or group co-op gaming.', '5300 LKR', 5300, 'Max 6 Pax', '3.0 Hours', '1300 LKR', '/image-from-rawpixel-id-14510238-jpeg.jpg', 'celebration', ARRAY['VIP Lounge Seating', 'PS5 Console / PS4 Pro', 'Large 4K Laser Screen', '7.1 Positional Audio Setup']),
('lite-celebration', 'Lite Celebration Package', 'Ideal package for hosting surprise birthday parties or small milestones.', '6250 LKR', 6250, 'Max 6 Pax', '3.0 Hours', '1600 LKR', '/gold_vip_cabin.png', 'celebration', ARRAY['Balloon & Banner Setup', 'Pro Wireless Karaoke Mics', 'PS5 / PS4 Pro System', 'Beverages & Catering Space']),
('grand-celebration', 'Grand Celebration Package', 'Our ultimate luxury party package with extended duration and full decorations.', '8950 LKR', 8950, 'Max 8 Pax', '4.0 Hours', '1900 LKR', '/gold_vip_cabin.png', 'celebration', ARRAY['Full Balloon Theme Decor', 'Extended 4-Hour Block', 'Wireless Dual Karaoke Mics', 'PS5 Console + Games Suite', 'Complimentary Snack Tray'])
ON CONFLICT (id) DO NOTHING;

-- ──────────────────────────────────────────────────────────────────────────────
-- Schema setup complete. Packages seeded with existing offerings.
-- ──────────────────────────────────────────────────────────────────────────────
