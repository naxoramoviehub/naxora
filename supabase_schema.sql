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
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- 2. Create Policies for Public Access
-- Allow anyone to insert (public booking creation)
CREATE POLICY "Allow public booking creation"
ON public.bookings
FOR INSERT
WITH CHECK (true);

-- Allow public to select bookings
CREATE POLICY "Allow public select by ID"
ON public.bookings
FOR SELECT
USING (true);

-- Allow public to update (needed for receipt upload after booking)
CREATE POLICY "Allow public receipt update"
ON public.bookings
FOR UPDATE
USING (true)
WITH CHECK (true);

-- 3. Create Admin Policies (requires authenticated user)
-- Allow authenticated admins full control (select, update, delete)
CREATE POLICY "Allow admin full access"
ON public.bookings
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- ──────────────────────────────────────────────────────────────────────────────
-- MIGRATION: Run these ALTER statements if the table already exists
-- (safe to run even if columns already exist — will error but not break anything)
-- ──────────────────────────────────────────────────────────────────────────────
ALTER TABLE public.bookings ADD COLUMN IF NOT EXISTS package_title TEXT DEFAULT '';
ALTER TABLE public.bookings ADD COLUMN IF NOT EXISTS booking_time_display TEXT DEFAULT '';
ALTER TABLE public.bookings ADD COLUMN IF NOT EXISTS receipt_filename TEXT DEFAULT '';
ALTER TABLE public.bookings ADD COLUMN IF NOT EXISTS amount_due TEXT DEFAULT '';

-- 4. Sample Seed Data (Optional)
INSERT INTO public.bookings (id, customer_name, customer_email, customer_phone, experience_id, package_title, booking_date, booking_time, booking_time_display, notes, status, amount_due)
VALUES
('NX-8421', 'Dulitha Wijetunge', 'dulitha@example.com', '+94 77 123 4567', 'gold', 'Gold VIP Cabin', CURRENT_DATE, '13:00', '01:00 PM - 04:00 PM', 'Please arrange a birthday cake setup.', 'confirmed', '3000 LKR'),
('NX-1029', 'Sarah Connor', 'sarah@example.com', '+94 71 987 6543', 'platinum', 'Platinum Gamer Suite', CURRENT_DATE, '20:00', '08:00 PM - 11:00 PM', 'Prefer Xbox controllers if available.', 'pending', '3450 LKR')
ON CONFLICT (id) DO NOTHING;
