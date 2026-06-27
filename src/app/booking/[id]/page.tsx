'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';

export default function ExperienceBookingPage() {
  const params = useParams();
  const router = useRouter();
  const experienceId = params.id as string;
  
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    notes: ''
  });

  const experiences: Record<string, any> = {
    'mini-cabin': {
      title: 'Mini Cabin',
      description: 'Perfect for intimate entertainment sessions',
      price: '2350 LKR',
      duration: '2.5 hours',
      capacity: 'Max 3 pax',
      extraHour: '900 LKR',
      image: '/image-from-rawpixel-id-12136149-jpeg.jpg',
      features: ['Netflix / YouTube', 'NON A/C Cabin', 'FHD Projector', '5.1 sound system']
    },
    'elite-silver': {
      title: 'Elite / Silver Package',
      description: 'Enhanced entertainment experience',
      price: '2550 LKR',
      duration: '3 hours',
      capacity: 'Max 4 pax',
      extraHour: '900 LKR',
      image: '/image-from-rawpixel-id-14510238-jpeg.jpg',
      features: ['Netflix / YouTube', 'NON A/C cabin', 'FHD Projector', '5.1 sound system']
    },
    'gold': {
      title: 'Gold Package',
      description: 'Premium comfort with air conditioning',
      price: '3000 LKR',
      duration: '3 hours',
      capacity: 'Max 4 pax',
      extraHour: '1000 LKR',
      image: '/image-from-rawpixel-id-15201674-jpeg.jpg',
      features: ['Netflix / YouTube', 'A/C cabin', '4K Projector', '7.1 sound system']
    },
    'platinum': {
      title: 'Platinum Package',
      description: 'Ultimate gaming and entertainment',
      price: '3450 LKR',
      duration: '3 hours',
      capacity: 'Max 4 pax',
      extraHour: '1000 LKR',
      image: '/image-from-rawpixel-id-12136149-jpeg.jpg',
      features: ['PS4 Gaming', 'Netflix / YouTube', '4K Projector', '7.1 sound system']
    },
    'royal': {
      title: 'Royal Package',
      description: 'Spacious luxury for groups',
      price: '5300 LKR',
      duration: '3 hours',
      capacity: 'Max 6 pax',
      extraHour: '1300 LKR',
      image: '/image-from-rawpixel-id-15201674-jpeg.jpg',
      features: ['PS4 Gaming', 'Netflix / YouTube', 'Spacious cabin', '7.1 sound system', '4K Projector']
    },
    'lite-celebration': {
      title: 'Lite Celebration Package',
      description: 'Perfect for small parties and gatherings',
      price: '6250 LKR',
      duration: '3 hours',
      capacity: 'Max 6 pax',
      extraHour: '1600 LKR',
      image: '/image-from-rawpixel-id-15201674-jpeg.jpg',
      features: ['Party setup', 'Spacious cabin', 'PS4 Gaming', 'Netflix / YouTube', 'Karaoke setup', '4K Projector']
    },
    'grand-celebration': {
      title: 'Grand Celebration Package',
      description: 'The ultimate celebration experience',
      price: '8950 LKR',
      duration: '4 hours',
      capacity: 'Max 8 pax',
      extraHour: '1900 LKR',
      image: '/image-from-rawpixel-id-15201674-jpeg.jpg',
      features: ['Party setup', 'Spacious cabin', 'Karaoke setup', 'PS4 Gaming', 'Netflix / YouTube']
    }
  };

  const experience = experiences[experienceId];

  if (!experience) {
    return (
      <div className="flex flex-col min-h-screen bg-background text-on-background">
        <Header />
        <main className="flex-1 pt-20 flex items-center justify-center">
          <div className="text-center">
            <h1 className="font-sans text-[32px] font-bold text-on-surface mb-4">Experience Not Found</h1>
            <Link href="/booking">
              <Button>Back to Booking</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, this would submit to a backend
    console.log('Booking submitted:', { experienceId, formData });
    setStep(4);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="max-w-4xl mx-auto">
            <Card className="p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <div className="relative h-64 mb-6 overflow-hidden rounded-lg">
                    <Image
                      src={experience.image}
                      alt={experience.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover"
                    />
                  </div>
                  <Badge variant="primary" className="mb-3">{experience.price}</Badge>
                  <h2 className="font-sans text-[32px] font-bold text-on-surface mb-4">
                    {experience.title}
                  </h2>
                  <p className="font-body text-[16px] text-on-surface-variant mb-6">
                    {experience.description}
                  </p>
                </div>
                <div>
                  <h3 className="font-sans text-[20px] font-bold text-on-surface mb-4">Experience Details</h3>
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center gap-3 text-sm text-on-surface-variant">
                      <span className="font-mono">⏱</span>
                      <span>{experience.duration}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-on-surface-variant">
                      <span className="font-mono">👥</span>
                      <span>{experience.capacity}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-on-surface-variant">
                      <span className="font-mono">➕</span>
                      <span>Extra hour: {experience.extraHour}</span>
                    </div>
                  </div>
                  <h3 className="font-sans text-[20px] font-bold text-on-surface mb-4">Features</h3>
                  <ul className="space-y-2">
                    {experience.features.map((feature: string, index: number) => (
                      <li key={index} className="font-body text-sm text-on-surface-variant flex items-center gap-2">
                        <span className="text-primary">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="mt-8 flex justify-end">
                <Button size="lg" onClick={() => setStep(2)}>Continue to Date & Time</Button>
              </div>
            </Card>
          </div>
        );

      case 2:
        return (
          <div className="max-w-2xl mx-auto">
            <Card className="p-8 md:p-12">
              <h2 className="font-sans text-[32px] font-bold text-on-surface mb-6">Select Date & Time</h2>
              <form onSubmit={(e) => { e.preventDefault(); setStep(3); }}>
                <div className="space-y-6">
                  <div>
                    <label className="block font-sans text-[16px] font-semibold text-on-surface mb-2">
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      required
                      className="w-full px-4 py-3 bg-surface-container border border-glass-stroke rounded-lg text-on-surface focus:outline-none focus:border-primary"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block font-sans text-[16px] font-semibold text-on-surface mb-2">
                      Preferred Time
                    </label>
                    <input
                      type="time"
                      required
                      className="w-full px-4 py-3 bg-surface-container border border-glass-stroke rounded-lg text-on-surface focus:outline-none focus:border-primary"
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    />
                  </div>
                </div>
                <div className="mt-8 flex justify-between">
                  <Button variant="secondary" onClick={() => setStep(1)}>Back</Button>
                  <Button size="lg" type="submit">Continue to Details</Button>
                </div>
              </form>
            </Card>
          </div>
        );

      case 3:
        return (
          <div className="max-w-2xl mx-auto">
            <Card className="p-8 md:p-12">
              <h2 className="font-sans text-[32px] font-bold text-on-surface mb-6">Your Details</h2>
              <form onSubmit={handleSubmit}>
                <div className="space-y-6">
                  <div>
                    <label className="block font-sans text-[16px] font-semibold text-on-surface mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 bg-surface-container border border-glass-stroke rounded-lg text-on-surface focus:outline-none focus:border-primary"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block font-sans text-[16px] font-semibold text-on-surface mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      className="w-full px-4 py-3 bg-surface-container border border-glass-stroke rounded-lg text-on-surface focus:outline-none focus:border-primary"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block font-sans text-[16px] font-semibold text-on-surface mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      required
                      className="w-full px-4 py-3 bg-surface-container border border-glass-stroke rounded-lg text-on-surface focus:outline-none focus:border-primary"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block font-sans text-[16px] font-semibold text-on-surface mb-2">
                      Special Requests (Optional)
                    </label>
                    <textarea
                      className="w-full px-4 py-3 bg-surface-container border border-glass-stroke rounded-lg text-on-surface focus:outline-none focus:border-primary h-32"
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    />
                  </div>
                </div>
                <div className="mt-8 flex justify-between">
                  <Button variant="secondary" onClick={() => setStep(2)}>Back</Button>
                  <Button size="lg" type="submit">Review Booking</Button>
                </div>
              </form>
            </Card>
          </div>
        );

      case 4:
        return (
          <div className="max-w-2xl mx-auto">
            <Card className="p-8 md:p-12 text-center">
              <div className="text-6xl mb-6">✅</div>
              <h2 className="font-sans text-[32px] font-bold text-on-surface mb-4">
                Booking Request Submitted!
              </h2>
              <p className="font-body text-[18px] text-on-surface-variant mb-8">
                Thank you for choosing NAXORA. We'll contact you shortly to confirm your booking.
              </p>
              <div className="bg-surface-container p-6 rounded-lg mb-8 text-left">
                <h3 className="font-sans text-[20px] font-bold text-on-surface mb-4">Booking Summary</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-on-surface-variant">Experience:</span>
                    <span className="text-on-surface font-semibold">{experience.title}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-on-surface-variant">Date:</span>
                    <span className="text-on-surface">{formData.date}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-on-surface-variant">Time:</span>
                    <span className="text-on-surface">{formData.time}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-on-surface-variant">Price:</span>
                    <span className="text-on-surface font-semibold">{experience.price}</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/">
                  <Button variant="secondary">Return Home</Button>
                </Link>
                <Link href="/booking">
                  <Button>Book Another Experience</Button>
                </Link>
              </div>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-on-background">
      <Header />
      
      <main className="flex-1 pt-20">
        {/* Header */}
        <section className="py-[60px] px-[20px] md:px-[80px] max-w-[1440px] mx-auto">
          <div className="text-center mb-8">
            <Badge variant="primary" className="mb-4">Step {step} of 4</Badge>
            <h1 className="font-sans text-[40px] md:text-[48px] font-bold text-on-surface mb-4">
              {step === 1 ? 'Experience Details' : step === 2 ? 'Date & Time' : step === 3 ? 'Your Information' : 'Confirmation'}
            </h1>
          </div>

          {/* Progress Bar */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="flex items-center justify-between">
              {[1, 2, 3, 4].map((s) => (
                <div key={s} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-mono text-sm font-bold ${
                    s <= step ? 'bg-primary text-on-primary' : 'bg-surface-container text-on-surface-variant'
                  }`}>
                    {s}
                  </div>
                  {s < 4 && (
                    <div className={`flex-1 h-1 mx-4 ${s < step ? 'bg-primary' : 'bg-surface-container'}`} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Step Content */}
        <section className="pb-[120px] px-[20px] md:px-[80px] max-w-[1440px] mx-auto">
          {renderStep()}
        </section>
      </main>

      <Footer />
    </div>
  );
}