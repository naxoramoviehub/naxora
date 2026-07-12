'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Calendar, 
  DollarSign, 
  Package, 
  Users, 
  Menu, 
  X,
  LogOut,
  TrendingUp
} from 'lucide-react';
import { signOut } from '@/app/admin/auth/actions';

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  { label: 'Dashboard', href: '/admin', icon: <LayoutDashboard className="w-5 h-5" /> },
  { label: 'Bookings', href: '/admin/bookings', icon: <Calendar className="w-5 h-5" /> },
  { label: 'Sales', href: '/admin/sales', icon: <DollarSign className="w-5 h-5" /> },
  { label: 'Packages', href: '/admin/packages', icon: <Package className="w-5 h-5" /> },
  { label: 'Admins', href: '/admin/admins', icon: <Users className="w-5 h-5" /> },
];

interface AdminLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

export default function AdminLayout({ children, title, subtitle }: AdminLayoutProps) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-background text-on-background">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-surface-elevated/80 backdrop-blur-xl border-r border-glass-stroke transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:z-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-glass-stroke">
            <Link href="/admin" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-container rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="font-sans font-bold text-xl text-white">NAXORA</h1>
                <p className="text-xs text-on-surface-variant">Admin Portal</p>
              </div>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {navItems.map((item) => {
              const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                    isActive
                      ? 'bg-primary/20 text-primary border border-primary/30 shadow-[0_0_20px_rgba(139,92,246,0.15)]'
                      : 'text-on-surface-variant border border-transparent'
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  {item.icon}
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Sign Out */}
          <div className="p-4 border-t border-glass-stroke">
            <form action={signOut}>
              <button
                type="submit"
                className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-on-surface-variant transition-all duration-200 border border-transparent"
              >
                <LogOut className="w-5 h-5" />
                <span className="font-medium">Sign Out</span>
              </button>
            </form>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-lg border-b border-glass-stroke">
          <div className="flex items-center justify-between px-6 py-4">
            {/* Mobile menu button */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 rounded-lg text-on-surface-variant transition-colors"
            >
              {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Page Title */}
            <div className="flex-1">
              <h1 className="font-sans text-2xl font-bold text-white">{title}</h1>
              {subtitle && <p className="text-sm text-on-surface-variant mt-0.5">{subtitle}</p>}
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-3">
              <Link
                href="/admin/invites"
                className="px-4 py-2 rounded-lg border border-primary/30 text-primary text-sm font-medium transition-colors"
              >
                Admin Requests
              </Link>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
