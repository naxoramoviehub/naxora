'use client';

import { useState, useEffect } from 'react';
import { getBookings, Booking } from '@/lib/database';
import AdminLayout from '@/components/admin/AdminLayout';
import SalesAnalytics from '@/components/admin/SalesAnalytics';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { 
  Calendar, Clock, CheckCircle2, AlertCircle, XCircle, DollarSign, Users, TrendingUp
} from 'lucide-react';

export default function AdminDashboardPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [todayStr, setTodayStr] = useState('');

  const experiences: Record<string, string> = {
    'mini-cabin': 'Mini Cabin Suite',
    'elite-silver': 'Elite Silver Suite',
    'gold': 'Gold VIP Cabin',
    'platinum': 'Platinum Gamer Suite',
    'royal': 'Royal VIP Suite',
    'lite-celebration': 'Lite Celebration Package',
    'grand-celebration': 'Grand Celebration Package'
  };

  useEffect(() => {
    setTodayStr(new Date().toISOString().split('T')[0]);
    loadBookings();
  }, []);

  const loadBookings = async () => {
    setLoading(true);
    const data = await getBookings();
    setBookings(data);
    setLoading(false);
  };

  const todayBookings = bookings.filter(b => b.booking_date === todayStr);
  const pendingCount = bookings.filter(b => b.status === 'pending').length;
  const confirmedCount = bookings.filter(b => b.status === 'confirmed').length;
  const cancelledCount = bookings.filter(b => b.status === 'cancelled').length;

  const totalRevenue = bookings
    .filter(b => b.status === 'confirmed')
    .reduce((acc, b) => {
      const priceMatch = b.amount_due?.match(/(\d+)/);
      const price = priceMatch ? parseInt(priceMatch[1]) : 0;
      return acc + price;
    }, 0);

  const recentBookings = bookings
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 5);

  return (
    <AdminLayout 
      title="Dashboard" 
      subtitle="Overview of bookings, sales, and system performance"
    >
      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card glowColor="purple" className="p-6">
          <div className="flex justify-between items-start mb-4">
            <span className="text-[14px] font-bold uppercase tracking-wider text-on-surface-variant">Total Revenue</span>
            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <h2 className="font-sans text-3xl font-extrabold text-white mb-1">{totalRevenue.toLocaleString()} LKR</h2>
          <p className="font-body text-xs text-on-surface-variant">Total confirmed bookings</p>
        </Card>

        <Card glowColor="cyan" className="p-6">
          <div className="flex justify-between items-start mb-4">
            <span className="text-[14px] font-bold uppercase tracking-wider text-on-surface-variant">Total Bookings</span>
            <div className="w-8 h-8 bg-amber-500/10 rounded-lg flex items-center justify-center text-amber-500">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <h2 className="font-sans text-3xl font-extrabold text-amber-500 mb-1">{bookings.length}</h2>
          <p className="font-body text-xs text-on-surface-variant">All time bookings</p>
        </Card>

        <Card glowColor="purple" className="p-6">
          <div className="flex justify-between items-start mb-4">
            <span className="text-[14px] font-bold uppercase tracking-wider text-on-surface-variant">Confirmed</span>
            <div className="w-8 h-8 bg-emerald-500/10 rounded-lg flex items-center justify-center text-emerald-500">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <h2 className="font-sans text-3xl font-extrabold text-emerald-500 mb-1">{confirmedCount}</h2>
          <p className="font-body text-xs text-on-surface-variant">Approved bookings</p>
        </Card>

        <Card glowColor="purple" className="p-6">
          <div className="flex justify-between items-start mb-4">
            <span className="text-[14px] font-bold uppercase tracking-wider text-on-surface-variant">Pending</span>
            <div className="w-8 h-8 bg-red-500/10 rounded-lg flex items-center justify-center text-red-500">
              <AlertCircle className="w-4 h-4" />
            </div>
          </div>
          <h2 className="font-sans text-3xl font-extrabold text-red-500 mb-1">{pendingCount}</h2>
          <p className="font-body text-xs text-on-surface-variant">Awaiting confirmation</p>
        </Card>
      </div>

      {/* Sales Analytics */}
      <div className="mb-8">
        <SalesAnalytics compact={false} showChart={true} />
      </div>

      {/* Recent Bookings */}
      <Card className="p-6 border border-glass-stroke">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-sans text-lg font-bold text-white uppercase tracking-wider">Recent Bookings</h3>
          <Button variant="secondary" size="sm" onClick={loadBookings} className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Refresh
          </Button>
        </div>

        {loading ? (
          <div className="py-12 text-center text-on-surface-variant">
            Loading recent bookings...
          </div>
        ) : recentBookings.length === 0 ? (
          <div className="py-12 text-center text-on-surface-variant">
            No recent bookings found
          </div>
        ) : (
          <div className="space-y-4">
            {recentBookings.map((booking) => (
              <div
                key={booking.id}
                className="flex items-center justify-between p-4 bg-surface-container/30 rounded-xl border border-glass-stroke/40 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-mono font-bold text-white">{booking.id}</span>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                      booking.status === 'confirmed' 
                        ? 'bg-emerald-500/10 text-emerald-500' 
                        : booking.status === 'pending' 
                        ? 'bg-amber-500/10 text-amber-500' 
                        : 'bg-red-500/10 text-red-500'
                    }`}>
                      {booking.status}
                    </span>
                  </div>
                  <div className="text-sm text-white font-medium">{booking.customer_name}</div>
                  <div className="text-xs text-on-surface-variant">
                    {experiences[booking.experience_id] || booking.experience_id} • {booking.booking_date}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-mono text-white">{booking.amount_due || 'N/A'}</div>
                  <div className="text-xs text-on-surface-variant">
                    {new Date(booking.created_at).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </AdminLayout>
  );
}
