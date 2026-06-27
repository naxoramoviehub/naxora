import { supabase } from './supabase';

export interface Booking {
  id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  experience_id: string;
  package_title?: string;        // Human-readable package name
  booking_date: string;          // YYYY-MM-DD
  booking_time: string;          // HH:MM
  booking_time_display?: string; // e.g. '09:30 AM - 12:30 PM'
  notes: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  created_at: string;
  receipt_url?: string;          // Base64 encoded receipt image
  receipt_filename?: string;     // Original filename of the uploaded receipt
  amount_due?: string;           // Package price string (e.g. '2350 LKR')
}

// Hardcoded time slots for high-fidelity booking experience
export const TIME_SLOTS = [
  { id: '1', time: '09:30', display: '09:30 AM - 12:30 PM' },
  { id: '2', time: '13:00', display: '01:00 PM - 04:00 PM' },
  { id: '3', time: '16:30', display: '04:30 PM - 07:30 PM' },
  { id: '4', time: '20:00', display: '08:00 PM - 11:00 PM' },
];

const LOCAL_STORAGE_KEY = 'naxora_bookings';

// Generate a random premium-looking Booking ID (e.g. NX-4821)
function generateBookingId(): string {
  const num = Math.floor(1000 + Math.random() * 9000);
  return `NX-${num}`;
}

export async function getBookings(): Promise<Booking[]> {
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .order('booking_date', { ascending: true })
        .order('booking_time', { ascending: true });
      if (error) throw error;
      return data || [];
    } catch (err) {
      console.error('Supabase getBookings failed, falling back to local storage:', err);
    }
  }

  // Local Storage fallback (no seed data — returns real bookings only)
  if (typeof window !== 'undefined') {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (data) return JSON.parse(data);
  }
  return [];
}

export async function getBookingById(id: string): Promise<Booking | null> {
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .eq('id', id)
        .single();
      if (error) throw error;
      return data;
    } catch (err) {
      console.error('Supabase getBookingById failed, falling back:', err);
    }
  }

  const bookings = await getBookings();
  return bookings.find(b => b.id === id) || null;
}

export async function createBooking(bookingData: Omit<Booking, 'id' | 'status' | 'created_at'>): Promise<Booking> {
  const newBooking: Booking = {
    ...bookingData,
    id: generateBookingId(),
    status: 'pending',
    created_at: new Date().toISOString()
  };

  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .insert([newBooking])
        .select()
        .single();
      if (error) throw error;
      return data || newBooking;
    } catch (err) {
      console.error('Supabase createBooking failed, falling back:', err);
    }
  }

  const bookings = await getBookings();
  const updatedBookings = [newBooking, ...bookings];
  if (typeof window !== 'undefined') {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedBookings));
  }
  return newBooking;
}

export async function updateBookingStatus(id: string, status: 'pending' | 'confirmed' | 'cancelled'): Promise<Booking | null> {
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .update({ status })
        .eq('id', id)
        .select()
        .single();
      if (error) throw error;
      return data;
    } catch (err) {
      console.error('Supabase updateBookingStatus failed, falling back:', err);
    }
  }

  const bookings = await getBookings();
  const index = bookings.findIndex(b => b.id === id);
  if (index !== -1) {
    bookings[index].status = status;
    if (typeof window !== 'undefined') {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(bookings));
    }
    return bookings[index];
  }
  return null;
}

export async function deleteBooking(id: string): Promise<boolean> {
  if (supabase) {
    try {
      const { error } = await supabase
        .from('bookings')
        .delete()
        .eq('id', id);
      if (error) throw error;
      return true;
    } catch (err) {
      console.error('Supabase deleteBooking failed, falling back:', err);
    }
  }

  const bookings = await getBookings();
  const filtered = bookings.filter(b => b.id !== id);
  if (typeof window !== 'undefined') {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(filtered));
  }
  return true;
}

export async function getBookedSlots(date: string, experienceId: string): Promise<{ time: string; status: Booking['status'] }[]> {
  const bookings = await getBookings();
  // Filter bookings for this date and cabin category (experiences share capacity, e.g. booking experienceId specifically)
  return bookings
    .filter(b => b.booking_date === date && b.experience_id === experienceId && b.status !== 'cancelled')
    .map(b => ({ time: b.booking_time, status: b.status }));
}

export interface ReceiptMetadata {
  receiptBase64: string;
  receiptFilename?: string;
  packageTitle?: string;
  bookingTimeDisplay?: string;
  amountDue?: string;
}

export async function uploadBookingReceipt(id: string, meta: ReceiptMetadata): Promise<Booking | null> {
  const updatePayload: Partial<Booking> = {
    receipt_url: meta.receiptBase64,
    receipt_filename: meta.receiptFilename || '',
    package_title: meta.packageTitle || '',
    booking_time_display: meta.bookingTimeDisplay || '',
    amount_due: meta.amountDue || '',
  };

  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .update(updatePayload)
        .eq('id', id)
        .select()
        .single();
      if (error) throw error;
      return data;
    } catch (err) {
      console.error('Supabase uploadBookingReceipt failed, falling back:', err);
    }
  }

  // Local storage fallback
  const bookings = await getBookings();
  const index = bookings.findIndex(b => b.id === id);
  if (index !== -1) {
    bookings[index] = { ...bookings[index], ...updatePayload };
    if (typeof window !== 'undefined') {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(bookings));
    }
    return bookings[index];
  }
  return null;
}
