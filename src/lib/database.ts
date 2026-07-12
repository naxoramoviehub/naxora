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
  public_token?: string;
}

export interface Package {
  id: string;
  title: string;
  description: string;
  price: string;
  price_numeric: number;
  capacity: string;
  duration: string;
  extra_hour: string;
  image: string;
  category: string;
  features: string[];
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface SalesData {
  month: string;
  year: number;
  totalRevenue: number;
  totalBookings: number;
  confirmedBookings: number;
  cancelledBookings: number;
  pendingBookings: number;
}

// Hardcoded time slots for high-fidelity booking experience
export const TIME_SLOTS = [
  { id: '1', time: '09:30', display: '09:30 AM - 12:30 PM' },
  { id: '2', time: '13:00', display: '01:00 PM - 04:00 PM' },
  { id: '3', time: '16:30', display: '04:30 PM - 07:30 PM' },
  { id: '4', time: '20:00', display: '08:00 PM - 11:00 PM' },
];

const LOCAL_STORAGE_KEY = 'naxora_bookings';

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
  const response = await fetch('/api/bookings', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(bookingData) });
  const result = await response.json();
  if (!response.ok) throw new Error(result.error || 'Could not create booking.');
  return result.booking;
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
  const response = await fetch(`/api/bookings?date=${encodeURIComponent(date)}&experience=${encodeURIComponent(experienceId)}`);
  if (!response.ok) return [];
  return (await response.json()).slots;
}

export interface ReceiptMetadata {
  receiptBase64: string;
  receiptFilename?: string;
  packageTitle?: string;
  bookingTimeDisplay?: string;
  amountDue?: string;
}

export async function uploadBookingReceipt(id: string, meta: ReceiptMetadata, publicToken?: string): Promise<Booking | null> {
  if (publicToken) {
    const response = await fetch('/api/bookings/receipt', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id, public_token: publicToken, ...meta }) });
    if (!response.ok) return null;
    return (await response.json()).booking;
  }
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

// Package functions
export async function getPackages(): Promise<Package[]> {
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('packages')
        .select('*')
        .order('price_numeric', { ascending: true });
      if (error) throw error;
      return data || [];
    } catch (err) {
      console.error('Supabase getPackages failed:', err);
    }
  }
  return [];
}

export async function getPackageById(id: string): Promise<Package | null> {
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('packages')
        .select('*')
        .eq('id', id)
        .single();
      if (error) throw error;
      return data;
    } catch (err) {
      console.error('Supabase getPackageById failed:', err);
    }
  }
  return null;
}

export async function createPackage(packageData: Omit<Package, 'id' | 'created_at' | 'updated_at'>): Promise<Package | null> {
  if (supabase) {
    try {
      const id = packageData.title.toLowerCase().replace(/\s+/g, '-') + '-' + Date.now();
      const { data, error } = await supabase
        .from('packages')
        .insert({ ...packageData, id, updated_at: new Date().toISOString() })
        .select()
        .single();
      if (error) throw error;
      return data;
    } catch (err) {
      console.error('Supabase createPackage failed:', err);
    }
  }
  return null;
}

export async function updatePackage(id: string, packageData: Partial<Omit<Package, 'id' | 'created_at'>>): Promise<Package | null> {
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('packages')
        .update({ ...packageData, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();
      if (error) throw error;
      return data;
    } catch (err) {
      console.error('Supabase updatePackage failed:', err);
    }
  }
  return null;
}

export async function deletePackage(id: string): Promise<boolean> {
  if (supabase) {
    try {
      const { error } = await supabase
        .from('packages')
        .delete()
        .eq('id', id);
      if (error) throw error;
      return true;
    } catch (err) {
      console.error('Supabase deletePackage failed:', err);
    }
  }
  return false;
}

// Sales analytics functions
export async function getMonthlySales(year?: number, month?: number): Promise<SalesData[]> {
  const bookings = await getBookings();
  const packages = await getPackages();
  const salesMap = new Map<string, SalesData>();

  bookings.forEach(booking => {
    const date = new Date(booking.created_at);
    const bookingYear = date.getFullYear();
    const bookingMonth = date.toLocaleString('default', { month: 'long' });
    
    // Filter by year/month if provided
    if (year && bookingYear !== year) return;
    if (month && date.getMonth() !== month) return;

    const key = `${bookingYear}-${bookingMonth}`;
    
    if (!salesMap.has(key)) {
      salesMap.set(key, {
        month: bookingMonth,
        year: bookingYear,
        totalRevenue: 0,
        totalBookings: 0,
        confirmedBookings: 0,
        cancelledBookings: 0,
        pendingBookings: 0
      });
    }

    const sales = salesMap.get(key)!;
    sales.totalBookings++;
    
    if (booking.status === 'confirmed') {
      sales.confirmedBookings++;
      // Try to get price from amount_due first, then fall back to package price
      let price = 0;
      const priceMatch = booking.amount_due?.match(/(\d+)/);
      if (priceMatch) {
        price = parseInt(priceMatch[1]);
      } else {
        // Fall back to package price from database
        const pkg = packages.find(p => p.id === booking.experience_id);
        price = pkg?.price_numeric || 0;
      }
      sales.totalRevenue += price;
    } else if (booking.status === 'cancelled') {
      sales.cancelledBookings++;
    } else {
      sales.pendingBookings++;
    }
  });

  return Array.from(salesMap.values()).sort((a, b) => {
    if (a.year !== b.year) return b.year - a.year;
    const monthOrder = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return monthOrder.indexOf(b.month) - monthOrder.indexOf(a.month);
  });
}

export async function getSalesByPackage(year?: number): Promise<{ packageId: string; packageName: string; totalRevenue: number; bookingCount: number }[]> {
  const bookings = await getBookings();
  const packages = await getPackages();
  const packageMap = new Map<string, { totalRevenue: number; bookingCount: number }>();

  bookings.forEach(booking => {
    const date = new Date(booking.created_at);
    if (year && date.getFullYear() !== year) return;
    
    if (booking.status === 'confirmed') {
      // Try to get price from amount_due first, then fall back to package price
      let price = 0;
      const priceMatch = booking.amount_due?.match(/(\d+)/);
      if (priceMatch) {
        price = parseInt(priceMatch[1]);
      } else {
        // Fall back to package price from database
        const pkg = packages.find(p => p.id === booking.experience_id);
        price = pkg?.price_numeric || 0;
      }
      
      if (!packageMap.has(booking.experience_id)) {
        packageMap.set(booking.experience_id, { totalRevenue: 0, bookingCount: 0 });
      }
      
      const data = packageMap.get(booking.experience_id)!;
      data.totalRevenue += price;
      data.bookingCount++;
    }
  });

  return Array.from(packageMap.entries()).map(([packageId, data]) => {
    const pkg = packages.find(p => p.id === packageId);
    return {
      packageId,
      packageName: pkg?.title || packageId,
      totalRevenue: data.totalRevenue,
      bookingCount: data.bookingCount
    };
  }).sort((a, b) => b.totalRevenue - a.totalRevenue);
}
