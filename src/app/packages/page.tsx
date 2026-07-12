'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import { getPackages, Package } from '@/lib/database';
import { 
  Sparkles, Calendar, User, Clock, Check, Tv, Volume2, Film, 
  Gamepad2, Cpu, Monitor, Trophy, Laptop, UtensilsCrossed, 
  Palette, Camera, Music, Wine, Compass 
} from 'lucide-react';

export default function PackagesPage() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState<'all' | 'cinema' | 'gaming' | 'celebration'>('all');
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPackages();
  }, []);

  const loadPackages = async () => {
    setLoading(true);
    const data = await getPackages();
    setPackages(data);
    setLoading(false);
  };

  const experiences = packages.map(pkg => ({
    id: pkg.id,
    title: pkg.title,
    description: pkg.description,
    price: pkg.price,
    duration: pkg.duration,
    capacity: pkg.capacity,
    extraHour: pkg.extra_hour || 'N/A',
    image: pkg.image || '/image-from-rawpixel-id-12136149-jpeg.jpg',
    category: pkg.category,
    categoryLabel: pkg.category.charAt(0).toUpperCase() + pkg.category.slice(1),
    features: pkg.features || []
  }));

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

  const techFeatures = [
    {
      icon: <Tv className="w-6 h-6" />,
      title: '4K HDR Projection',
      description: 'Enjoy ultra-clear, high-contrast imagery on screen with state-of-the-art native 4K laser projection.'
    },
    {
      icon: <Volume2 className="w-6 h-6" />,
      title: 'Dolby Atmos Surround',
      description: 'Positional audio with premium 7.1 surround sound arrays that place you directly in the action.'
    },
    {
      icon: <Gamepad2 className="w-6 h-6" />,
      title: 'Next-Gen Consoles',
      description: 'Play on PlayStation 5 and Xbox Series X consoles with a massive library of pre-installed games.'
    },
    {
      icon: <Cpu className="w-6 h-6" />,
      title: 'High-End PC Rigs',
      description: 'PC gaming stations featuring RTX 40-series graphics, mechanical keybeds, and ultra-high refresh rate monitors.'
    },
    {
      icon: <Laptop className="w-6 h-6" />,
      title: 'Co-Op & Local Play',
      description: 'Soundproofed suites support multi-controller setups for couch co-op, fighting games, and sports titles.'
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: 'Private Lounge',
      description: 'Soundproofed cabins with comfortable leather seating, customizable lighting, and snack bar access.'
    }
  ];

  const filteredExperiences = activeCategory === 'all' 
    ? experiences 
    : experiences.filter(exp => exp.category === activeCategory);

  const handleBook = (id: string) => {
    router.push(`/packages/${id}`);
  };

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
            <Badge variant="primary" className="mb-4">All-Inclusive Offerings</Badge>
            <h1 className="font-sans text-[44px] md:text-[68px] font-extrabold leading-[1.1] tracking-tight text-white mb-6">
              Packages & Services
            </h1>
            <p className="font-body text-[16px] sm:text-[18px] text-on-surface-variant max-w-xl mx-auto mb-8 leading-relaxed">
              Explore our curated private suites for movie screenings, console gaming sessions, and custom milestone celebrations.
            </p>
          </div>
        </section>

        {/* Experience Selector Grid Section */}
        <section id="experience-list" className="py-16 px-5 md:px-[80px] max-w-[1440px] mx-auto z-10 relative">
          <div className="text-center mb-12">
            <Badge variant="default" className="mb-4">Select A Suite</Badge>
            <h2 className="font-sans text-[36px] md:text-[50px] font-bold text-white tracking-tight">
              Our Luxury Suites
            </h2>
            <p className="font-body text-[16px] text-on-surface-variant max-w-xl mx-auto mt-2">
              Filter by experience type and choose the perfect fit for your next event or casual hangout.
            </p>
          </div>

          {/* Filtering buttons */}
          <div className="flex justify-center items-center gap-2 md:gap-3 flex-wrap mb-12">
            {(['all', 'cinema', 'gaming', 'celebration'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold border transition-all uppercase tracking-wider font-mono cursor-pointer ${
                  activeCategory === cat 
                    ? 'bg-primary border-primary text-white shadow-lg shadow-primary/25' 
                    : 'border-glass-stroke text-on-surface-variant hover:text-white hover:bg-white/5'
                }`}
              >
                {cat === 'all' ? 'All Sessions' : cat === 'cinema' ? 'Private Cinema' : cat === 'gaming' ? 'Gaming Focus' : 'VIP Celebrations'}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredExperiences.map((exp) => (
              <Card
                key={exp.id}
                glowColor="purple"
                className="group flex flex-col p-5 border border-glass-stroke hover:bg-surface-elevated/40 transition-all duration-300"
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
                      {exp.categoryLabel}
                    </span>
                  </div>
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
                <div className="border-t border-glass-stroke/50 pt-4 mb-6">
                  <ul className="space-y-1.5">
                    {exp.features.map((feature, i) => (
                      <li key={i} className="font-body text-[12px] text-on-surface-variant flex items-start gap-1.5">
                        <Check className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Button 
                  onClick={() => handleBook(exp.id)} 
                  variant="primary" 
                  className="w-full mt-auto"
                >
                  Book This Suite
                </Button>
              </Card>
            ))}
          </div>
        </section>

        {/* Hardware & Technology Section */}
        <section id="technology" className="py-20 px-5 md:px-[80px] bg-surface-container-lowest/40 border-t border-b border-glass-stroke">
          <div className="max-w-[1440px] mx-auto">
            <div className="text-center mb-16">
              <Badge variant="tertiary" className="mb-4">Tech & Hardware Specs</Badge>
              <h2 className="font-sans text-[36px] md:text-[50px] font-bold text-white tracking-tight">
                Immersive Hardware Standards
              </h2>
              <p className="font-body text-[16px] text-on-surface-variant max-w-xl mx-auto leading-relaxed">
                Every cabin is soundproofed and features pro-grade hardware to deliver absolute entertainment fidelity.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {techFeatures.map((feature, index) => (
                <Card key={index} glowColor="cyan" className="p-8 flex flex-col items-center text-center border border-glass-stroke">
                  <div className="w-14 h-14 rounded-full bg-tertiary/10 border border-tertiary/20 flex items-center justify-center text-tertiary mb-6">
                    {feature.icon}
                  </div>
                  <h3 className="font-sans text-[20px] font-bold text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="font-body text-[15px] text-on-surface-variant leading-relaxed">
                    {feature.description}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Premium Event Services Section */}
        <section id="services" className="py-20 px-5 md:px-[80px] max-w-[1440px] mx-auto">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">Bespoke Catering & Decor</Badge>
            <h2 className="font-sans text-[36px] md:text-[50px] font-bold text-white tracking-tight">
              Premium Event Services
            </h2>
            <p className="font-body text-[16px] text-on-surface-variant max-w-xl mx-auto leading-relaxed">
              Elevate your private gatherings with custom styling, balloon theme setup, and dedicated server hosts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <Card key={index} glowColor="purple" className="p-8 flex flex-col items-center text-center border border-glass-stroke">
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

        {/* Call to Action */}
        <section className="py-20 px-5 md:px-[80px] bg-surface-container-lowest/40 border-t border-glass-stroke">
          <div className="max-w-[1440px] mx-auto">
            <Card className="p-12 md:p-16 text-center hero-mesh border border-glass-stroke rounded-3xl">
              <Badge variant="primary" className="mb-4">Tailored Experience</Badge>
              <h2 className="font-sans text-[32px] md:text-[46px] font-bold text-white mb-4 tracking-tight">
                Planning a Large Celebration?
              </h2>
              <p className="font-body text-[16px] sm:text-[18px] text-on-surface-variant max-w-xl mx-auto mb-8 leading-relaxed">
                Connect with our coordination desk to reserve multiple cabins, configure a specialized catering menu, or request custom-printed birthday decorations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <Button size="lg" variant="primary">Discuss Custom Event</Button>
                </Link>
                <Link href="#experience-list">
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
