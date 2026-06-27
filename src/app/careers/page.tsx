import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';

export default function CareersPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-on-background">
      <Header />
      
      <main className="flex-1 pt-20">
        {/* Hero Section */}
        <section className="relative min-h-[60vh] flex items-center justify-center hero-mesh overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/10"></div>
          </div>
          
          <div className="relative z-10 text-center px-[20px] md:px-[80px] max-w-[1440px] mx-auto">
            <Badge variant="primary" className="mb-4">Join Our Team</Badge>
            <h1 className="font-sans text-[40px] md:text-[64px] font-extrabold leading-[1.1] tracking-tight text-on-surface mb-6 gradient-text">
              Careers at NAXORA
            </h1>
            <p className="font-body text-[18px] md:text-[20px] text-on-surface-variant max-w-2xl mx-auto mb-8 leading-relaxed">
              Be part of Sri Lanka's premier entertainment experience. We're always looking for passionate individuals to join our team.
            </p>
          </div>
        </section>

        {/* Why Join Us */}
        <section className="py-[120px] px-[20px] md:px-[80px] max-w-[1440px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-sans text-[32px] md:text-[48px] font-bold text-on-surface mb-4">
              Why Join NAXORA?
            </h2>
            <p className="font-body text-[18px] text-on-surface-variant max-w-2xl mx-auto">
              Discover the benefits of being part of our team.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card glowColor="purple" className="p-8 text-center">
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="font-sans text-[24px] font-bold text-on-surface mb-3">Growth Opportunities</h3>
              <p className="font-body text-[16px] text-on-surface-variant">
                We believe in promoting from within and providing opportunities for professional development.
              </p>
            </Card>

            <Card glowColor="cyan" className="p-8 text-center">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="font-sans text-[24px] font-bold text-on-surface mb-3">Dynamic Environment</h3>
              <p className="font-body text-[16px] text-on-surface-variant">
                Work in a fast-paced, exciting entertainment industry with cutting-edge technology.
              </p>
            </Card>

            <Card glowColor="purple" className="p-8 text-center">
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="font-sans text-[24px] font-bold text-on-surface mb-3">Great Team</h3>
              <p className="font-body text-[16px] text-on-surface-variant">
                Join a supportive, collaborative team that values creativity and excellence.
              </p>
            </Card>
          </div>
        </section>

        {/* Open Positions */}
        <section className="py-[120px] px-[20px] md:px-[80px] bg-surface-container/30">
          <div className="max-w-[1440px] mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-sans text-[32px] md:text-[48px] font-bold text-on-surface mb-4">
                Open Positions
              </h2>
              <p className="font-body text-[18px] text-on-surface-variant max-w-2xl mx-auto">
                We're currently looking for talented individuals to fill the following positions.
              </p>
            </div>

            <div className="max-w-3xl mx-auto space-y-6">
              <Card glowColor="purple" className="p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <h3 className="font-sans text-[24px] font-bold text-on-surface mb-2">Customer Experience Associate</h3>
                    <p className="font-body text-[16px] text-on-surface-variant mb-2">
                      Full-time • Colombo
                    </p>
                    <p className="font-body text-[16px] text-on-surface-variant">
                      Join our front-of-house team to deliver exceptional guest experiences.
                    </p>
                  </div>
                  <Link href="/contact">
                    <Button>Apply Now</Button>
                  </Link>
                </div>
              </Card>

              <Card glowColor="cyan" className="p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <h3 className="font-sans text-[24px] font-bold text-on-surface mb-2">Technical Support Specialist</h3>
                    <p className="font-body text-[16px] text-on-surface-variant mb-2">
                      Full-time • Colombo
                    </p>
                    <p className="font-body text-[16px] text-on-surface-variant">
                      Maintain and troubleshoot our audio-visual and gaming equipment.
                    </p>
                  </div>
                  <Link href="/contact">
                    <Button>Apply Now</Button>
                  </Link>
                </div>
              </Card>

              <Card glowColor="purple" className="p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <h3 className="font-sans text-[24px] font-bold text-on-surface mb-2">Event Coordinator</h3>
                    <p className="font-body text-[16px] text-on-surface-variant mb-2">
                      Full-time • Colombo
                    </p>
                    <p className="font-body text-[16px] text-on-surface-variant">
                      Plan and execute memorable celebration events for our guests.
                    </p>
                  </div>
                  <Link href="/contact">
                    <Button>Apply Now</Button>
                  </Link>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* How to Apply */}
        <section className="py-[120px] px-[20px] md:px-[80px] max-w-[1440px] mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-sans text-[32px] md:text-[48px] font-bold text-on-surface mb-6">
              How to Apply
            </h2>
            <p className="font-body text-[18px] text-on-surface-variant mb-8 leading-relaxed">
              Interested in joining our team? Send your resume and a brief cover letter to our HR team. We review all applications and will contact qualified candidates for interviews.
            </p>
            <div className="flex justify-center">
              <Link href="/contact">
                <Button size="lg">Submit Application</Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}