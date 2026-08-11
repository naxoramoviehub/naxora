'use client';

import { useState, useEffect } from 'react';
import { getMonthlySales, getSalesByPackage, SalesData } from '@/lib/database';
import AdminLayout from '@/components/admin/AdminLayout';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { 
  Download, TrendingUp, DollarSign, Calendar, 
  Package, BarChart3, ChevronLeft, ChevronRight 
} from 'lucide-react';

export default function SalesPage() {
  const [monthlySales, setMonthlySales] = useState<SalesData[]>([]);
  const [salesByPackage, setSalesByPackage] = useState<{ packageId: string; packageName: string; totalRevenue: number; bookingCount: number }[]>([]);
  const [selectedYear, setSelectedYear] = useState<number>(2024);

  useEffect(() => {
    setSelectedYear(new Date().getFullYear());
  }, []);
  const [loading, setLoading] = useState(true);

  const years = [2024, 2025, 2026, 2027, 2028];

  useEffect(() => {
    loadSalesData();
  }, [selectedYear]);

  const loadSalesData = async () => {
    setLoading(true);
    const [monthly, byPackage] = await Promise.all([
      getMonthlySales(selectedYear),
      getSalesByPackage(selectedYear)
    ]);
    setMonthlySales(monthly);
    setSalesByPackage(byPackage);
    setLoading(false);
  };

  const totalRevenue = monthlySales.reduce((sum, month) => sum + month.totalRevenue, 0);
  const totalBookings = monthlySales.reduce((sum, month) => sum + month.totalBookings, 0);
  const confirmedBookings = monthlySales.reduce((sum, month) => sum + month.confirmedBookings, 0);
  const cancelledBookings = monthlySales.reduce((sum, month) => sum + month.cancelledBookings, 0);

  const exportSalesToCSV = () => {
    const headers = ['Month', 'Year', 'Total Revenue (LKR)', 'Total Bookings', 'Confirmed Bookings', 'Cancelled Bookings', 'Pending Bookings'];
    const rows = monthlySales.map(s => [
      s.month,
      s.year,
      s.totalRevenue.toLocaleString(),
      s.totalBookings,
      s.confirmedBookings,
      s.cancelledBookings,
      s.pendingBookings
    ]);

    const csvContent = [headers, ...rows].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `sales-${selectedYear}-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportPackageSalesToCSV = () => {
    const headers = ['Package ID', 'Package Name', 'Total Revenue (LKR)', 'Booking Count'];
    const rows = salesByPackage.map(s => [
      s.packageId,
      s.packageName,
      s.totalRevenue.toLocaleString(),
      s.bookingCount
    ]);

    const csvContent = [headers, ...rows].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `package-sales-${selectedYear}-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const maxRevenue = Math.max(...monthlySales.map(s => s.totalRevenue), 1);

  return (
    <AdminLayout 
      title="Sales Analytics" 
      subtitle="Track revenue, bookings, and performance metrics"
    >
      {/* Year Selector */}
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Calendar className="w-5 h-5 text-on-surface-variant" />
          <div className="flex items-center gap-2">
            {years.map(year => (
              <button
                key={year}
                onClick={() => setSelectedYear(year)}
                className={`px-4 py-2 rounded-lg font-mono font-semibold transition-all ${
                  selectedYear === year
                    ? 'bg-primary text-white shadow-lg shadow-primary/25'
                    : 'bg-surface-container text-on-surface-variant'
                }`}
              >
                {year}
              </button>
            ))}
          </div>
        </div>
        <Button
          variant="secondary"
          onClick={loadSalesData}
          className="flex items-center gap-2"
        >
          Refresh Data
        </Button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card glowColor="purple" className="p-6">
          <div className="flex justify-between items-start mb-4">
            <span className="text-[14px] font-bold uppercase tracking-wider text-on-surface-variant">Total Revenue</span>
            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <h2 className="font-sans text-3xl font-extrabold text-white mb-1">{totalRevenue.toLocaleString()} LKR</h2>
          <p className="font-body text-xs text-on-surface-variant">Revenue for {selectedYear}</p>
        </Card>

        <Card glowColor="cyan" className="p-6">
          <div className="flex justify-between items-start mb-4">
            <span className="text-[14px] font-bold uppercase tracking-wider text-on-surface-variant">Total Bookings</span>
            <div className="w-8 h-8 bg-tertiary/10 rounded-lg flex items-center justify-center text-tertiary">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <h2 className="font-sans text-3xl font-extrabold text-white mb-1">{totalBookings}</h2>
          <p className="font-body text-xs text-on-surface-variant">All bookings in {selectedYear}</p>
        </Card>

        <Card glowColor="purple" className="p-6">
          <div className="flex justify-between items-start mb-4">
            <span className="text-[14px] font-bold uppercase tracking-wider text-on-surface-variant">Confirmed</span>
            <div className="w-8 h-8 bg-emerald-500/10 rounded-lg flex items-center justify-center text-emerald-500">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <h2 className="font-sans text-3xl font-extrabold text-emerald-500 mb-1">{confirmedBookings}</h2>
          <p className="font-body text-xs text-on-surface-variant">Successfully confirmed</p>
        </Card>

        <Card glowColor="purple" className="p-6">
          <div className="flex justify-between items-start mb-4">
            <span className="text-[14px] font-bold uppercase tracking-wider text-on-surface-variant">Cancelled</span>
            <div className="w-8 h-8 bg-red-500/10 rounded-lg flex items-center justify-center text-red-500">
              <BarChart3 className="w-4 h-4" />
            </div>
          </div>
          <h2 className="font-sans text-3xl font-extrabold text-red-500 mb-1">{cancelledBookings}</h2>
          <p className="font-body text-xs text-on-surface-variant">Cancelled bookings</p>
        </Card>
      </div>

      {/* Monthly Sales Chart */}
      <Card className="p-6 mb-8 border border-glass-stroke">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-sans text-lg font-bold text-white uppercase tracking-wider">Monthly Revenue</h3>
          <Button
            variant="secondary"
            size="sm"
            onClick={exportSalesToCSV}
            className="flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Export CSV
          </Button>
        </div>

        {loading ? (
          <div className="py-20 text-center text-on-surface-variant">
            Loading sales data...
          </div>
        ) : monthlySales.length === 0 ? (
          <div className="py-20 text-center text-on-surface-variant">
            No sales data available for {selectedYear}
          </div>
        ) : (
          <div className="space-y-4">
            {monthlySales.map((sale) => {
              const heightPercentage = (sale.totalRevenue / maxRevenue) * 100;
              return (
                <div key={`${sale.year}-${sale.month}`} className="flex items-center gap-4">
                  <div className="w-24 text-sm font-mono text-on-surface-variant font-medium">
                    {sale.month}
                  </div>
                  <div className="flex-1 h-12 bg-surface-container/30 rounded-lg overflow-hidden border border-glass-stroke/40">
                    <div
                      className="h-full bg-gradient-to-r from-primary to-primary-container rounded-lg transition-all duration-500"
                      style={{ width: `${Math.max(heightPercentage, 2)}%` }}
                    />
                  </div>
                  <div className="w-32 text-right">
                    <div className="font-mono font-bold text-white">{sale.totalRevenue.toLocaleString()} LKR</div>
                    <div className="text-xs text-on-surface-variant">{sale.confirmedBookings} confirmed</div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Card>

      {/* Sales by Package */}
      <Card className="p-6 border border-glass-stroke">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-sans text-lg font-bold text-white uppercase tracking-wider">Sales by Package</h3>
          <Button
            variant="secondary"
            size="sm"
            onClick={exportPackageSalesToCSV}
            className="flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Export CSV
          </Button>
        </div>

        {loading ? (
          <div className="py-20 text-center text-on-surface-variant">
            Loading package data...
          </div>
        ) : salesByPackage.length === 0 ? (
          <div className="py-20 text-center text-on-surface-variant">
            No package sales data available for {selectedYear}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-glass-stroke bg-surface-container/30 text-on-surface-variant font-mono text-xs uppercase tracking-wider font-bold">
                  <th className="py-4 px-6">Package</th>
                  <th className="py-4 px-6 text-right">Revenue</th>
                  <th className="py-4 px-6 text-center">Bookings</th>
                  <th className="py-4 px-6 text-right">Avg per Booking</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-glass-stroke/40 font-body text-[14px]">
                {salesByPackage.map((sale) => (
                  <tr key={sale.packageId} className="transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                          <Package className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="font-semibold text-white">{sale.packageName}</div>
                          <div className="text-xs text-on-surface-variant font-mono">{sale.packageId}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="font-mono font-bold text-white">{sale.totalRevenue.toLocaleString()} LKR</div>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <div className="font-mono font-semibold text-white">{sale.bookingCount}</div>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="font-mono text-on-surface-variant">
                        {sale.bookingCount > 0 ? Math.round(sale.totalRevenue / sale.bookingCount).toLocaleString() : 0} LKR
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </AdminLayout>
  );
}
