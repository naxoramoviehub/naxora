'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Hero from '@/components/sections/Hero';
import { getPackages, Package } from '@/lib/database';
import { 
  Sparkles, Calendar, User, Clock, Check, Tv, Volume2, Film, 
  Gamepad2, Cpu, Monitor, Trophy, Laptop, UtensilsCrossed, 
  Palette, Camera, Music, Wine, Compass 
, MapPin, Phone, Mail, Send, CheckCircle2, AlertCircle
} from 'lucide-react';

export default function Home() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong. Please try again.');
      }

      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

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
      
      <main id="main-content" className="flex-1">
        {/* Hero Section */}
        <Hero />

        {/* About Section */}
        <div id="about" className="border-t border-glass-stroke mt-10">
          <div className="text-center pt-20 pb-4">
            <Badge variant="primary" className="mb-4">About Us</Badge>
            <h2 className="font-sans text-[36px] md:text-[50px] font-bold text-white tracking-tight">
              Welcome to NAXORA
            </h2>
          </div>
          {/* Mission Section */}
        <section className="py-[120px] px-[20px] md:px-[80px] max-w-[1440px] mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-sans text-[32px] md:text-[48px] font-bold text-on-surface mb-6">
                Our Mission
              </h2>
              <p className="font-body text-[18px] text-on-surface-variant mb-6 leading-relaxed">
                At NAXORA, we believe entertainment should be an experience, not just an activity. Our mission is to provide exclusive, private entertainment spaces where you can escape the ordinary and immerse yourself in luxury.
              </p>
              <p className="font-body text-[18px] text-on-surface-variant mb-8 leading-relaxed">
                Whether you're watching the latest blockbuster on our 4K projectors, competing in intense gaming sessions, or celebrating special moments with friends and family, we ensure every detail is perfect.
              </p>
            </div>
            <Card glowColor="purple" className="p-8">
              <div className="space-y-6">
                <div className="text-center">
                  <div className="font-sans text-[48px] font-bold text-primary mb-2">4K</div>
                  <div className="font-body text-[16px] text-on-surface-variant">Ultra HD Projection</div>
                </div>
                <div className="text-center">
                  <div className="font-sans text-[48px] font-bold text-secondary mb-2">7.1</div>
                  <div className="font-body text-[16px] text-on-surface-variant">Surround Sound</div>
                </div>
                <div className="text-center">
                  <div className="font-sans text-[48px] font-bold text-tertiary mb-2">24/7</div>
                  <div className="font-body text-[16px] text-on-surface-variant">Premium Service</div>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-[120px] px-[20px] md:px-[80px] bg-surface-container/30">
          <div className="max-w-[1440px] mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-sans text-[32px] md:text-[48px] font-bold text-on-surface mb-4">
                Our Values
              </h2>
              <p className="font-body text-[18px] text-on-surface-variant max-w-2xl mx-auto">
                The principles that guide everything we do at NAXORA.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card glowColor="purple" className="p-8 text-center">
                <div className="text-4xl mb-4">✨</div>
                <h3 className="font-sans text-[24px] font-bold text-on-surface mb-3">Excellence</h3>
                <p className="font-body text-[16px] text-on-surface-variant">
                  We strive for perfection in every aspect, from our state-of-the-art equipment to our attentive service.
                </p>
              </Card>

              <Card glowColor="cyan" className="p-8 text-center">
                <div className="text-4xl mb-4">🔒</div>
                <h3 className="font-sans text-[24px] font-bold text-on-surface mb-3">Privacy</h3>
                <p className="font-body text-[16px] text-on-surface-variant">
                  Your private space is sacred. We ensure complete privacy and exclusivity for all our guests.
                </p>
              </Card>

              <Card glowColor="purple" className="p-8 text-center">
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="font-sans text-[24px] font-bold text-on-surface mb-3">Innovation</h3>
                <p className="font-body text-[16px] text-on-surface-variant">
                  We continuously upgrade our technology and experiences to stay at the forefront of entertainment.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-[120px] px-[20px] md:px-[80px] max-w-[1440px] mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-sans text-[32px] md:text-[48px] font-bold text-on-surface mb-6">
              Our Story
            </h2>
            <p className="font-body text-[18px] text-on-surface-variant mb-8 leading-relaxed">
              NAXORA was born from a simple idea: entertainment should be personal, private, and premium. Frustrated by crowded cinemas and noisy gaming cafes, we set out to create something different – a space where you control the experience.
            </p>
            <p className="font-body text-[18px] text-on-surface-variant mb-8 leading-relaxed">
              Today, we're proud to offer Sri Lanka's most comprehensive private entertainment experience, with cutting-edge technology, luxurious spaces, and a commitment to excellence that sets us apart.
            </p>
            <div className="flex justify-center">
              <Link href="/#packages">
                <Button size="lg">Experience NAXORA</Button>
              </Link>
            </div>
          </div>
        </section>
        </div>

        {/* Why choose NAXORA */}
        <section aria-label="Why choose NAXORA" className="relative z-10 border-y border-glass-stroke bg-surface-container-lowest/50 px-5 py-10 md:px-20">
          <div className="mx-auto grid max-w-[1200px] gap-6 text-center sm:grid-cols-2 lg:grid-cols-4">
            {[['Private by design','Sound-conscious cabins reserved only for your group.'],['Clear pricing','Upfront package pricing with no surprise booking fees.'],['Flexible occasions','Movie nights, gaming sessions and milestone celebrations.'],['Human support','Coordinate details directly with our team on WhatsApp.']].map(([title,copy]) => <div key={title}><h2 className="mb-2 font-sans text-lg font-bold text-white">{title}</h2><p className="text-sm leading-relaxed text-on-surface-variant">{copy}</p></div>)}
          </div>
        </section>

        {/* Experience Selector Grid Section */}
        <section id="packages" className="py-24 px-5 md:px-[80px] max-w-[1440px] mx-auto z-10 relative">
          <div className="text-center mb-12">
            <Badge variant="primary" className="mb-4">Premium Offerings</Badge>
            <h2 className="font-sans text-[36px] md:text-[50px] font-bold text-white tracking-tight">
              Curated Private Entertainment
            </h2>
            <p className="font-body text-[16px] text-on-surface-variant max-w-xl mx-auto mt-3 leading-relaxed">
              Explore custom private suites featuring high-end projector systems, surround sound setups, and elite gaming zones.
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

          {loading ? (
             <div className="py-20 text-center text-on-surface-variant font-mono">
               Loading packages...
             </div>
          ) : filteredExperiences.length === 0 ? (
             <div className="py-20 text-center text-on-surface-variant font-mono">
               No packages found in this category.
             </div>
          ) : (
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
                    Explore & Book
                  </Button>
                </Card>
              ))}
            </div>
          )}
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
        <section className="py-24 px-5 md:px-[80px] bg-surface-container-lowest/40 z-10 relative">
          <div className="max-w-[1000px] mx-auto text-center border border-glass-stroke bg-surface-elevated/20 p-12 md:p-20 rounded-3xl backdrop-blur-md">
            <h2 className="font-sans text-[36px] md:text-[50px] font-bold text-white mb-6 tracking-tight leading-none">
              Ready to Experience Private Luxury?
            </h2>
            <p className="font-body text-[16px] sm:text-[18px] text-on-surface-variant max-w-2xl mx-auto mb-10 leading-relaxed">
              Book your slot now and custom-design your private viewing or gaming session with us. Perfect for date nights, game days, and milestone celebrations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="#packages">
                <Button size="lg" variant="primary">Reserve Your Experience</Button>
              </Link>
              <Link href="/#contact">
                <Button size="lg" variant="secondary">Contact Events Team</Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 px-5 md:px-[80px] max-w-[1440px] mx-auto">
        <div className="text-center mb-16">
          <Badge variant="primary" className="mb-4">Support & Bookings</Badge>
          <h2 className="font-sans text-[36px] md:text-[50px] font-bold text-white tracking-tight">
            Contact Us
          </h2>
          <p className="font-body text-[16px] text-on-surface-variant max-w-xl mx-auto mt-3 leading-relaxed">
            Have questions about booking slots, specific packages, or custom screening requests? Our events desk is available to assist you.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="font-sans text-[28px] md:text-[36px] font-bold text-white mb-6 tracking-tight">
                Send us a Message
              </h2>
              <Card className="p-8 border border-glass-stroke">
                {isSubmitted ? (
                  <div className="text-center py-12 flex flex-col items-center justify-center">
                    <CheckCircle2 className="w-16 h-16 text-primary mb-6 animate-pulse" />
                    <h3 className="font-sans text-[24px] font-bold text-white mb-3">Message Sent!</h3>
                    <p className="font-body text-on-surface-variant max-w-sm mb-8 leading-relaxed">
                      Thank you for contacting NAXORA. An event coordinator will respond to your inquiry shortly via email or phone.
                    </p>
                    <Button variant="secondary" onClick={() => setIsSubmitted(false)}>Send Another Message</Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div className="space-y-6">
                      {error && (
                        <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl flex items-center gap-3 text-sm">
                          <AlertCircle className="w-5 h-5 shrink-0" />
                          <span>{error}</span>
                        </div>
                      )}
                      <div>
                        <label className="block font-sans text-[14px] font-bold text-white mb-2 uppercase tracking-wide">
                          Full Name
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="John Doe"
                          className="w-full px-4 py-3 bg-background border border-glass-stroke rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/60 transition-all placeholder:text-muted/60"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="block font-sans text-[14px] font-bold text-white mb-2 uppercase tracking-wide">
                          Email Address
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="johndoe@example.com"
                          className="w-full px-4 py-3 bg-background border border-glass-stroke rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/60 transition-all placeholder:text-muted/60"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="block font-sans text-[14px] font-bold text-white mb-2 uppercase tracking-wide">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          placeholder="+94 7X XXX XXXX"
                          className="w-full px-4 py-3 bg-background border border-glass-stroke rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/60 transition-all placeholder:text-muted/60"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="block font-sans text-[14px] font-bold text-white mb-2 uppercase tracking-wide">
                          Subject
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Custom Event Setup Inquiry"
                          className="w-full px-4 py-3 bg-background border border-glass-stroke rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/60 transition-all placeholder:text-muted/60"
                          value={formData.subject}
                          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="block font-sans text-[14px] font-bold text-white mb-2 uppercase tracking-wide">
                          Message
                        </label>
                        <textarea
                          required
                          placeholder="Describe your event or questions here..."
                          className="w-full px-4 py-3 bg-background border border-glass-stroke rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/60 transition-all h-32 placeholder:text-muted/60 resize-none"
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        />
                      </div>
                      <Button type="submit" size="lg" variant="primary" className="w-full flex items-center justify-center gap-2" disabled={isSubmitting}>
                        {isSubmitting ? 'Sending...' : (
                          <>
                            <span>Send Message</span>
                            <Send className="w-4 h-4" />
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                )}
              </Card>
            </div>
 
            <div>
              <h2 className="font-sans text-[28px] md:text-[36px] font-bold text-white mb-6 tracking-tight">
                Contact Details
              </h2>
              <div className="space-y-6">
                <Card glowColor="purple" className="p-6 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-sans text-[18px] font-bold text-white mb-1">Our Location</h3>
                    <p className="font-body text-[15px] text-on-surface-variant">
                      159/A Colombo Road, Kandy, Sri Lanka
                    </p>
                    <div className="w-full h-[150px] mt-4 rounded-xl overflow-hidden border border-glass-stroke relative bg-surface-container">
                      <iframe
                        src="https://maps.google.com/maps?q=NAXORA,+159/A+Colombo+Road,+Kandy&t=&z=14&ie=UTF8&iwloc=&output=embed"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen={false}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                      ></iframe>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3 mt-5">
                      <a href="https://maps.app.goo.gl/fwHmwaP8cJHWU8pZA?g_st=iw" target="_blank" rel="noreferrer" className="flex-1 flex items-center justify-center bg-primary text-on-primary font-bold py-2.5 px-4 rounded-xl hover:bg-primary/90 transition-all text-sm shadow-md active:scale-[0.98]">
                        Get Directions
                      </a>
                      <a href="https://maps.app.goo.gl/fwHmwaP8cJHWU8pZA?g_st=iw" target="_blank" rel="noreferrer" className="flex-1 flex items-center justify-center border border-glass-stroke text-white font-bold py-2.5 px-4 rounded-xl hover:bg-white/5 transition-all text-sm active:scale-[0.98]">
                        Open in Google Maps
                      </a>
                    </div>
                  </div>
                </Card>
 
                <Card glowColor="cyan" className="p-6 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-tertiary/10 border border-tertiary/20 flex items-center justify-center text-tertiary shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-sans text-[18px] font-bold text-white mb-1">Phone Helpline</h3>
                    <p className="font-body text-[15px] text-on-surface-variant">
                      <a href="https://wa.me/94707735599" target="_blank" rel="noopener noreferrer" className="hover:text-tertiary transition-colors">+94 70 773 5599 (WhatsApp)</a>
                    </p>
                  </div>
                </Card>
 
                <Card glowColor="purple" className="p-6 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-sans text-[18px] font-bold text-white mb-1">Email Support</h3>
                    <p className="font-body text-[15px] text-on-surface-variant">
                      <a href="mailto:naxoramovihub@gmail.com" className="hover:text-primary transition-colors">naxoramovihub@gmail.com</a>
                    </p>
                  </div>
                </Card>
 
                <Card glowColor="cyan" className="p-6 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-tertiary/10 border border-tertiary/20 flex items-center justify-center text-tertiary shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-sans text-[18px] font-bold text-white mb-1">Operational Hours</h3>
                    <p className="font-body text-[15px] text-on-surface-variant">
                      Open daily: 10:00 AM - 11:30 PM
                    </p>
                  </div>
                </Card>
              </div>
 
              </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
