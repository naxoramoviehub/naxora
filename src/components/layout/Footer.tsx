import Link from 'next/link';

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
            <a href="https://wa.me/94707735599" target="_blank" rel="noreferrer" className="inline-flex rounded-xl border border-primary/30 px-4 py-2 text-sm font-bold text-primary hover:bg-primary/10">Chat on WhatsApp</a>
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

          {/* Contact */}
          <div>
            <h4 className="font-sans text-[15px] font-bold text-white uppercase tracking-wider mb-5">Plan a visit</h4>
            <p className="font-body text-[14px] text-on-surface-variant mb-4 leading-relaxed">
              Open daily with four reservable sessions. Contact our team for location details, accessibility needs, or custom events.
            </p>
            <a href="mailto:naxoramovihub@gmail.com" className="text-sm text-primary hover:underline">naxoramovihub@gmail.com</a>
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
