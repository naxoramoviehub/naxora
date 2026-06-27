import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-surface-container border-t border-glass-stroke py-[60px] px-[20px] md:px-[80px]">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-[40px]">
          <div>
            <h3 className="font-sans text-[24px] font-extrabold tracking-tighter text-primary mb-[16px]">
              NAXORA
            </h3>
            <p className="font-body text-[16px] text-on-surface-variant">
              Premium private cinema and gaming experiences for the discerning entertainment enthusiast.
            </p>
          </div>

          <div>
            <h4 className="font-sans text-[16px] font-semibold text-on-surface mb-[16px]">Experiences</h4>
            <ul className="space-y-[8px]">
              <li>
                <Link href="/movies" className="font-body text-[16px] text-on-surface-variant hover:text-on-surface transition-colors">
                  Private Cinema
                </Link>
              </li>
              <li>
                <Link href="/gaming" className="font-body text-[16px] text-on-surface-variant hover:text-on-surface transition-colors">
                  Elite Gaming
                </Link>
              </li>
              <li>
                <Link href="/celebrations" className="font-body text-[16px] text-on-surface-variant hover:text-on-surface transition-colors">
                  Luxury Celebrations
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-sans text-[16px] font-semibold text-on-surface mb-[16px]">Company</h4>
            <ul className="space-y-[8px]">
              <li>
                <Link href="/about" className="font-body text-[16px] text-on-surface-variant hover:text-on-surface transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="font-body text-[16px] text-on-surface-variant hover:text-on-surface transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/careers" className="font-body text-[16px] text-on-surface-variant hover:text-on-surface transition-colors">
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-sans text-[16px] font-semibold text-on-surface mb-[16px]">Legal</h4>
            <ul className="space-y-[8px]">
              <li>
                <Link href="/privacy" className="font-body text-[16px] text-on-surface-variant hover:text-on-surface transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="font-body text-[16px] text-on-surface-variant hover:text-on-surface transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-glass-stroke mt-[40px] pt-[40px] text-center">
          <p className="font-body text-[16px] text-on-surface-variant">
            © 2024 NAXORA. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}