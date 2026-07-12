'use client';

import { useState, useEffect } from 'react';
import { getMonthlySales, SalesData } from '@/lib/database';
import Card from '@/components/ui/Card';
import { DollarSign, TrendingUp, Calendar, BarChart3 } from 'lucide-react';

interface SalesAnalyticsProps {
  year?: number;
  showChart?: boolean;
  compact?: boolean;
}

export default function SalesAnalytics({ year: propYear, showChart = true, compact = false }: SalesAnalyticsProps) {
  const [monthlySales, setMonthlySales] = useState<SalesData[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedYear, setSelectedYear] = useState(propYear || 0);

  useEffect(() => {
    if (propYear) {
      setSelectedYear(propYear);
    } else {
      setSelectedYear(new Date().getFullYear());
    }
  }, [propYear]);

  useEffect(() => {
    loadSalesData();
  }, [selectedYear]);

  const loadSalesData = async () => {
    setLoading(true);
    const data = await getMonthlySales(selectedYear);
    setMonthlySales(data);
    setLoading(false);
  };

  const totalRevenue = monthlySales.reduce((sum, month) => sum + month.totalRevenue, 0);
  const totalBookings = monthlySales.reduce((sum, month) => sum + month.totalBookings, 0);
  const confirmedBookings = monthlySales.reduce((sum, month) => sum + month.confirmedBookings, 0);
  const cancelledBookings = monthlySales.reduce((sum, month) => sum + month.cancelledBookings, 0);

  const maxRevenue = Math.max(...monthlySales.map(s => s.totalRevenue), 1);

  if (compact) {
    return (
      <Card glowColor="purple" className="p-6">
        <div className="flex items-center justify-between mb-4">
          <span className="text-[14px] font-bold uppercase tracking-wider text-on-surface-variant">Total Revenue</span>
          <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
            <DollarSign className="w-4 h-4" />
          </div>
        </div>
        <h2 className="font-sans text-3xl font-extrabold text-white mb-1">{totalRevenue.toLocaleString()} LKR</h2>
        <p className="font-body text-xs text-on-surface-variant">Revenue for {selectedYear}</p>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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

      {/* Monthly Revenue Chart */}
      {showChart && (
        <Card className="p-6 border border-glass-stroke">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-sans text-lg font-bold text-white uppercase tracking-wider">Monthly Revenue - {selectedYear}</h3>
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
      )}
    </div>
  );
}
