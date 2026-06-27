import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Hero from '@/components/sections/Hero';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-on-background">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <Hero />

        {/* Featured Experiences */}
        <section className="py-24 px-5 md:px-[80px] max-w-[1440px] mx-auto z-10 relative">
          <div className="text-center mb-20">
            <Badge variant="primary" className="mb-4">Premium Offerings</Badge>
            <h2 className="font-sans text-[36px] md:text-[50px] font-bold text-white mb-4 tracking-tight">
              Curated Private Entertainment
            </h2>
            <p className="font-body text-[16px] sm:text-[18px] text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
              Explore custom private suites featuring high-end projector systems, surround sound setups, and elite gaming zones.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card glowColor="purple" className="group p-5">
              <div className="relative h-64 mb-6 overflow-hidden rounded-xl">
                <Image
                  src="/image-from-rawpixel-id-12136149-jpeg.jpg"
                  alt="Mini Cabin"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="flex items-center justify-between mb-4">
                <Badge variant="primary">From 2350 LKR</Badge>
                <span className="font-mono text-xs text-on-surface-variant">Max 3 pax</span>
              </div>
              <h3 className="font-sans text-[22px] font-bold text-white mb-2 group-hover:text-primary transition-colors">
                Mini Cabin
              </h3>
              <p className="font-body text-[15px] text-on-surface-variant mb-6 leading-relaxed">
                Perfect for intimate entertainment sessions with FHD projection, 5.1 surround sound, and standard Netflix/YouTube streaming.
              </p>
              <Link href="/booking">
                <Button variant="secondary" className="w-full">Explore & Book</Button>
              </Link>
            </Card>

            <Card glowColor="cyan" className="group p-5">
              <div className="relative h-64 mb-6 overflow-hidden rounded-xl">
                <Image
                  src="/image-from-rawpixel-id-14510238-jpeg.jpg"
                  alt="Gold Package"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="flex items-center justify-between mb-4">
                <Badge variant="tertiary">From 3000 LKR</Badge>
                <span className="font-mono text-xs text-on-surface-variant">Max 4 pax</span>
              </div>
              <h3 className="font-sans text-[22px] font-bold text-white mb-2 group-hover:text-tertiary transition-colors">
                Gold Package
              </h3>
              <p className="font-body text-[15px] text-on-surface-variant mb-6 leading-relaxed">
                Premium comfort with a fully air-conditioned cabin, 4K projector, 7.1 audio sound system, and reclining seating.
              </p>
              <Link href="/booking">
                <Button variant="secondary" className="w-full">Explore & Book</Button>
              </Link>
            </Card>

            <Card glowColor="purple" className="group p-5">
              <div className="relative h-64 mb-6 overflow-hidden rounded-xl">
                <Image
                  src="/image-from-rawpixel-id-15201674-jpeg.jpg"
                  alt="Grand Celebration"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="flex items-center justify-between mb-4">
                <Badge variant="secondary">From 8950 LKR</Badge>
                <span className="font-mono text-xs text-on-surface-variant">Max 8 pax</span>
              </div>
              <h3 className="font-sans text-[22px] font-bold text-white mb-2 group-hover:text-primary transition-colors">
                Grand Celebration
              </h3>
              <p className="font-body text-[15px] text-on-surface-variant mb-6 leading-relaxed">
                The ultimate private event package, including ambient party decorations, a pro-grade karaoke setup, PS4 gaming, and a massive screen.
              </p>
              <Link href="/booking">
                <Button variant="secondary" className="w-full">Explore & Book</Button>
              </Link>
            </Card>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-24 px-5 md:px-[80px] bg-surface-container-lowest/40 z-10 relative">
          <div className="max-w-[1000px] mx-auto text-center border border-glass-stroke bg-surface-elevated/20 p-12 md:p-20 rounded-3xl backdrop-blur-md">
            <h2 className="font-sans text-[36px] md:text-[50px] font-bold text-white mb-6 tracking-tight leading-none">
              Ready to Experience Private Luxury?
            </h2>
            <p className="font-body text-[16px] sm:text-[18px] text-on-surface-variant max-w-2xl mx-auto mb-10 leading-relaxed">
              Book your slot now and custom-design your private viewing or gaming session with us. Perfect for date nights, game days, and milestone celebrations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/booking">
                <Button size="lg" variant="primary">Reserve Your Experience</Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="secondary">Contact Events Team</Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
