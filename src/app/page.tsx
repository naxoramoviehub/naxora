import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-on-background">
      <Header />
      
      <main className="flex-1 pt-20">
        {/* Hero Section */}
        <section className="relative min-h-[90vh] flex items-center justify-center hero-mesh overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src="/Hero_image.png"
              alt="NAXORA Luxury Experience"
              fill
              sizes="100vw"
              className="object-cover opacity-40"
              priority
            />
          </div>
          
          <div className="relative z-10 text-center px-[20px] md:px-[80px] max-w-[1440px] mx-auto">
            <div className="mb-8 flex justify-center">
              <Image
                src="/logo.jpeg"
                alt="NAXORA Logo"
                width={120}
                height={120}
                className="rounded-full"
                style={{ width: 'auto', height: 'auto' }}
              />
            </div>
            
            <h1 className="font-sans text-[40px] md:text-[64px] font-extrabold leading-[1.1] tracking-tight text-on-surface mb-6 gradient-text">
              Experience Entertainment
              <br />
              <span className="text-primary">Redefined</span>
            </h1>
            
            <p className="font-body text-[18px] md:text-[20px] text-on-surface-variant max-w-2xl mx-auto mb-8 leading-relaxed">
              Immerse yourself in luxury private cinema screenings, elite gaming experiences, and exclusive celebrations designed for the discerning entertainment enthusiast.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/booking">
                <Button size="lg">Book Your Experience</Button>
              </Link>
              <Link href="/movies">
                <Button variant="secondary" size="lg">Explore Offerings</Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Featured Experiences */}
        <section className="py-[120px] px-[20px] md:px-[80px] max-w-[1440px] mx-auto">
          <div className="text-center mb-16">
            <Badge variant="primary" className="mb-4">Premium Experiences</Badge>
            <h2 className="font-sans text-[32px] md:text-[48px] font-bold text-on-surface mb-4">
              Curated Entertainment
            </h2>
            <p className="font-body text-[18px] text-on-surface-variant max-w-2xl mx-auto">
              Discover our exclusive experiences designed to transform ordinary moments into extraordinary memories.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card glowColor="purple" className="group">
              <div className="relative h-64 mb-6 overflow-hidden rounded-lg">
                <Image
                  src="/image-from-rawpixel-id-12136149-jpeg.jpg"
                  alt="Mini Cabin"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <Badge variant="primary" className="mb-3">From 2350 LKR</Badge>
              <h3 className="font-sans text-[24px] font-bold text-on-surface mb-3">
                Mini Cabin
              </h3>
              <p className="font-body text-[16px] text-on-surface-variant mb-6">
                Perfect for intimate entertainment sessions with Netflix, YouTube, and FHD projector.
              </p>
              <Link href="/booking">
                <Button variant="ghost" className="w-full">Book Now</Button>
              </Link>
            </Card>

            <Card glowColor="cyan" className="group">
              <div className="relative h-64 mb-6 overflow-hidden rounded-lg">
                <Image
                  src="/image-from-rawpixel-id-14510238-jpeg.jpg"
                  alt="Gold Package"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <Badge variant="tertiary" className="mb-3">From 3000 LKR</Badge>
              <h3 className="font-sans text-[24px] font-bold text-on-surface mb-3">
                Gold Package
              </h3>
              <p className="font-body text-[16px] text-on-surface-variant mb-6">
                Premium comfort with A/C cabin, 4K projector, and 7.1 sound system.
              </p>
              <Link href="/booking">
                <Button variant="ghost" className="w-full">Book Now</Button>
              </Link>
            </Card>

            <Card glowColor="purple" className="group">
              <div className="relative h-64 mb-6 overflow-hidden rounded-lg">
                <Image
                  src="/image-from-rawpixel-id-15201674-jpeg.jpg"
                  alt="Grand Celebration"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <Badge variant="secondary" className="mb-3">From 8950 LKR</Badge>
              <h3 className="font-sans text-[24px] font-bold text-on-surface mb-3">
                Grand Celebration
              </h3>
              <p className="font-body text-[16px] text-on-surface-variant mb-6">
                The ultimate celebration experience with party setup, karaoke, and gaming.
              </p>
              <Link href="/booking">
                <Button variant="ghost" className="w-full">Book Now</Button>
              </Link>
            </Card>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-[120px] px-[20px] md:px-[80px] bg-surface-container/30">
          <div className="max-w-[1440px] mx-auto text-center">
            <h2 className="font-sans text-[32px] md:text-[48px] font-bold text-on-surface mb-6">
              Ready to Experience Luxury?
            </h2>
            <p className="font-body text-[18px] text-on-surface-variant max-w-2xl mx-auto mb-8">
              Book your exclusive experience today and discover entertainment at its finest.
            </p>
            <Link href="/booking">
              <Button size="lg">Reserve Your Experience</Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
