'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  getBookings, updateBookingStatus, deleteBooking, Booking, TIME_SLOTS 
} from '@/lib/database';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { 
  Search, Filter, Check, X, Trash2, Calendar as CalendarIcon, 
  TrendingUp, Users, DollarSign, Clock, LayoutDashboard, Settings,
  AlertCircle, ChevronLeft, ChevronRight, Edit2, CheckCircle2
} from 'lucide-react';

export default function AdminDashboardPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'confirmed' | 'cancelled'>('all');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [editBooking, setEditBooking] = useState<Booking | null>(null);
  
  // Custom edit form state
  const [editForm, setEditForm] = useState({
    date: '',
    time: '',
    notes: ''
  });

  // Calendar toggle state for occupancy month overview
  const [currentDate, setCurrentDate] = useState<Date>(new Date('2026-06-27'));
  const [todayStr, setTodayStr] = useState('2026-06-27');
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

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
    setCurrentDate(new Date());
    setTodayStr(new Date().toISOString().split('T')[0]);
    loadBookings();
  }, []);

  const loadBookings = async () => {
    setLoading(true);
    const data = await getBookings();
    setBookings(data);
    setLoading(false);
  };

  // Status updates
  const handleStatusUpdate = async (id: string, newStatus: Booking['status']) => {
    const updated = await updateBookingStatus(id, newStatus);
    if (updated) {
      setBookings(prev => prev.map(b => b.id === id ? updated : b));
    }
  };

  // Delete booking
  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this booking?')) {
      const success = await deleteBooking(id);
      if (success) {
        setBookings(prev => prev.filter(b => b.id !== id));
        setSelectedIds(prev => prev.filter(item => item !== id));
      }
    }
  };

  // Bulk actions
  const handleBulkAction = async (action: 'confirm' | 'cancel' | 'delete') => {
    if (selectedIds.length === 0) return;
    
    if (action === 'delete') {
      if (!confirm(`Are you sure you want to delete ${selectedIds.length} selected bookings?`)) return;
      for (const id of selectedIds) {
        await deleteBooking(id);
      }
      setBookings(prev => prev.filter(b => !selectedIds.includes(b.id)));
      setSelectedIds([]);
    } else {
      const newStatus = action === 'confirm' ? 'confirmed' : 'cancelled';
      for (const id of selectedIds) {
        await updateBookingStatus(id, newStatus);
      }
      setBookings(prev => prev.map(b => selectedIds.includes(b.id) ? { ...b, status: newStatus } : b));
      setSelectedIds([]);
    }
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredBookings.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredBookings.map(b => b.id));
    }
  };

  const toggleSelect = (id: string) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  // Open edit modal
  const openEditModal = (booking: Booking) => {
    setEditBooking(booking);
    setEditForm({
      date: booking.booking_date,
      time: booking.booking_time,
      notes: booking.notes
    });
  };

  // Submit edit form
  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editBooking) return;
    
    // Fallback updates in list
    setBookings(prev => prev.map(b => {
      if (b.id === editBooking.id) {
        const updated = {
          ...b,
          booking_date: editForm.date,
          booking_time: editForm.time,
          notes: editForm.notes
        };
        // Update local storage directly
        if (typeof window !== 'undefined') {
          const stored = localStorage.getItem('naxora_bookings');
          if (stored) {
            const list: Booking[] = JSON.parse(stored);
            const index = list.findIndex(item => item.id === editBooking.id);
            if (index !== -1) {
              list[index] = updated;
              localStorage.setItem('naxora_bookings', JSON.stringify(list));
            }
          }
        }
        return updated;
      }
      return b;
    }));
    
    setEditBooking(null);
    alert('Booking updated successfully!');
  };

  // Filter criteria
  const filteredBookings = bookings.filter(b => {
    const matchesSearch = 
      b.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.customer_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.customer_email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.customer_phone.includes(searchQuery);

    const matchesStatus = statusFilter === 'all' || b.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Calculate Dashboard Metrics
  const todayBookings = bookings.filter(b => b.booking_date === todayStr);
  const pendingCount = bookings.filter(b => b.status === 'pending').length;
  const confirmedCount = bookings.filter(b => b.status === 'confirmed').length;
  const cancelledCount = bookings.filter(b => b.status === 'cancelled').length;

  const estimatedRevenue = bookings
    .filter(b => b.status === 'confirmed')
    .reduce((acc, b) => {
      const priceVal = parseInt(b.experience_id === 'gold' ? '3000' : 
                                b.experience_id === 'mini-cabin' ? '2350' :
                                b.experience_id === 'elite-silver' ? '2550' :
                                b.experience_id === 'platinum' ? '3450' :
                                b.experience_id === 'royal' ? '5300' :
                                b.experience_id === 'lite-celebration' ? '6250' : '8950');
      return acc + priceVal;
    }, 0);

  // Month navigation for visual calendar
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay();
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const renderCalendar = () => {
    const cells = [];
    
    // Padding
    for (let i = 0; i < firstDayIndex; i++) {
      cells.push(<div key={`empty-${i}`} className="min-h-[50px] p-1 border border-glass-stroke/40 opacity-20" />);
    }

    // Days
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${currentYear}-${(currentMonth + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
      const dayBookings = bookings.filter(b => b.booking_date === dateStr && b.status !== 'cancelled');

      cells.push(
        <div key={`day-${day}`} className="min-h-[50px] p-1 border border-glass-stroke/40 flex flex-col justify-between">
          <span className="font-mono text-xs text-on-surface-variant font-bold">{day}</span>
          {dayBookings.length > 0 && (
            <div className="flex gap-1 justify-end">
              <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" title={`${dayBookings.length} Bookings`} />
              <span className="text-[9px] font-bold text-white font-mono">{dayBookings.length}</span>
            </div>
          )}
        </div>
      );
    }

    return cells;
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-on-background">
      <Header />
      
      <main className="flex-1 pt-24 pb-16 px-5 md:px-[80px] max-w-[1440px] mx-auto w-full">
        {/* Dashboard Title */}
        <section className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="font-sans text-[36px] md:text-[44px] font-extrabold text-white tracking-tight">
              Admin Portal
            </h1>
            <p className="font-body text-[15px] text-on-surface-variant mt-1">
              Real-time bookings analytics, scheduling matrix, and bank receipts confirmation workflow.
            </p>
          </div>
          <Button variant="secondary" onClick={loadBookings} className="flex items-center gap-2">
            <span>Refresh Data</span>
          </Button>
        </section>

        {/* Analytics Statistics Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <Card glowColor="purple" className="p-6">
            <div className="flex justify-between items-start mb-4">
              <span className="text-[14px] font-bold uppercase tracking-wider text-on-surface-variant">Today's Load</span>
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                <Clock className="w-4 h-4" />
              </div>
            </div>
            <h2 className="font-sans text-3xl font-extrabold text-white mb-1">{todayBookings.length}</h2>
            <p className="font-body text-xs text-on-surface-variant">Occupied slots scheduled for today</p>
          </Card>

          <Card glowColor="cyan" className="p-6">
            <div className="flex justify-between items-start mb-4">
              <span className="text-[14px] font-bold uppercase tracking-wider text-on-surface-variant">Hold Pending</span>
              <div className="w-8 h-8 bg-amber-500/10 rounded-lg flex items-center justify-center text-amber-500">
                <AlertCircle className="w-4 h-4" />
              </div>
            </div>
            <h2 className="font-sans text-3xl font-extrabold text-amber-500 mb-1">{pendingCount}</h2>
            <p className="font-body text-xs text-on-surface-variant">Awaiting bank receipt validation</p>
          </Card>

          <Card glowColor="purple" className="p-6">
            <div className="flex justify-between items-start mb-4">
              <span className="text-[14px] font-bold uppercase tracking-wider text-on-surface-variant">Confirmed</span>
              <div className="w-8 h-8 bg-emerald-500/10 rounded-lg flex items-center justify-center text-emerald-500">
                <CheckCircle2 className="w-4 h-4" />
              </div>
            </div>
            <h2 className="font-sans text-3xl font-extrabold text-emerald-500 mb-1">{confirmedCount}</h2>
            <p className="font-body text-xs text-on-surface-variant">Successfully booked slot sessions</p>
          </Card>

          <Card glowColor="purple" className="p-6">
            <div className="flex justify-between items-start mb-4">
              <span className="text-[14px] font-bold uppercase tracking-wider text-on-surface-variant">Est. Revenue</span>
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                <DollarSign className="w-4 h-4" />
              </div>
            </div>
            <h2 className="font-sans text-3xl font-extrabold text-white mb-1">{estimatedRevenue.toLocaleString()} LKR</h2>
            <p className="font-body text-xs text-on-surface-variant">Sum of all confirmed suite bookings</p>
          </Card>
        </section>

        {/* Calendar and occupancy grid */}
        <section className="grid lg:grid-cols-12 gap-8 mb-10">
          <div className="lg:col-span-8">
            <Card className="p-6 border border-glass-stroke">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-sans text-lg font-bold text-white uppercase tracking-wider">Occupancy Calendar</h3>
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={() => setCurrentDate(new Date(currentYear, currentMonth - 1, 1))}
                    className="p-1 rounded bg-white/5 border border-glass-stroke text-on-surface-variant hover:text-white cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <span className="font-mono text-sm text-white font-bold">{monthNames[currentMonth]} {currentYear}</span>
                  <button 
                    onClick={() => setCurrentDate(new Date(currentYear, currentMonth + 1, 1))}
                    className="p-1 rounded bg-white/5 border border-glass-stroke text-on-surface-variant hover:text-white cursor-pointer"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-7 gap-1 text-center font-mono text-xs font-bold text-on-surface-variant mb-2">
                <div>Su</div><div>Mo</div><div>Tu</div><div>We</div><div>Th</div><div>Fr</div><div>Sa</div>
              </div>
              <div className="grid grid-cols-7 gap-1">
                {renderCalendar()}
              </div>
            </Card>
          </div>

          <div className="lg:col-span-4 flex flex-col">
            <Card className="p-6 border border-glass-stroke flex-1">
              <h3 className="font-sans text-lg font-bold text-white uppercase tracking-wider mb-6">Peak Hour Load</h3>
              {/* Custom SVG occupancy chart mockup */}
              <div className="h-44 flex items-end justify-between gap-4 font-mono text-xs text-on-surface-variant pb-2 border-b border-glass-stroke/40">
                <div className="flex flex-col items-center gap-1 w-full">
                  <div className="w-full bg-primary/20 hover:bg-primary/40 rounded-t h-12 transition-all" title="4 Bookings" />
                  <span className="text-[10px]">09:30</span>
                </div>
                <div className="flex flex-col items-center gap-1 w-full">
                  <div className="w-full bg-primary/80 hover:bg-primary/90 rounded-t h-36 transition-all" title="12 Bookings" />
                  <span className="text-[10px]">13:00</span>
                </div>
                <div className="flex flex-col items-center gap-1 w-full">
                  <div className="w-full bg-primary/60 hover:bg-primary/70 rounded-t h-28 transition-all" title="8 Bookings" />
                  <span className="text-[10px]">16:30</span>
                </div>
                <div className="flex flex-col items-center gap-1 w-full">
                  <div className="w-full bg-primary/95 hover:bg-primary rounded-t h-40 transition-all" title="15 Bookings" />
                  <span className="text-[10px]">20:00</span>
                </div>
              </div>
              <p className="font-body text-xs text-on-surface-variant mt-4 leading-relaxed">
                Slot occupancy load indicates that <strong className="text-white">08:00 PM (Slot 4)</strong> is currently the peak hour followed by <strong className="text-white">01:00 PM (Slot 2)</strong>.
              </p>
            </Card>
          </div>
        </section>

        {/* Filter controls / Table Actions */}
        <section className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Search inputs */}
          <div className="flex items-center gap-3 bg-surface-container border border-glass-stroke px-4 py-2 rounded-xl flex-1 max-w-md">
            <Search className="w-4 h-4 text-on-surface-variant shrink-0" />
            <input
              type="text"
              placeholder="Search by ID, name, email, phone..."
              className="bg-transparent border-none text-white text-sm focus:outline-none w-full placeholder:text-muted"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Filtering buttons */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {(['all', 'pending', 'confirmed', 'cancelled'] as const).map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold border transition-all uppercase tracking-wider font-mono cursor-pointer ${
                  statusFilter === status 
                    ? 'bg-primary border-primary text-white shadow-lg shadow-primary/25' 
                    : 'border-glass-stroke text-on-surface-variant hover:text-white hover:bg-white/5'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </section>

        {/* Bulk Action Panel */}
        {selectedIds.length > 0 && (
          <div className="bg-primary/10 border border-primary/20 rounded-2xl p-4 flex items-center justify-between gap-4 mb-6 animate-pulse">
            <span className="text-sm font-medium text-white font-mono">
              {selectedIds.length} booking(s) selected
            </span>
            <div className="flex gap-2">
              <Button size="sm" onClick={() => handleBulkAction('confirm')} variant="primary" className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5" />
                <span>Confirm</span>
              </Button>
              <Button size="sm" onClick={() => handleBulkAction('cancel')} variant="secondary" className="flex items-center gap-1.5">
                <X className="w-3.5 h-3.5" />
                <span>Cancel</span>
              </Button>
              <Button size="sm" onClick={() => handleBulkAction('delete')} variant="ghost" className="flex items-center gap-1.5 !text-error hover:!bg-error/10">
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete</span>
              </Button>
            </div>
          </div>
        )}

        {/* Bookings Table List */}
        <section>
          <Card className="p-0 border border-glass-stroke overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-glass-stroke bg-surface-container/30 text-on-surface-variant font-mono text-xs uppercase tracking-wider font-bold">
                    <th className="py-4 px-6 text-center w-12">
                      <input 
                        type="checkbox" 
                        checked={selectedIds.length === filteredBookings.length && filteredBookings.length > 0} 
                        onChange={toggleSelectAll} 
                        className="cursor-pointer rounded border-glass-stroke"
                      />
                    </th>
                    <th className="py-4 px-6">Booking ID</th>
                    <th className="py-4 px-6">Customer</th>
                    <th className="py-4 px-6">Suite Package</th>
                    <th className="py-4 px-6">Date & Time</th>
                    <th className="py-4 px-6 text-center">Status</th>
                    <th className="py-4 px-6 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-glass-stroke/40 font-body text-[14px]">
                  {loading ? (
                    <tr>
                      <td colSpan={7} className="py-20 text-center text-on-surface-variant">
                        Loading booking list data...
                      </td>
                    </tr>
                  ) : filteredBookings.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-20 text-center text-on-surface-variant">
                        No bookings found matching filters.
                      </td>
                    </tr>
                  ) : (
                    filteredBookings.map((b) => {
                      const isSelected = selectedIds.includes(b.id);
                      const displayTime = TIME_SLOTS.find(ts => ts.time === b.booking_time)?.display || b.booking_time;
                      return (
                        <tr 
                          key={b.id} 
                          className={`hover:bg-white/5 transition-colors ${
                            isSelected ? 'bg-primary/5' : ''
                          }`}
                        >
                          <td className="py-4 px-6 text-center">
                            <input 
                              type="checkbox" 
                              checked={isSelected} 
                              onChange={() => toggleSelect(b.id)} 
                              className="cursor-pointer rounded border-glass-stroke"
                            />
                          </td>
                          <td className="py-4 px-6 font-mono font-bold text-white">{b.id}</td>
                          <td className="py-4 px-6">
                            <div className="font-semibold text-white">{b.customer_name}</div>
                            <div className="text-xs text-on-surface-variant mt-0.5">{b.customer_email}</div>
                            <div className="text-xs text-on-surface-variant mt-0.5 font-mono">{b.customer_phone}</div>
                          </td>
                          <td className="py-4 px-6 font-medium text-white">{experiences[b.experience_id] || b.experience_id}</td>
                          <td className="py-4 px-6">
                            <div className="font-mono text-white font-semibold">{b.booking_date}</div>
                            <div className="text-xs text-on-surface-variant mt-0.5 font-mono">{displayTime}</div>
                          </td>
                          <td className="py-4 px-6 text-center">
                            <Badge 
                              variant={b.status === 'confirmed' ? 'primary' : b.status === 'pending' ? 'secondary' : 'default'}
                              className={
                                b.status === 'confirmed' ? '!bg-emerald-500/10 !text-emerald-500 !border-emerald-500/20' :
                                b.status === 'pending' ? '!bg-amber-500/10 !text-amber-500 !border-amber-500/20' :
                                '!bg-red-500/10 !text-red-500 !border-red-500/20'
                              }
                            >
                              {b.status}
                            </Badge>
                          </td>
                          <td className="py-4 px-6">
                            <div className="flex items-center justify-center gap-2">
                              {b.status === 'pending' && (
                                <button
                                  onClick={() => handleStatusUpdate(b.id, 'confirmed')}
                                  className="p-1.5 rounded-lg border border-glass-stroke text-emerald-500 hover:bg-emerald-500/10 hover:text-white transition-colors cursor-pointer"
                                  title="Approve booking receipt"
                                >
                                  <Check className="w-4 h-4" />
                                </button>
                              )}
                              {b.status !== 'cancelled' && (
                                <button
                                  onClick={() => handleStatusUpdate(b.id, 'cancelled')}
                                  className="p-1.5 rounded-lg border border-glass-stroke text-amber-500 hover:bg-amber-500/10 hover:text-white transition-colors cursor-pointer"
                                  title="Cancel session"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              )}
                              <button
                                onClick={() => openEditModal(b)}
                                className="p-1.5 rounded-lg border border-glass-stroke text-blue-400 hover:bg-blue-500/10 hover:text-white transition-colors cursor-pointer"
                                title="Edit schedule"
                              >
                                <Edit2 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDelete(b.id)}
                                className="p-1.5 rounded-lg border border-glass-stroke text-red-400 hover:bg-red-500/10 hover:text-white transition-colors cursor-pointer"
                                title="Delete"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </Card>
        </section>
      </main>

      {/* Edit Schedule Modal */}
      {editBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-5">
          <Card className="max-w-md w-full p-6 border border-glass-stroke">
            <h3 className="font-sans text-xl font-bold text-white mb-4 uppercase tracking-wider">Edit Schedule Details</h3>
            <form onSubmit={handleSaveEdit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1.5">Selected Date</label>
                <input 
                  type="date"
                  required
                  className="w-full px-4 py-2.5 bg-background border border-glass-stroke rounded-lg text-white font-mono text-sm focus:outline-none"
                  value={editForm.date}
                  onChange={(e) => setEditForm({ ...editForm, date: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1.5">Time Slot</label>
                <select
                  className="w-full px-4 py-2.5 bg-background border border-glass-stroke rounded-lg text-white font-mono text-sm focus:outline-none"
                  value={editForm.time}
                  onChange={(e) => setEditForm({ ...editForm, time: e.target.value })}
                >
                  {TIME_SLOTS.map(slot => (
                    <option key={slot.id} value={slot.time}>{slot.display}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1.5">Special Requests / Notes</label>
                <textarea 
                  className="w-full px-4 py-2.5 bg-background border border-glass-stroke rounded-lg text-white text-sm focus:outline-none h-24 resize-none"
                  value={editForm.notes}
                  onChange={(e) => setEditForm({ ...editForm, notes: e.target.value })}
                />
              </div>
              <div className="flex justify-end gap-2 border-t border-glass-stroke pt-4 mt-6">
                <Button type="button" variant="secondary" onClick={() => setEditBooking(null)}>Cancel</Button>
                <Button type="submit" variant="primary">Save Changes</Button>
              </div>
            </form>
          </Card>
        </div>
      )}

      <Footer />
    </div>
  );
}
