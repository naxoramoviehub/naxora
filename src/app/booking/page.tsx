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

export default function BookingPage() {
  const router = useRouter();
  const [selectedExperience, setSelectedExperience] = useState<string | null>(null);

  const experiences = [
    {
      id: 'mini-cabin',
      title: 'Mini Cabin',
      description: 'Perfect for intimate entertainment sessions',
      price: '2350 LKR',
      duration: '2.5 hours',
      capacity: 'Max 3 pax',
      extraHour: '900 LKR',
      image: '/image-from-rawpixel-id-12136149-jpeg.jpg',
      features: ['Netflix / YouTube', 'NON A/C Cabin', 'FHD Projector', '5.1 sound system']
    },
    {
      id: 'elite-silver',
      title: 'Elite / Silver Package',
      description: 'Enhanced entertainment experience',
      price: '2550 LKR',
      duration: '3 hours',
      capacity: 'Max 4 pax',
      extraHour: '900 LKR',
      image: '/image-from-rawpixel-id-14510238-jpeg.jpg',
      features: ['Netflix / YouTube', 'NON A/C cabin', 'FHD Projector', '5.1 sound system']
    },
    {
      id: 'gold',
      title: 'Gold Package',
      description: 'Premium comfort with air conditioning',
      price: '3000 LKR',
      duration: '3 hours',
      capacity: 'Max 4 pax',
      extraHour: '1000 LKR',
      image: '/image-from-rawpixel-id-15201674-jpeg.jpg',
      features: ['Netflix / YouTube', 'A/C cabin', '4K Projector', '7.1 sound system']
    },
    {
      id: 'platinum',
      title: 'Platinum Package',
      description: 'Ultimate gaming and entertainment',
      price: '3450 LKR',
      duration: '3 hours',
      capacity: 'Max 4 pax',
      extraHour: '1000 LKR',
      image: '/image-from-rawpixel-id-12136149-jpeg.jpg',
      features: ['PS4 Gaming', 'Netflix / YouTube', '4K Projector', '7.1 sound system']
    },
    {
      id: 'royal',
      title: 'Royal Package',
      description: 'Spacious luxury for groups',
      price: '5300 LKR',
      duration: '3 hours',
      capacity: 'Max 6 pax',
      extraHour: '1300 LKR',
      image: '/image-from-rawpixel-id-14510238-jpeg.jpg',
      features: ['PS4 Gaming', 'Netflix / YouTube', 'Spacious cabin', '7.1 sound system', '4K Projector']
    },
    {
      id: 'lite-celebration',
      title: 'Lite Celebration Package',
      description: 'Perfect for small parties and gatherings',
      price: '6250 LKR',
      duration: '3 hours',
      capacity: 'Max 6 pax',
      extraHour: '1600 LKR',
      image: '/image-from-rawpixel-id-15201674-jpeg.jpg',
      features: ['Party setup', 'Spacious cabin', 'PS4 Gaming', 'Netflix / YouTube', 'Karaoke setup', '4K Projector']
    },
    {
      id: 'grand-celebration',
      title: 'Grand Celebration Package',
      description: 'The ultimate celebration experience',
      price: '8950 LKR',
      duration: '4 hours',
      capacity: 'Max 8 pax',
      extraHour: '1900 LKR',
      image: '/image-from-rawpixel-id-15201674-jpeg.jpg',
      features: ['Party setup', 'Spacious cabin', 'Karaoke setup', 'PS4 Gaming', 'Netflix / YouTube']
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
        {/* Header */}
        <section className="py-[60px] px-[20px] md:px-[80px] max-w-[1440px] mx-auto">
          <div className="text-center mb-8">
            <Badge variant="primary" className="mb-4">Step 1 of 4</Badge>
            <h1 className="font-sans text-[40px] md:text-[48px] font-bold text-on-surface mb-4">
              Select Your Experience
            </h1>
            <p className="font-body text-[18px] text-on-surface-variant max-w-2xl mx-auto">
              Choose from our exclusive experiences designed for unforgettable entertainment.
            </p>
          </div>

          {/* Progress Bar */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center font-mono text-sm font-bold">1</div>
                <span className="ml-2 font-body text-sm text-on-surface">Experience</span>
              </div>
              <div className="flex-1 h-1 bg-surface-container mx-4">
                <div className="h-full bg-primary w-1/4"></div>
              </div>
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-surface-container text-on-surface-variant flex items-center justify-center font-mono text-sm font-bold">2</div>
                <span className="ml-2 font-body text-sm text-on-surface-variant">Date & Time</span>
              </div>
              <div className="flex-1 h-1 bg-surface-container mx-4"></div>
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-surface-container text-on-surface-variant flex items-center justify-center font-mono text-sm font-bold">3</div>
                <span className="ml-2 font-body text-sm text-on-surface-variant">Details</span>
              </div>
              <div className="flex-1 h-1 bg-surface-container mx-4"></div>
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-surface-container text-on-surface-variant flex items-center justify-center font-mono text-sm font-bold">4</div>
                <span className="ml-2 font-body text-sm text-on-surface-variant">Confirm</span>
              </div>
            </div>
          </div>
        </section>

        {/* Experience Cards */}
        <section className="pb-[120px] px-[20px] md:px-[80px] max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {experiences.map((experience) => (
              <Card
                key={experience.id}
                glowColor={selectedExperience === experience.id ? 'purple' : 'none'}
                className={`cursor-pointer transition-all ${
                  selectedExperience === experience.id ? 'border-primary/50 ring-2 ring-primary/20' : ''
                }`}
                onClick={() => handleSelect(experience.id)}
              >
                <div className="relative h-48 mb-6 overflow-hidden rounded-lg">
                  <div className="absolute inset-0 bg-gradient-to-t from-surface-elevated to-transparent z-10" />
                  <Image
                    src={experience.image}
                    alt={experience.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    className="object-cover"
                  />
                  {selectedExperience === experience.id && (
                    <div className="absolute top-3 right-3 z-20">
                      <Badge variant="primary">Selected</Badge>
                    </div>
                  )}
                </div>

                <h3 className="font-sans text-[24px] font-bold text-on-surface mb-2">
                  {experience.title}
                </h3>
                
                <p className="font-body text-[16px] text-on-surface-variant mb-4">
                  {experience.description}
                </p>

                <div className="flex items-baseline gap-2 mb-4">
                  <span className="font-sans text-[28px] font-bold text-primary">{experience.price}</span>
                </div>

                <div className="space-y-2 mb-6">
                  <div className="flex items-center gap-2 text-sm text-on-surface-variant">
                    <span className="font-mono">⏱</span>
                    <span>{experience.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-on-surface-variant">
                    <span className="font-mono">👥</span>
                    <span>{experience.capacity}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-on-surface-variant">
                    <span className="font-mono">➕</span>
                    <span>Extra Hour: {experience.extraHour}</span>
                  </div>
                </div>

                <div className="border-t border-glass-stroke pt-4">
                  <p className="font-mono text-xs text-on-surface-variant mb-2 uppercase tracking-wider">Includes</p>
                  <ul className="space-y-1">
                    {experience.features.map((feature, index) => (
                      <li key={index} className="font-body text-sm text-on-surface-variant flex items-center gap-2">
                        <span className="text-primary">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center gap-4 mt-12">
            <Link href="/">
              <Button variant="secondary">Back</Button>
            </Link>
            <Button 
              size="lg" 
              onClick={handleContinue}
              disabled={!selectedExperience}
              className={!selectedExperience ? 'opacity-50 cursor-not-allowed' : ''}
            >
              Continue to Date Selection
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}