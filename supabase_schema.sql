-- NAXORA Supabase Database Schema
-- Run this SQL in your Supabase SQL Editor to set up the tables for booking management.

-- 1. Create Bookings Table
CREATE TABLE IF NOT EXISTS public.bookings (
    id TEXT PRIMARY KEY, -- Alphanumeric short ID (e.g. NX-2938)
    customer_name TEXT NOT NULL,
    customer_email TEXT NOT NULL,
    customer_phone TEXT NOT NULL,
    experience_id TEXT NOT NULL,
    booking_date DATE NOT NULL,
    booking_time TEXT NOT NULL, -- HH:MM formatted
    notes TEXT DEFAULT '',
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled')),
    receipt_url TEXT DEFAULT '',
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

-- Allow public to select their own booking if they know the ID
CREATE POLICY "Allow public select by ID" 
ON public.bookings 
FOR SELECT 
USING (true); -- In production, you might restrict to EQ id or restrict by session

-- 3. Create Admin Policies (requires authenticated user)
-- Allow authenticated admins full control (select, update, delete)
CREATE POLICY "Allow admin full access" 
ON public.bookings 
FOR ALL 
TO authenticated 
USING (true) 
WITH CHECK (true);

-- 4. Sample Seed Data (Optional)
INSERT INTO public.bookings (id, customer_name, customer_email, customer_phone, experience_id, booking_date, booking_time, notes, status)
VALUES 
('NX-8421', 'Dulitha Wijetunge', 'dulitha@example.com', '+94 77 123 4567', 'gold', CURRENT_DATE, '13:00', 'Please arrange a birthday cake setup.', 'confirmed'),
('NX-1029', 'Sarah Connor', 'sarah@example.com', '+94 71 987 6543', 'platinum', CURRENT_DATE, '20:00', 'Prefer Xbox controllers if available.', 'pending');
