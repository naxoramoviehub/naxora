import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import { Sparkles, UtensilsCrossed, Palette, Camera, Music, Wine, Compass } from 'lucide-react';

export default function CelebrationsPage() {
  const eventTypes = [
    {
      id: 1,
      title: 'Lite Celebration Package',
      description: 'Perfect for small parties and intimate gatherings with custom decorations and karaoke.',
      price: '6250 LKR',
      capacity: 'Max 6 pax',
      duration: '3 hours',
      image: '/image-from-rawpixel-id-15201674-jpeg.jpg',
      features: ['Basic party decorations', 'Spacious private cabin', 'PS4 multiplayer gaming', 'Netflix & YouTube streaming', 'Pro karaoke microphone setup', '4K projector screen']
    },
    {
      id: 2,
      title: 'Grand Celebration Package',
      description: 'The ultimate entertainment celebration experience for medium-sized groups.',
      price: '8950 LKR',
      capacity: 'Max 8 pax',
      duration: '4 hours',
      image: '/image-from-rawpixel-id-14510238-jpeg.jpg',
      features: ['Full balloon & banner theme setup', 'Premium extra-spacious suite', 'Dual wireless karaoke system', 'PS4 gaming with 4 controllers', 'Free snack & beverage platter', '4K high-contrast screens']
    },
    {
      id: 3,
      title: 'Royal VIP Package',
      description: 'Spacious luxury group experience, custom-tailored with catering options.',
      price: '5300 LKR',
      capacity: 'Max 6 pax',
      duration: '3 hours',
      image: '/image-from-rawpixel-id-12136149-jpeg.jpg',
      features: ['VIP lounge seating comfort', 'Premium A/C cabin control', '7.1 immersive surround sound', '4K projection screens', 'Netflix, YouTube & Spotify', 'Optional catering additions']
    },
    {
      id: 4,
      title: 'Platinum Gamer Suite',
      description: 'The ultimate gaming-themed celebration for you and your crew.',
      price: '3450 LKR',
      capacity: 'Max 4 pax',
      duration: '3 hours',
      image: '/f21b86159275023.639b110867040.jpg',
      features: ['Advanced console setups', 'Low-latency screen specs', '7.1 surround sound design', 'A/C climate-controlled cabin', 'Catering delivery support', 'Dual microphone inputs']
    }
  ];

  const services = [
    {
      icon: <UtensilsCrossed className="w-6 h-6" />,
      title: 'Gourmet Catering',
      description: 'Bespoke menus featuring snack platters, mocktails, and customized pastries.'
    },
    {
      icon: <Palette className="w-6 h-6" />,
      title: 'Themed Decor',
      description: 'Balloons, banners, fairy lights, and themed table arrangements tailored to your event.'
    },
    {
      icon: <Camera className="w-6 h-6" />,
      title: 'Photography Packages',
      description: 'Professional photographers to capture high-definition candid moments of your party.'
    },
    {
      icon: <Music className="w-6 h-6" />,
      title: 'Pro Karaoke System',
      description: 'High-end microphones, adjustable vocal reverb, and thousands of songs on demand.'
    },
    {
      icon: <Wine className="w-6 h-6" />,
      title: 'Beverage Bar',
      description: 'Juices, premium mocktails, coffees, and soft drinks served directly to your cabin.'
    },
    {
      icon: <Compass className="w-6 h-6" />,
      title: 'Host Coordination',
      description: 'A dedicated event coordinator to manage food, drinks, and technical setup seamlessly.'
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background text-on-background">
      <Header />
      
      <main className="flex-1 pt-20">
        {/* Hero Section */}
        <section className="relative min-h-[50vh] flex items-center justify-center bg-gradient-to-b from-surface-container/30 to-background overflow-hidden px-5">
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-tertiary/10"></div>
          </div>
          
          <div className="relative z-10 text-center max-w-[800px] mx-auto pt-10">
            <Badge variant="secondary" className="mb-4">Bespoke Celebrations</Badge>
            <h1 className="font-sans text-[44px] md:text-[68px] font-extrabold leading-[1.1] tracking-tight text-white mb-6">
              Memories In Luxury
            </h1>
            <p className="font-body text-[16px] sm:text-[18px] text-on-surface-variant max-w-xl mx-auto mb-8 leading-relaxed">
              Transform birthdays, anniversaries, or casual group gatherings into premium private entertainment events.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/booking">
                <Button size="lg" variant="primary">Explore Packages</Button>
              </Link>
              <Link href="/contact">
                <Button variant="secondary" size="lg">Consult Event Team</Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="py-20 px-5 md:px-[80px] max-w-[1440px] mx-auto">
          <div className="text-center mb-16">
            <Badge variant="default" className="mb-4">Party Enhancements</Badge>
            <h2 className="font-sans text-[36px] md:text-[50px] font-bold text-white tracking-tight">
              Premium Event Services
            </h2>
            <p className="font-body text-[16px] text-on-surface-variant max-w-xl mx-auto leading-relaxed">
              From gourmet food platters to customizable decorations, we coordinate everything.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <Card key={index} glowColor="purple" className="p-8 flex flex-col items-center text-center">
                <div className="w-14 h-14 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-6">
                  {service.icon}
                </div>
                <h3 className="font-sans text-[20px] font-bold text-white mb-3">
                  {service.title}
                </h3>
                <p className="font-body text-[15px] text-on-surface-variant leading-relaxed">
                  {service.description}
                </p>
              </Card>
            ))}
          </div>
        </section>

        {/* Event Types */}
        <section className="py-24 px-5 md:px-[80px] bg-surface-container-lowest/40">
          <div className="max-w-[1440px] mx-auto">
            <div className="text-center mb-16">
              <Badge variant="secondary" className="mb-4">Cabins Matrix</Badge>
              <h2 className="font-sans text-[36px] md:text-[50px] font-bold text-white tracking-tight">
                Luxury Party Suites
              </h2>
              <p className="font-body text-[16px] text-on-surface-variant max-w-xl mx-auto">
                Choose the perfect cabin size and feature set for your party size.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {eventTypes.map((event) => (
                <Card key={event.id} glowColor="purple" className="group flex flex-col p-6">
                  <div className="relative h-64 mb-6 overflow-hidden rounded-xl bg-surface-base">
                    <Image
                      src={event.image}
                      alt={event.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="secondary">{event.capacity}</Badge>
                    <span className="font-mono text-sm text-primary font-bold">{event.price}</span>
                  </div>
                  
                  <h3 className="font-sans text-[24px] font-bold text-white mb-2 group-hover:text-primary transition-colors">
                    {event.title}
                  </h3>
                  
                  <p className="font-body text-[15px] text-on-surface-variant mb-6 leading-relaxed">
                    {event.description}
                  </p>
                  
                  <div className="border-t border-glass-stroke pt-6 mb-8 flex-grow">
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4">
                      {event.features.map((feature, index) => (
                        <li key={index} className="font-body text-[14px] text-on-surface-variant flex items-center gap-2">
                          <span className="text-primary text-xs">✓</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <Link href="/booking">
                    <Button className="w-full" variant="primary">Book This Suite</Button>
                  </Link>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Custom Events CTA */}
        <section className="py-20 px-5 md:px-[80px]">
          <div className="max-w-[1440px] mx-auto">
            <Card className="p-12 md:p-16 text-center hero-mesh border border-glass-stroke rounded-3xl">
              <Badge variant="primary" className="mb-4">Tailored Experience</Badge>
              <h2 className="font-sans text-[32px] md:text-[46px] font-bold text-white mb-4 tracking-tight">
                Planning a Large Celebration?
              </h2>
              <p className="font-body text-[16px] sm:text-[18px] text-on-surface-variant max-w-xl mx-auto mb-8 leading-relaxed">
                Connect with our coordination desk to reserve multiple cabins, configure a specialized catering menu, or request custom-printed birthday invitations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <Button size="lg" variant="primary">Discuss Custom Event</Button>
                </Link>
                <Link href="/booking">
                  <Button variant="secondary" size="lg">Standard Packages</Button>
                </Link>
              </div>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}