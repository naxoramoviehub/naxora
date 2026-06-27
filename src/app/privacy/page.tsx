import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';

export default function PrivacyPage() {
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
              Privacy Policy
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
                <h2 className="font-sans text-[28px] font-bold text-on-surface mb-4">Introduction</h2>
                <p className="font-body text-[16px] text-on-surface-variant mb-6 leading-relaxed">
                  NAXORA ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your personal information when you use our services.
                </p>

                <h2 className="font-sans text-[28px] font-bold text-on-surface mb-4 mt-8">Information We Collect</h2>
                <p className="font-body text-[16px] text-on-surface-variant mb-4 leading-relaxed">
                  We collect the following types of information:
                </p>
                <ul className="font-body text-[16px] text-on-surface-variant mb-6 space-y-2 list-disc list-inside">
                  <li>Personal identification information (name, email, phone number)</li>
                  <li>Booking and reservation details</li>
                  <li>Payment information (processed securely through third-party providers)</li>
                  <li>Communication records</li>
                </ul>

                <h2 className="font-sans text-[28px] font-bold text-on-surface mb-4 mt-8">How We Use Your Information</h2>
                <p className="font-body text-[16px] text-on-surface-variant mb-4 leading-relaxed">
                  We use your information to:
                </p>
                <ul className="font-body text-[16px] text-on-surface-variant mb-6 space-y-2 list-disc list-inside">
                  <li>Process and manage your bookings</li>
                  <li>Communicate with you about your reservations</li>
                  <li>Improve our services</li>
                  <li>Send promotional communications (with your consent)</li>
                  <li>Comply with legal obligations</li>
                </ul>

                <h2 className="font-sans text-[28px] font-bold text-on-surface mb-4 mt-8">Data Security</h2>
                <p className="font-body text-[16px] text-on-surface-variant mb-6 leading-relaxed">
                  We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.
                </p>

                <h2 className="font-sans text-[28px] font-bold text-on-surface mb-4 mt-8">Your Rights</h2>
                <p className="font-body text-[16px] text-on-surface-variant mb-4 leading-relaxed">
                  You have the right to:
                </p>
                <ul className="font-body text-[16px] text-on-surface-variant mb-6 space-y-2 list-disc list-inside">
                  <li>Access your personal information</li>
                  <li>Correct inaccurate information</li>
                  <li>Request deletion of your information</li>
                  <li>Opt-out of marketing communications</li>
                </ul>

                <h2 className="font-sans text-[28px] font-bold text-on-surface mb-4 mt-8">Contact Us</h2>
                <p className="font-body text-[16px] text-on-surface-variant mb-6 leading-relaxed">
                  If you have questions about this Privacy Policy, please contact us at info@naxora.lk
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