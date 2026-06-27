import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';

export default function CelebrationsPage() {
  const eventTypes = [
    {
      id: 1,
      title: 'Lite Celebration Package',
      description: 'Perfect for small parties and gatherings with party setup and karaoke',
      price: '6250 LKR',
      capacity: 'Max 6 pax',
      duration: '3 hours',
      image: '/image-from-rawpixel-id-15201674-jpeg.jpg',
      features: ['Party setup', 'Spacious cabin', 'PS4 Gaming', 'Netflix / YouTube', 'Karaoke setup', '4K Projector']
    },
    {
      id: 2,
      title: 'Grand Celebration Package',
      description: 'The ultimate celebration experience for larger groups',
      price: '8950 LKR',
      capacity: 'Max 8 pax',
      duration: '4 hours',
      image: '/image-from-rawpixel-id-14510238-jpeg.jpg',
      features: ['Party setup', 'Spacious cabin', 'Karaoke setup', 'PS4 Gaming', 'Netflix / YouTube']
    },
    {
      id: 3,
      title: 'Royal Package',
      description: 'Spacious luxury experience for groups with gaming and entertainment',
      price: '5300 LKR',
      capacity: 'Max 6 pax',
      duration: '3 hours',
      image: '/image-from-rawpixel-id-12136149-jpeg.jpg',
      features: ['PS4 Gaming', 'Netflix / YouTube', 'Spacious cabin', '7.1 sound system', '4K Projector']
    },
    {
      id: 4,
      title: 'Platinum Package',
      description: 'Ultimate gaming and entertainment experience',
      price: '3450 LKR',
      capacity: 'Max 4 pax',
      duration: '3 hours',
      image: '/f21b86159275023.639b110867040.jpg',
      features: ['PS4 Gaming', 'Netflix / YouTube', '4K Projector', '7.1 sound system']
    }
  ];

  const services = [
    {
      icon: '🍽️',
      title: 'Premium Catering',
      description: 'Gourmet menus prepared by world-class chefs'
    },
    {
      icon: '🎨',
      title: 'Custom Decor',
      description: 'Personalized decorations to match your theme'
    },
    {
      icon: '📸',
      title: 'Professional Photography',
      description: 'Capture memories with professional photographers'
    },
    {
      icon: '🎵',
      title: 'Live Entertainment',
      description: 'DJs, live bands, and performers available'
    },
    {
      icon: '🥂',
      title: 'Premium Bar Service',
      description: 'Top-shelf beverages and custom cocktails'
    },
    {
      icon: '👔',
      title: 'Event Coordination',
      description: 'Dedicated event coordinator for seamless experience'
    }
  ];

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
            <Badge variant="secondary" className="mb-4">Luxury Events</Badge>
            <h1 className="font-sans text-[40px] md:text-[64px] font-extrabold leading-[1.1] tracking-tight text-on-surface mb-6 gradient-text">
              Luxury Celebrations
            </h1>
            <p className="font-body text-[18px] md:text-[20px] text-on-surface-variant max-w-2xl mx-auto mb-8 leading-relaxed">
              Transform your special occasions into extraordinary experiences with our exclusive event spaces, premium services, and personalized attention to detail.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/booking">
                <Button size="lg">Plan Your Event</Button>
              </Link>
              <Link href="/contact">
                <Button variant="secondary" size="lg">Contact Event Team</Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="py-[120px] px-[20px] md:px-[80px] max-w-[1440px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-sans text-[32px] md:text-[48px] font-bold text-on-surface mb-4">
              Premium Services
            </h2>
            <p className="font-body text-[18px] text-on-surface-variant max-w-2xl mx-auto">
              Everything you need for an unforgettable celebration, all under one roof.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <Card key={index} glowColor="purple" className="p-6 text-center">
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="font-sans text-[20px] font-bold text-on-surface mb-3">
                  {service.title}
                </h3>
                <p className="font-body text-[16px] text-on-surface-variant">
                  {service.description}
                </p>
              </Card>
            ))}
          </div>
        </section>

        {/* Event Types */}
        <section className="py-[120px] px-[20px] md:px-[80px] bg-surface-container/30">
          <div className="max-w-[1440px] mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-sans text-[32px] md:text-[48px] font-bold text-on-surface mb-4">
                Event Types
              </h2>
              <p className="font-body text-[18px] text-on-surface-variant max-w-2xl mx-auto">
                From intimate gatherings to grand celebrations, we have the perfect space for your event.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {eventTypes.map((event) => (
                <Card key={event.id} glowColor="purple" className="group">
                  <div className="relative h-64 mb-6 overflow-hidden rounded-lg">
                    <Image
                      src={event.image}
                      alt={event.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  
                  <Badge variant="secondary" className="mb-3">Event</Badge>
                  <h3 className="font-sans text-[24px] font-bold text-on-surface mb-2">
                    {event.title}
                  </h3>
                  
                  <p className="font-body text-[16px] text-on-surface-variant mb-4 line-clamp-2">
                    {event.description}
                  </p>

                  <div className="flex items-center gap-4 mb-4 text-sm text-on-surface-variant">
                    <span className="font-mono">{event.capacity}</span>
                    <span>•</span>
                    <span className="font-mono">{event.duration}</span>
                    <span>•</span>
                    <span className="font-mono">{event.price}</span>
                  </div>
                  
                  <div className="border-t border-glass-stroke pt-4 mb-6">
                    <ul className="space-y-1">
                      {event.features.map((feature, index) => (
                        <li key={index} className="font-body text-sm text-on-surface-variant flex items-center gap-2">
                          <span className="text-primary">✓</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <Link href="/booking">
                    <Button className="w-full">Book This Event</Button>
                  </Link>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Custom Events CTA */}
        <section className="py-[120px] px-[20px] md:px-[80px]">
          <div className="max-w-[1440px] mx-auto">
            <Card className="text-center p-12 md:p-16 hero-mesh">
              <Badge variant="secondary" className="mb-4">Custom Events</Badge>
              <h2 className="font-sans text-[32px] md:text-[48px] font-bold text-on-surface mb-6">
                Have Something Unique in Mind?
              </h2>
              <p className="font-body text-[18px] text-on-surface-variant max-w-2xl mx-auto mb-8">
                Our event specialists can help create a completely customized experience tailored to your vision. From themed parties to product launches, we make it happen.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <Button size="lg">Discuss Custom Event</Button>
                </Link>
                <Link href="/booking">
                  <Button variant="secondary" size="lg">View Standard Packages</Button>
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