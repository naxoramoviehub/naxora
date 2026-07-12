'use client';

import { useState, useEffect } from 'react';
import { 
  getBookings, updateBookingStatus, deleteBooking, Booking, TIME_SLOTS 
} from '@/lib/database';
import AdminLayout from '@/components/admin/AdminLayout';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import Dialog from '@/components/ui/Dialog';
import { 
  Search, Filter, Check, X, Trash2, Download, 
  Calendar as CalendarIcon, AlertCircle, ChevronLeft, 
  ChevronRight, Edit2, CheckCircle2, Eye
} from 'lucide-react';

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'confirmed' | 'cancelled'>('all');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [editBooking, setEditBooking] = useState<Booking | null>(null);
  const [viewingReceiptBooking, setViewingReceiptBooking] = useState<Booking | null>(null);
  
  const [dialog, setDialog] = useState<{
    isOpen: boolean;
    type: 'confirm' | 'alert' | 'success';
    title: string;
    message: string;
    onConfirm?: () => void;
    confirmText?: string;
    cancelText?: string;
  }>({
    isOpen: false,
    type: 'confirm',
    title: '',
    message: ''
  });
  
  const [editForm, setEditForm] = useState({
    date: '',
    time: '',
    notes: ''
  });

  const experiences: Record<string, string> = {
    'mini-cabin': 'Mini Cabin Suite',
    'elite-silver': 'Elite Silver Suite',
    'gold': 'Gold VIP Cabin',
    'platinum': 'Platinum Gamer Suite',
    'royal': 'Royal VIP Suite',
    'lite-celebration': 'Lite Celebration Package',
    'grand-celebration': 'Grand Celebration Package'
  };

  const experiencePrices: Record<string, string> = {
    'mini-cabin': '2350 LKR',
    'elite-silver': '2550 LKR',
    'gold': '3000 LKR',
    'platinum': '3450 LKR',
    'royal': '5300 LKR',
    'lite-celebration': '6250 LKR',
    'grand-celebration': '8950 LKR',
  };

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    setLoading(true);
    const data = await getBookings();
    setBookings(data);
    setLoading(false);
  };

  const handleStatusUpdate = async (id: string, newStatus: Booking['status']) => {
    const updated = await updateBookingStatus(id, newStatus);
    if (updated) {
      setBookings(prev => prev.map(b => b.id === id ? updated : b));
    }
  };

  const handleDelete = (id: string) => {
    setDialog({
      isOpen: true,
      type: 'confirm',
      title: 'Delete Booking',
      message: 'Are you sure you want to delete this booking?',
      onConfirm: async () => {
        const success = await deleteBooking(id);
        if (success) {
          setBookings(prev => prev.filter(b => b.id !== id));
          setSelectedIds(prev => prev.filter(item => item !== id));
        }
      },
      confirmText: 'Delete',
      cancelText: 'Cancel'
    });
  };

  const handleBulkAction = (action: 'confirm' | 'cancel' | 'delete') => {
    if (selectedIds.length === 0) return;

    if (action === 'delete') {
      setDialog({
        isOpen: true,
        type: 'confirm',
        title: 'Delete Multiple Bookings',
        message: `Are you sure you want to delete ${selectedIds.length} selected bookings?`,
        onConfirm: async () => {
          for (const id of selectedIds) {
            await deleteBooking(id);
          }
          setBookings(prev => prev.filter(b => !selectedIds.includes(b.id)));
          setSelectedIds([]);
        },
        confirmText: 'Delete',
        cancelText: 'Cancel'
      });
    } else {
      const newStatus = action === 'confirm' ? 'confirmed' : 'cancelled';
      for (const id of selectedIds) {
        updateBookingStatus(id, newStatus);
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

  const openEditModal = (booking: Booking) => {
    setEditBooking(booking);
    setEditForm({
      date: booking.booking_date,
      time: booking.booking_time,
      notes: booking.notes
    });
  };

  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editBooking) return;
    
    setBookings(prev => prev.map(b => {
      if (b.id === editBooking.id) {
        const updated = {
          ...b,
          booking_date: editForm.date,
          booking_time: editForm.time,
          notes: editForm.notes
        };
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
    setDialog({
      isOpen: true,
      type: 'success',
      title: 'Success',
      message: 'Booking updated successfully!',
      confirmText: 'OK'
    });
  };

  const filteredBookings = bookings.filter(b => {
    const matchesSearch = 
      b.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.customer_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.customer_email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.customer_phone.includes(searchQuery);

    const matchesStatus = statusFilter === 'all' || b.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const exportToCSV = () => {
    const headers = ['Booking ID', 'Customer Name', 'Customer Email', 'Customer Phone', 'Package', 'Date', 'Time', 'Status', 'Amount Due', 'Notes', 'Created At'];
    const rows = filteredBookings.map(b => [
      b.id,
      b.customer_name,
      b.customer_email,
      b.customer_phone,
      experiences[b.experience_id] || b.experience_id,
      b.booking_date,
      TIME_SLOTS.find(ts => ts.time === b.booking_time)?.display || b.booking_time,
      b.status,
      b.amount_due || experiencePrices[b.experience_id] || 'N/A',
      b.notes,
      b.created_at
    ]);

    const csvContent = [headers, ...rows].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `bookings-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <AdminLayout 
      title="Bookings Management" 
      subtitle="View, manage, and export all booking records"
    >
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card glowColor="purple" className="p-6">
          <div className="flex justify-between items-start mb-4">
            <span className="text-[14px] font-bold uppercase tracking-wider text-on-surface-variant">Total Bookings</span>
            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
              <CalendarIcon className="w-4 h-4" />
            </div>
          </div>
          <h2 className="font-sans text-3xl font-extrabold text-white mb-1">{bookings.length}</h2>
          <p className="font-body text-xs text-on-surface-variant">All time bookings</p>
        </Card>

        <Card glowColor="cyan" className="p-6">
          <div className="flex justify-between items-start mb-4">
            <span className="text-[14px] font-bold uppercase tracking-wider text-on-surface-variant">Pending</span>
            <div className="w-8 h-8 bg-amber-500/10 rounded-lg flex items-center justify-center text-amber-500">
              <AlertCircle className="w-4 h-4" />
            </div>
          </div>
          <h2 className="font-sans text-3xl font-extrabold text-amber-500 mb-1">{bookings.filter(b => b.status === 'pending').length}</h2>
          <p className="font-body text-xs text-on-surface-variant">Awaiting confirmation</p>
        </Card>

        <Card glowColor="purple" className="p-6">
          <div className="flex justify-between items-start mb-4">
            <span className="text-[14px] font-bold uppercase tracking-wider text-on-surface-variant">Confirmed</span>
            <div className="w-8 h-8 bg-emerald-500/10 rounded-lg flex items-center justify-center text-emerald-500">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <h2 className="font-sans text-3xl font-extrabold text-emerald-500 mb-1">{bookings.filter(b => b.status === 'confirmed').length}</h2>
          <p className="font-body text-xs text-on-surface-variant">Approved bookings</p>
        </Card>

        <Card glowColor="purple" className="p-6">
          <div className="flex justify-between items-start mb-4">
            <span className="text-[14px] font-bold uppercase tracking-wider text-on-surface-variant">Cancelled</span>
            <div className="w-8 h-8 bg-red-500/10 rounded-lg flex items-center justify-center text-red-500">
              <X className="w-4 h-4" />
            </div>
          </div>
          <h2 className="font-sans text-3xl font-extrabold text-red-500 mb-1">{bookings.filter(b => b.status === 'cancelled').length}</h2>
          <p className="font-body text-xs text-on-surface-variant">Cancelled sessions</p>
        </Card>
      </div>

      {/* Filter controls */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
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

        <div className="flex items-center gap-2">
          {(['all', 'pending', 'confirmed', 'cancelled'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold border transition-all uppercase tracking-wider font-mono cursor-pointer ${
                statusFilter === status 
                  ? 'bg-primary border-primary text-white shadow-lg shadow-primary/25' 
                  : 'border-glass-stroke text-on-surface-variant'
              }`}
            >
              #{status}
            </button>
          ))}
          <Button
            variant="secondary"
            size="sm"
            onClick={exportToCSV}
            className="flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Export CSV
          </Button>
        </div>
      </div>

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
            <Button size="sm" onClick={() => handleBulkAction('delete')} variant="ghost" className="flex items-center gap-1.5 !text-error">
              <Trash2 className="w-3.5 h-3.5" />
              <span>Delete</span>
            </Button>
          </div>
        </div>
      )}

      {/* Bookings Table */}
      <Card className="p-0 border border-glass-stroke overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-glass-stroke bg-surface-container/30 text_on-surface-variant font-mono text-xs uppercase tracking-wider font-bold">
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
                <th className="py-4 px-6">Package</th>
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
                      className={`transition-colors ${
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
                              className="p-1.5 rounded-lg border border-glass-stroke text-emerald-500 transition-colors cursor-pointer"
                              title="Approve booking receipt"
                            >
                              <Check className="w-4 h-4" />
                            </button>
                          )}
                          {b.receipt_url && (
                            <button
                              onClick={() => setViewingReceiptBooking(b)}
                              className="p-1.5 rounded-lg border border-glass-stroke text-purple-400 transition-colors cursor-pointer"
                              title="View uploaded receipt"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                          )}
                          {b.status !== 'cancelled' && (
                            <button
                              onClick={() => handleStatusUpdate(b.id, 'cancelled')}
                              className="p-1.5 rounded-lg border border-glass-stroke text-amber-500 transition-colors cursor-pointer"
                              title="Cancel session"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          )}
                          <button
                            onClick={() => openEditModal(b)}
                            className="p-1.5 rounded-lg border border-glass-stroke text-blue-400 transition-colors cursor-pointer"
                            title="Edit schedule"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(b.id)}
                            className="p-1.5 rounded-lg border border-glass-stroke text-red-400 transition-colors cursor-pointer"
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

      {/* View Receipt Modal */}
      {viewingReceiptBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-5" onClick={() => setViewingReceiptBooking(null)}>
          <div className="max-w-2xl w-full" onClick={(e) => e.stopPropagation()}>
            <Card className="w-full p-6 border border-glass-stroke relative cursor-default" glowColor="none">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-sans text-xl font-bold text-white uppercase tracking-wider">
                  Receipt for Booking {viewingReceiptBooking.id}
                </h3>
                <button 
                  onClick={() => setViewingReceiptBooking(null)}
                  className="text-on-surface-variant transition-colors cursor-pointer"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="flex justify-center items-center bg-black/40 rounded-lg p-2 border border-glass-stroke max-h-[70vh] overflow-auto">
                {viewingReceiptBooking.receipt_url ? (
                  <img 
                    src={`data:image/jpeg;base64,${viewingReceiptBooking.receipt_url}`} 
                    alt="Receipt" 
                    className="max-w-full h-auto"
                  />
                ) : (
                  <p className="text-on-surface-variant">No receipt available</p>
                )}
              </div>
            </Card>
          </div>
        </div>
      )}

      {/* Dialog */}
      <Dialog
        isOpen={dialog.isOpen}
        type={dialog.type}
        title={dialog.title}
        message={dialog.message}
        confirmText={dialog.confirmText}
        cancelText={dialog.cancelText}
        onConfirm={() => {
          dialog.onConfirm?.();
          setDialog({ ...dialog, isOpen: false });
        }}
        onClose={() => setDialog({ ...dialog, isOpen: false })}
      />
    </AdminLayout>
  );
}
