import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';

export default function TermsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-on-background">
      <Header />
      
      <main className="flex-1 pt-20">
        {/* Hero Section */}
        <section className="relative min-h-[40vh] flex items-center justify-center hero-mesh overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/10"></div>
          </div>
          
          <div className="relative z-10 text-center px-[20px] md:px-[80px] max-w-[1440px] mx-auto">
            <Badge variant="primary" className="mb-4">Legal</Badge>
            <h1 className="font-sans text-[40px] md:text-[64px] font-extrabold leading-[1.1] tracking-tight text-on-surface mb-6 gradient-text">
              Terms of Service
            </h1>
            <p className="font-body text-[18px] text-on-surface-variant max-w-2xl mx-auto">
              Last updated: June 2024
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="py-[120px] px-[20px] md:px-[80px] max-w-[1440px] mx-auto">
          <div className="max-w-3xl mx-auto">
            <Card className="p-8 md:p-12">
              <div className="prose prose-invert max-w-none">
                <h2 className="font-sans text-[28px] font-bold text-on-surface mb-4">Acceptance of Terms</h2>
                <p className="font-body text-[16px] text-on-surface-variant mb-6 leading-relaxed">
                  By accessing or using NAXORA services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
                </p>

                <h2 className="font-sans text-[28px] font-bold text-on-surface mb-4 mt-8">Booking and Reservations</h2>
                <p className="font-body text-[16px] text-on-surface-variant mb-4 leading-relaxed">
                  All bookings are subject to availability and confirmation. A reservation is not considered confirmed until you receive a confirmation from NAXORA.
                </p>
                <ul className="font-body text-[16px] text-on-surface-variant mb-6 space-y-2 list-disc list-inside">
                  <li>Advance booking may be required for peak times</li>
                  <li>Cancellations must be made at least 24 hours in advance</li>
                  <li>No-shows may be charged the full booking fee</li>
                  <li>Valid identification may be required upon arrival</li>
                </ul>

                <h2 className="font-sans text-[28px] font-bold text-on-surface mb-4 mt-8">Payment Terms</h2>
                <p className="font-body text-[16px] text-on-surface-variant mb-4 leading-relaxed">
                  Payment is required at the time of booking or upon arrival, depending on the package selected.
                </p>
                <ul className="font-body text-[16px] text-on-surface-variant mb-6 space-y-2 list-disc list-inside">
                  <li>We accept cash and major payment methods</li>
                  <li>Prices are subject to change without notice</li>
                  <li>Additional charges may apply for extended hours</li>
                  <li>Deposits are non-refundable for cancellations</li>
                </ul>

                <h2 className="font-sans text-[28px] font-bold text-on-surface mb-4 mt-8">Code of Conduct</h2>
                <p className="font-body text-[16px] text-on-surface-variant mb-4 leading-relaxed">
                  Guests are expected to conduct themselves appropriately. NAXORA reserves the right to refuse service or ask guests to leave for:
                </p>
                <ul className="font-body text-[16px] text-on-surface-variant mb-6 space-y-2 list-disc list-inside">
                  <li>Disruptive behavior</li>
                  <li>Violation of safety rules</li>
                  <li>Damage to property</li>
                  <li>Illegal activities</li>
                </ul>

                <h2 className="font-sans text-[28px] font-bold text-on-surface mb-4 mt-8">Liability</h2>
                <p className="font-body text-[16px] text-on-surface-variant mb-6 leading-relaxed">
                  NAXORA is not liable for any personal injury, loss, or damage to personal property during your visit, except where caused by our negligence. Guests are responsible for their personal belongings.
                </p>

                <h2 className="font-sans text-[28px] font-bold text-on-surface mb-4 mt-8">Age Restrictions</h2>
                <p className="font-body text-[16px] text-on-surface-variant mb-6 leading-relaxed">
                  Guests under 18 must be accompanied by an adult. Certain experiences may have specific age requirements. Valid ID may be requested to verify age.
                </p>

                <h2 className="font-sans text-[28px] font-bold text-on-surface mb-4 mt-8">Modifications to Terms</h2>
                <p className="font-body text-[16px] text-on-surface-variant mb-6 leading-relaxed">
                  NAXORA reserves the right to modify these terms at any time. Continued use of our services after changes constitutes acceptance of the new terms.
                </p>

                <h2 className="font-sans text-[28px] font-bold text-on-surface mb-4 mt-8">Contact Information</h2>
                <p className="font-body text-[16px] text-on-surface-variant mb-6 leading-relaxed">
                  For questions about these Terms of Service, please contact us at info@naxora.lk
                </p>
              </div>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}