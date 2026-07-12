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

-- ──────────────────────────────────────────────────────────────────────────────
-- Schema setup complete. No seed data — bookings are created through the app.
-- ──────────────────────────────────────────────────────────────────────────────
