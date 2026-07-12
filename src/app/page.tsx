'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Hero from '@/components/sections/Hero';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Home() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const featuredExperiences = [
    {
      id: 'mini-cabin',
      title: 'Mini Cabin Suite',
      price: 'From 2350 LKR',
      capacity: 'Max 3 pax',
      glow: 'purple' as const,
      badgeVariant: 'primary' as const,
      image: '/image-from-rawpixel-id-12136149-jpeg.jpg',
      description: 'Perfect for intimate entertainment sessions with FHD projection, 5.1 surround sound, and standard Netflix/YouTube streaming.'
    },
    {
      id: 'elite-silver',
      title: 'Elite Silver Suite',
      price: 'From 2550 LKR',
      capacity: 'Max 4 pax',
      glow: 'cyan' as const,
      badgeVariant: 'secondary' as const,
      image: '/image-from-rawpixel-id-14510238-jpeg.jpg',
      description: 'Enhanced screen size and audio fidelity for a cinematic experience.'
    },
    {
      id: 'gold',
      title: 'Gold VIP Cabin',
      price: 'From 3000 LKR',
      capacity: 'Max 4 pax',
      glow: 'purple' as const,
      badgeVariant: 'tertiary' as const,
      image: '/gold_vip_cabin.png',
      description: 'Premium comfort with a fully air-conditioned cabin, 4K projector, 7.1 audio sound system, and reclining seating.'
    },
    {
      id: 'platinum',
      title: 'Platinum Gamer Suite',
      price: 'From 3450 LKR',
      capacity: 'Max 4 pax',
      glow: 'cyan' as const,
      badgeVariant: 'primary' as const,
      image: '/image-from-rawpixel-id-12136149-jpeg.jpg',
      description: 'High-performance console gaming setup coupled with cinematic movie streams.'
    },
    {
      id: 'royal',
      title: 'Royal VIP Suite',
      price: 'From 5300 LKR',
      capacity: 'Max 6 pax',
      glow: 'purple' as const,
      badgeVariant: 'secondary' as const,
      image: '/image-from-rawpixel-id-14510238-jpeg.jpg',
      description: 'Generous suite size designed for larger family viewings or group co-op gaming.'
    },
    {
      id: 'lite-celebration',
      title: 'Lite Celebration Package',
      price: 'From 6250 LKR',
      capacity: 'Max 6 pax',
      glow: 'cyan' as const,
      badgeVariant: 'tertiary' as const,
      image: '/gold_vip_cabin.png',
      description: 'Ideal package for hosting surprise birthday parties or small milestones.'
    },
    {
      id: 'grand-celebration',
      title: 'Grand Celebration Package',
      price: 'From 8950 LKR',
      capacity: 'Max 8 pax',
      glow: 'purple' as const,
      badgeVariant: 'primary' as const,
      image: '/gold_vip_cabin.png',
      description: 'The ultimate private event package, including ambient party decorations, a pro-grade karaoke setup, PS5 gaming, and a massive screen.'
    }
  ];

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft } = scrollRef.current;
      const card = scrollRef.current.firstElementChild as HTMLElement;
      const cardWidth = card ? card.offsetWidth + 24 : 374; // exact card width + gap (24px)
      const scrollTo = direction === 'left' 
        ? scrollLeft - cardWidth 
        : scrollLeft + cardWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-on-background">
      <Header />
      
      <main id="main-content" className="flex-1">
        {/* Hero Section */}
        <Hero />

        <section aria-label="Why choose NAXORA" className="relative z-10 border-y border-glass-stroke bg-surface-container-lowest/50 px-5 py-10 md:px-20">
          <div className="mx-auto grid max-w-[1200px] gap-6 text-center sm:grid-cols-2 lg:grid-cols-4">
            {[['Private by design','Sound-conscious cabins reserved only for your group.'],['Clear pricing','Upfront package pricing with no surprise booking fees.'],['Flexible occasions','Movie nights, gaming sessions and milestone celebrations.'],['Human support','Coordinate details directly with our team on WhatsApp.']].map(([title,copy]) => <div key={title}><h2 className="mb-2 font-sans text-lg font-bold text-white">{title}</h2><p className="text-sm leading-relaxed text-on-surface-variant">{copy}</p></div>)}
          </div>
        </section>

        {/* Featured Experiences */}
        <section className="py-24 px-5 md:px-[80px] max-w-[1440px] mx-auto z-10 relative overflow-hidden">
          {/* Header Row */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <Badge variant="primary" className="mb-4">Premium Offerings</Badge>
              <h2 className="font-sans text-[36px] md:text-[50px] font-bold text-white tracking-tight leading-[1.1]">
                Curated Private Entertainment
              </h2>
              <p className="font-body text-[16px] sm:text-[18px] text-on-surface-variant max-w-2xl mt-3 leading-relaxed">
                Explore custom private suites featuring high-end projector systems, surround sound setups, and elite gaming zones.
              </p>
            </div>
            
            {/* Scroll Buttons */}
            <div className="flex items-center space-x-3 self-start md:self-auto shrink-0">
              <button 
                onClick={() => handleScroll('left')}
                className="w-12 h-12 rounded-full border border-glass-stroke flex items-center justify-center text-white hover:bg-white/5 transition-all cursor-pointer"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button 
                onClick={() => handleScroll('right')}
                className="w-12 h-12 rounded-full border border-glass-stroke flex items-center justify-center text-white hover:bg-white/5 transition-all cursor-pointer"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Carousel Slider */}
          <div 
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-8 -mx-5 px-5 md:-mx-[80px] md:px-[80px] select-none scrollbar-none"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {featuredExperiences.map((exp) => (
              <Card 
                key={exp.id} 
                glowColor={exp.glow} 
                className="group p-5 snap-start shrink-0 w-[290px] sm:w-[340px] lg:w-[calc((100%-48px)/3)] flex flex-col"
              >
                <div className="relative h-56 mb-5 overflow-hidden rounded-xl bg-surface-base">
                  <Image
                    src={exp.image}
                    alt={exp.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 350px"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                
                <div className="flex items-center justify-between mb-4">
                  <Badge variant={exp.badgeVariant}>{exp.price}</Badge>
                  <span className="font-mono text-xs text-on-surface-variant font-semibold">{exp.capacity}</span>
                </div>
                
                <h3 className="font-sans text-[20px] font-bold text-white mb-2 group-hover:text-primary transition-colors">
                  {exp.title}
                </h3>
                
                <p className="font-body text-[14px] text-on-surface-variant mb-6 leading-relaxed flex-grow line-clamp-3">
                  {exp.description}
                </p>
                
                <Link href={`/packages/${exp.id}`}>
                  <Button variant="secondary" className="w-full mt-auto">Explore & Book</Button>
                </Link>
              </Card>
            ))}
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
              <Link href="/packages">
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
