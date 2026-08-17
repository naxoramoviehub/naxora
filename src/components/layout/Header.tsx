'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '@/components/ui/Button';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: '/#packages', label: 'Packages' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <header className="fixed top-0 w-full z-50 bg-background/50 backdrop-blur-xl border-b border-glass-stroke">
      <nav className="flex justify-between items-center w-full px-[20px] md:px-[80px] max-w-[1440px] mx-auto h-20">
        <Link href="/" className="font-sans text-[24px] font-extrabold tracking-tighter text-white hover:text-primary transition-colors flex items-center gap-2">
          <span className="bg-gradient-to-r from-primary to-tertiary bg-clip-text text-transparent font-extrabold">NAXORA</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`font-sans text-[15px] font-semibold transition-all py-2 relative tracking-wide uppercase ${
                  isActive ? 'text-primary' : 'text-on-surface-variant hover:text-primary'
                }`}
              >
                {link.label}
                {isActive && (
                  <motion.div
                    layoutId="activeNavUnderline"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* Action Button & Mobile Menu Trigger */}
        <div className="flex items-center space-x-4">
          <Link href="/#packages">
            <Button size="sm" variant="primary" className="hidden sm:inline-flex">
              Book Now
            </Button>
          </Link>
          
          <button
            className="md:hidden text-on-surface-variant hover:text-white transition-colors cursor-pointer p-1"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 top-20 z-40 bg-black/60 backdrop-blur-sm md:hidden"
            />

            {/* Content Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed right-0 top-20 bottom-0 w-[280px] z-50 bg-secondary border-l border-glass-stroke p-6 md:hidden flex flex-col justify-between"
              id="mobile-navigation"
            >
              <div className="flex flex-col space-y-6">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`font-sans text-[18px] font-semibold transition-colors flex items-center justify-between ${
                        isActive ? 'text-primary' : 'text-on-surface-variant hover:text-white'
                      }`}
                    >
                      <span>{link.label}</span>
                      {isActive && <div className="w-1.5 h-1.5 rounded-full bg-primary" />}
                    </Link>
                  );
                })}
              </div>

              <div className="mt-auto space-y-4">
                <Link href="/#packages" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="primary" className="w-full">
                    Book Experience
                  </Button>
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
