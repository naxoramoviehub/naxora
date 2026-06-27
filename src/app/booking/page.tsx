'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import { Sparkles, Calendar, User, Clock, Check } from 'lucide-react';

export default function BookingPage() {
  const router = useRouter();
  const [selectedExperience, setSelectedExperience] = useState<string | null>(null);

  const experiences = [
    {
      id: 'mini-cabin',
      title: 'Mini Cabin Suite',
      description: 'Intimate private lounge perfect for couples or small groups.',
      price: '2350 LKR',
      duration: '2.5 Hours',
      capacity: 'Max 3 Pax',
      extraHour: '900 LKR',
      image: '/image-from-rawpixel-id-12136149-jpeg.jpg',
      category: 'Cinema',
      features: ['Netflix / YouTube HD', 'Comfortable Sofa Cabin', '1080p Laser Projector', '5.1 Positional Audio']
    },
    {
      id: 'elite-silver',
      title: 'Elite Silver Suite',
      description: 'Enhanced screen size and audio fidelity for a cinematic experience.',
      price: '2550 LKR',
      duration: '3.0 Hours',
      capacity: 'Max 4 Pax',
      extraHour: '900 LKR',
      image: '/image-from-rawpixel-id-14510238-jpeg.jpg',
      category: 'Cinema',
      features: ['Netflix / YouTube HD', 'Premium Leather Recliners', 'Full HD Projector System', '5.1 Surround Sound Array']
    },
    {
      id: 'gold',
      title: 'Gold VIP Cabin',
      description: 'Complete luxury with climate-control air conditioning and 4K resolution.',
      price: '3000 LKR',
      duration: '3.0 Hours',
      capacity: 'Max 4 Pax',
      extraHour: '1000 LKR',
      image: '/image-from-rawpixel-id-15201674-jpeg.jpg',
      category: 'Cinema & Gaming',
      features: ['Climate A/C Control', 'Premium Reclining Sofa', 'Native 4K Projector Screen', '7.1 Positional Audio Setup']
    },
    {
      id: 'platinum',
      title: 'Platinum Gamer Suite',
      description: 'High-performance console gaming setup coupled with cinematic movie streams.',
      price: '3450 LKR',
      duration: '3.0 Hours',
      capacity: 'Max 4 Pax',
      extraHour: '1000 LKR',
      image: '/image-from-rawpixel-id-12136149-jpeg.jpg',
      category: 'Gaming Focus',
      features: ['PS5 / PS4 Pro Console', '4 Wireless Controllers', 'Climate A/C Control', '7.1 Sound & 4K Projector']
    },
    {
      id: 'royal',
      title: 'Royal VIP Suite',
      description: 'Generous suite size designed for larger family viewings or group co-op gaming.',
      price: '5300 LKR',
      duration: '3.0 Hours',
      capacity: 'Max 6 Pax',
      extraHour: '1300 LKR',
      image: '/image-from-rawpixel-id-14510238-jpeg.jpg',
      category: 'Celebration VIP',
      features: ['VIP Lounge Seating', 'PS5 Console / PS4 Pro', 'Large 4K Laser Screen', '7.1 Positional Audio Setup']
    },
    {
      id: 'lite-celebration',
      title: 'Lite Celebration Package',
      description: 'Ideal package for hosting surprise birthday parties or small milestones.',
      price: '6250 LKR',
      duration: '3.0 Hours',
      capacity: 'Max 6 Pax',
      extraHour: '1600 LKR',
      image: '/image-from-rawpixel-id-15201674-jpeg.jpg',
      category: 'Celebration Focus',
      features: ['Balloon & Banner Setup', 'Pro Wireless Karaoke Mics', 'PS5 / PS4 Pro System', 'Beverages & Catering Space']
    },
    {
      id: 'grand-celebration',
      title: 'Grand Celebration Package',
      description: 'Our ultimate luxury party package with extended duration and full decorations.',
      price: '8950 LKR',
      duration: '4.0 Hours',
      capacity: 'Max 8 Pax',
      extraHour: '1900 LKR',
      image: '/image-from-rawpixel-id-15201674-jpeg.jpg',
      category: 'Celebration Focus',
      features: ['Full Balloon Theme Decor', 'Extended 4-Hour Block', 'Wireless Dual Karaoke Mics', 'PS5 Console + Games Suite', 'Complimentary Snack Tray']
    }
  ];

  const handleSelect = (id: string) => {
    setSelectedExperience(id);
  };

  const handleContinue = () => {
    if (selectedExperience) {
      router.push(`/booking/${selectedExperience}`);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-on-background">
      <Header />
      
      <main className="flex-1 pt-20">
        {/* Step Indicator Header */}
        <section className="pt-16 pb-8 px-5 md:px-[80px] max-w-[1440px] mx-auto text-center">
          <div className="mb-4">
            <Badge variant="primary">Step 1 of 3</Badge>
          </div>
          <h1 className="font-sans text-[36px] md:text-[52px] font-extrabold text-white tracking-tight mb-4">
            Select Your Suite
          </h1>
          <p className="font-body text-[16px] sm:text-[18px] text-on-surface-variant max-w-2xl mx-auto mb-12">
            Choose the private cinema cabin or celebration suite that fits your group size and entertainment needs.
          </p>

          {/* Clean Progress Wizard Bar */}
          <div className="max-w-md mx-auto relative mb-12">
            <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-surface-container -translate-y-1/2 z-0" />
            <div className="absolute top-1/2 left-0 w-1/3 h-[2px] bg-primary -translate-y-1/2 z-0 transition-all duration-300" />
            <div className="relative z-10 flex justify-between">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-mono text-sm font-bold shadow-lg shadow-primary/25">1</div>
                <span className="text-xs font-semibold text-white mt-2">Suite</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-surface-container text-on-surface-variant flex items-center justify-center font-mono text-sm font-bold">2</div>
                <span className="text-xs font-medium text-on-surface-variant mt-2">Time Slot</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-surface-container text-on-surface-variant flex items-center justify-center font-mono text-sm font-bold">3</div>
                <span className="text-xs font-medium text-on-surface-variant mt-2">Details</span>
              </div>
            </div>
          </div>
        </section>

        {/* Experience Cards Grid */}
        <section className="pb-24 px-5 md:px-[80px] max-w-[1440px] mx-auto z-10 relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {experiences.map((exp) => {
              const isSelected = selectedExperience === exp.id;
              return (
                <Card
                  key={exp.id}
                  glowColor={isSelected ? 'purple' : 'none'}
                  className={`cursor-pointer group flex flex-col p-5 border transition-all duration-300 ${
                    isSelected ? 'border-primary bg-surface-container/60 shadow-[0_0_20px_rgba(139,92,246,0.15)]' : 'border-glass-stroke hover:bg-surface-elevated/40'
                  }`}
                  onClick={() => handleSelect(exp.id)}
                >
                  {/* Photo Container */}
                  <div className="relative h-44 mb-5 overflow-hidden rounded-xl bg-surface-base">
                    <Image
                      src={exp.image}
                      alt={exp.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 20vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 z-10">
                      <span className="font-mono text-[10px] font-bold uppercase bg-background/80 backdrop-blur-sm border border-glass-stroke text-white px-2 py-0.5 rounded-full">
                        {exp.category}
                      </span>
                    </div>
                    {isSelected && (
                      <div className="absolute top-3 right-3 z-10 w-6 h-6 rounded-full bg-primary flex items-center justify-center text-white border border-primary/20 shadow-lg">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                    )}
                  </div>

                  <h3 className="font-sans text-[20px] font-bold text-white mb-2 group-hover:text-primary transition-colors">
                    {exp.title}
                  </h3>
                  
                  <p className="font-body text-[14px] text-on-surface-variant mb-4 leading-relaxed line-clamp-3">
                    {exp.description}
                  </p>

                  <div className="flex items-baseline gap-1 mb-4 border-b border-glass-stroke pb-3">
                    <span className="font-mono text-xl font-bold text-primary">{exp.price}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-y-2 gap-x-1.5 text-xs text-on-surface-variant mb-6 font-medium">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-primary shrink-0" />
                      <span>{exp.duration}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-primary shrink-0" />
                      <span>{exp.capacity}</span>
                    </div>
                  </div>

                  {/* Feature Checks */}
                  <div className="mt-auto border-t border-glass-stroke/50 pt-4">
                    <ul className="space-y-1.5">
                      {exp.features.map((feature, i) => (
                        <li key={i} className="font-body text-[12px] text-on-surface-variant flex items-start gap-1.5">
                          <Check className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Floating Actions */}
          <div className="flex justify-center gap-4 mt-16">
            <Link href="/">
              <Button variant="secondary" size="lg">Back Home</Button>
            </Link>
            <Button 
              size="lg" 
              onClick={handleContinue}
              disabled={!selectedExperience}
              variant={selectedExperience ? 'primary' : 'secondary'}
              className={!selectedExperience ? 'opacity-40 cursor-not-allowed' : ''}
            >
              Continue to Time Slots
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}