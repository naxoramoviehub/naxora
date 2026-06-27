'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full z-50 bg-surface/70 backdrop-blur-[60px] border-b border-glass-stroke">
      <nav className="flex justify-between items-center w-full px-[20px] md:px-[80px] py-[16px] max-w-[1440px] mx-auto h-20">
        <Link href="/" className="font-sans text-[24px] font-extrabold tracking-tighter text-primary">
          NAXORA
        </Link>

        <div className="hidden md:flex items-center space-x-[32px]">
          <Link href="/movies" className="font-sans text-[16px] text-on-surface-variant hover:text-on-surface transition-colors">
            Movies
          </Link>
          <Link href="/gaming" className="font-sans text-[16px] text-on-surface-variant hover:text-on-surface transition-colors">
            Gaming
          </Link>
          <Link href="/celebrations" className="font-sans text-[16px] text-on-surface-variant hover:text-on-surface transition-colors">
            Celebrations
          </Link>
          <Link href="/booking" className="font-sans text-[16px] text-on-surface-variant hover:text-on-surface transition-colors">
            Experiences
          </Link>
        </div>

        <div className="flex items-center space-x-[16px]">
          <Link
            href="/booking"
            className="bg-gradient-to-r from-primary to-secondary text-on-primary px-6 py-2.5 rounded-lg font-sans text-[16px] font-semibold hover:opacity-90 active:scale-95 transition-all neon-glow-primary"
          >
            Book Now
          </Link>
          
          <button
            className="md:hidden text-on-surface-variant"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div className="md:hidden bg-surface border-b border-glass-stroke">
          <div className="flex flex-col space-y-[16px] p-[20px]">
            <Link href="/movies" className="font-sans text-[16px] text-on-surface-variant hover:text-on-surface transition-colors">
              Movies
            </Link>
            <Link href="/gaming" className="font-sans text-[16px] text-on-surface-variant hover:text-on-surface transition-colors">
              Gaming
            </Link>
            <Link href="/celebrations" className="font-sans text-[16px] text-on-surface-variant hover:text-on-surface transition-colors">
              Celebrations
            </Link>
            <Link href="/booking" className="font-sans text-[16px] text-on-surface-variant hover:text-on-surface transition-colors">
              Experiences
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}