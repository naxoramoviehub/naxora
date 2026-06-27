'use client';

import Link from 'next/link';
import { Facebook, Instagram, Youtube, Send } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function Footer() {
  return (
    <footer className="bg-surface-container-lowest border-t border-glass-stroke pt-20 pb-10 px-5 md:px-[80px] z-10 relative">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 mb-16">
          {/* Logo & Intro */}
          <div className="lg:col-span-2">
            <h3 className="font-sans text-[26px] font-extrabold tracking-tighter text-white mb-4">
              NAXORA
            </h3>
            <p className="font-body text-[16px] text-on-surface-variant mb-6 max-w-sm leading-relaxed">
              Premium private cinema and gaming experiences custom-tailored for the discerning entertainment enthusiast. Enjoy unparalleled luxury, technology, and service.
            </p>
            {/* Social Icons */}
            <div className="flex items-center space-x-4">
              <a href="#" className="w-10 h-10 rounded-full border border-glass-stroke flex items-center justify-center text-on-surface-variant hover:text-white hover:border-primary/50 hover:bg-primary/5 transition-all">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-glass-stroke flex items-center justify-center text-on-surface-variant hover:text-white hover:border-primary/50 hover:bg-primary/5 transition-all">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-glass-stroke flex items-center justify-center text-on-surface-variant hover:text-white hover:border-primary/50 hover:bg-primary/5 transition-all">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links Column 1 */}
          <div>
            <h4 className="font-sans text-[15px] font-bold text-white uppercase tracking-wider mb-5">Offerings</h4>
            <ul className="space-y-3.5">
              <li>
                <Link href="/packages" className="font-body text-[15px] text-on-surface-variant hover:text-white transition-colors">
                  Private Suites
                </Link>
              </li>
              <li>
                <Link href="/packages#technology" className="font-body text-[15px] text-on-surface-variant hover:text-white transition-colors">
                  Hardware Specs
                </Link>
              </li>
              <li>
                <Link href="/packages#services" className="font-body text-[15px] text-on-surface-variant hover:text-white transition-colors">
                  Event Services
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links Column 2 */}
          <div>
            <h4 className="font-sans text-[15px] font-bold text-white uppercase tracking-wider mb-5">Company</h4>
            <ul className="space-y-3.5">
              <li>
                <Link href="/about" className="font-body text-[15px] text-on-surface-variant hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="font-body text-[15px] text-on-surface-variant hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/careers" className="font-body text-[15px] text-on-surface-variant hover:text-white transition-colors">
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter / Custom Field */}
          <div>
            <h4 className="font-sans text-[15px] font-bold text-white uppercase tracking-wider mb-5">Stay Updated</h4>
            <p className="font-body text-[14px] text-on-surface-variant mb-4 leading-relaxed">
              Subscribe to receive updates about new screenings, tournaments, and exclusive offers.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-4 py-2.5 bg-surface-container border border-glass-stroke rounded-lg text-sm text-white focus:outline-none focus:border-primary/50 placeholder:text-muted"
                required
              />
              <Button type="submit" variant="primary" className="!px-3 !py-2.5">
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </div>
        </div>

        {/* Bottom border & links */}
        <div className="border-t border-glass-stroke mt-16 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-body text-[14px] text-on-surface-variant order-2 md:order-1">
            © 2026 NAXORA. All rights reserved.
          </p>
          <div className="flex items-center space-x-6 order-1 md:order-2">
            <Link href="/privacy" className="font-body text-[14px] text-on-surface-variant hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="font-body text-[14px] text-on-surface-variant hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}