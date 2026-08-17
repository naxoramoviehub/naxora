import Link from 'next/link';

import { Facebook, Instagram, MapPin, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-surface-container-lowest border-t border-glass-stroke pt-20 pb-10 px-5 md:px-[80px] z-10 relative">
      <div className="max-w-[1440px] mx-auto">
        
        {/* Map Location Section Removed */}

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 mb-16 border-t border-glass-stroke pt-16">
          {/* Logo & Intro */}
          <div className="lg:col-span-2">
            <h3 className="font-sans text-[26px] font-extrabold tracking-tighter text-white mb-4">
              NAXORA
            </h3>
            <p className="font-body text-[16px] text-on-surface-variant mb-6 max-w-sm leading-relaxed">
              Premium private cinema and gaming experiences custom-tailored for the discerning entertainment enthusiast. Enjoy unparalleled luxury, technology, and service.
            </p>
            <a href="https://wa.me/94707735599" target="_blank" rel="noreferrer" className="inline-flex rounded-xl border border-primary/30 px-4 py-2 text-sm font-bold text-primary hover:bg-primary/10">Chat on WhatsApp</a>
          </div>

          {/* Quick Links Column 1 */}
          <div>
            <h4 className="font-sans text-[15px] font-bold text-white uppercase tracking-wider mb-5">Offerings</h4>
            <ul className="space-y-3.5">
              <li>
                <Link href="/#packages" className="font-body text-[15px] text-on-surface-variant hover:text-white transition-colors">
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
                <Link href="/#about" className="font-body text-[15px] text-on-surface-variant hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="font-body text-[15px] text-on-surface-variant hover:text-white transition-colors">
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

          {/* Contact & Socials */}
          <div>
            <h4 className="font-sans text-[15px] font-bold text-white uppercase tracking-wider mb-5">Connect</h4>
            
            <div className="flex flex-col gap-4 mb-6">
              <a href="https://maps.app.goo.gl/fwHmwaP8cJHWU8pZA?g_st=iw" target="_blank" rel="noreferrer" className="flex items-start gap-3 group text-on-surface-variant hover:text-white transition-colors">
                <MapPin className="w-5 h-5 shrink-0 mt-0.5 text-primary group-hover:text-white transition-colors" />
                <span className="font-body text-[14px] leading-relaxed">
                  Visit Naxora Kandy Location
                </span>
              </a>
              
              <a href="mailto:naxoramovihub@gmail.com" className="flex items-center gap-3 group text-on-surface-variant hover:text-white transition-colors">
                <Mail className="w-5 h-5 shrink-0 text-primary group-hover:text-white transition-colors" />
                <span className="font-body text-[14px]">naxoramovihub@gmail.com</span>
              </a>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-4">
              <a href="https://instagram.com/naxora_kandy" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full border border-glass-stroke flex items-center justify-center text-on-surface-variant hover:text-white hover:border-white hover:bg-white/5 transition-all" aria-label="Instagram">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="https://facebook.com/naxora.kandy" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full border border-glass-stroke flex items-center justify-center text-on-surface-variant hover:text-white hover:border-white hover:bg-white/5 transition-all" aria-label="Facebook">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="https://tiktok.com/@naxora_kandy" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full border border-glass-stroke flex items-center justify-center text-on-surface-variant hover:text-white hover:border-white hover:bg-white/5 transition-all" aria-label="TikTok">
                <svg fill="currentColor" viewBox="0 0 24 24" className="w-4 h-4">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.34 2.88 2.88 0 0 1 2.31-4.52 2.66 2.66 0 0 1 1.62.53V9.5a6.05 6.05 0 0 0-1.62-.22 6.34 6.34 0 0 0-6.32 6.33 6.35 6.35 0 0 0 6.32 6.32 6.34 6.34 0 0 0 6.31-6.27v-6.3a8.2 8.2 0 0 0 3.8 1.05z" />
                </svg>
              </a>
            </div>
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
