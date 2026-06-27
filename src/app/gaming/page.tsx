import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';

export default function GamingPage() {
  const games = [
    {
      id: 1,
      title: "Forza Horizon 5",
      genre: "Racing",
      platform: "Xbox Series X",
      players: "1-4",
      image: "/image-from-rawpixel-id-14510238-jpeg.jpg",
      description: "Experience the ultimate racing adventure in stunning 4K at 60fps."
    },
    {
      id: 2,
      title: "Call of Duty: Modern Warfare II",
      genre: "FPS",
      platform: "PC",
      players: "2-6",
      image: "/image-from-rawpixel-id-15201674-jpeg.jpg",
      description: "Intense multiplayer action with RTX ON for realistic graphics."
    },
    {
      id: 3,
      title: "FIFA 24",
      genre: "Sports",
      platform: "PS5",
      players: "2-8",
      image: "/f21b86159275023.639b110867040.jpg",
      description: "The beautiful game with HyperMotion technology."
    },
    {
      id: 4,
      title: "Cyberpunk 2077",
      genre: "RPG",
      platform: "PC",
      players: "1-2",
      image: "/image-from-rawpixel-id-12136149-jpeg.jpg",
      description: "Explore Night City with ray-tracing and DLSS 3.0."
    },
    {
      id: 5,
      title: "Elden Ring",
      genre: "Action RPG",
      platform: "PS5",
      players: "1-4",
      image: "/image-from-rawpixel-id-12373169-png.png",
      description: "FromSoftware's masterpiece in 4K at 60fps."
    },
    {
      id: 6,
      title: "Starfield",
      genre: "Space RPG",
      platform: "PC",
      players: "1-4",
      image: "/image-from-rawpixel-id-12136149-jpeg.jpg",
      description: "Bethesda's space epic with ultra settings."
    }
  ];

  const features = [
    {
      icon: "🎮",
      title: "PS4 Gaming",
      description: "Latest PlayStation 4 with popular games and multiplayer options"
    },
    {
      icon: "📽️",
      title: "4K Projector",
      description: "Ultra-high definition projection for immersive gaming visuals"
    },
    {
      icon: "🎧",
      title: "7.1 Surround",
      description: "Immersive audio systems with positional sound for gaming"
    },
    {
      icon: "🪑",
      title: "Comfortable Seating",
      description: "Spacious cabins with comfortable seating for extended sessions"
    },
    {
      icon: "📺",
      title: "Netflix & YouTube",
      description: "Streaming entertainment available between gaming sessions"
    },
    {
      icon: "🏆",
      title: "Party Ready",
      description: "Party setups available for celebration packages"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background text-on-background">
      <Header />
      
      <main className="flex-1 pt-20">
        {/* Hero Section */}
        <section className="relative min-h-[60vh] flex items-center justify-center hero-mesh overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-gradient-to-r from-tertiary/20 to-primary/10"></div>
          </div>
          
          <div className="relative z-10 text-center px-[20px] md:px-[80px] max-w-[1440px] mx-auto">
            <Badge variant="tertiary" className="mb-4">Elite Gaming</Badge>
            <h1 className="font-sans text-[40px] md:text-[64px] font-extrabold leading-[1.1] tracking-tight text-on-surface mb-6 gradient-text-cyan">
              Elite Gaming Zone
            </h1>
            <p className="font-body text-[18px] md:text-[20px] text-on-surface-variant max-w-2xl mx-auto mb-8 leading-relaxed">
              Dominate the competition with our high-performance gaming rigs featuring the latest RTX graphics, ultra-fast displays, and professional-grade peripherals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/booking">
                <Button size="lg">Book Gaming Session</Button>
              </Link>
              <Link href="/booking">
                <Button variant="secondary" size="lg">View Pricing</Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-[120px] px-[20px] md:px-[80px] max-w-[1440px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-sans text-[32px] md:text-[48px] font-bold text-on-surface mb-4">
              Gaming Packages
            </h2>
            <p className="font-body text-[18px] text-on-surface-variant max-w-2xl mx-auto">
              Experience PS4 gaming with premium projection and surround sound in our luxury cabins.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card key={index} glowColor="cyan" className="p-6 text-center">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="font-sans text-[20px] font-bold text-on-surface mb-3">
                  {feature.title}
                </h3>
                <p className="font-body text-[16px] text-on-surface-variant">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </section>

        {/* Game Selection */}
        <section className="py-[120px] px-[20px] md:px-[80px] bg-surface-container/30">
          <div className="max-w-[1440px] mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-sans text-[32px] md:text-[48px] font-bold text-on-surface mb-4">
                Game Library
              </h2>
              <p className="font-body text-[18px] text-on-surface-variant max-w-2xl mx-auto">
                Access our extensive library of AAA titles across multiple platforms.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {games.map((game) => (
                <Card key={game.id} glowColor="cyan" className="group">
                  <div className="relative h-64 mb-6 overflow-hidden rounded-lg">
                    <Image
                      src={game.image}
                      alt={game.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 right-3">
                      <Badge variant="tertiary">{game.platform}</Badge>
                    </div>
                  </div>
                  
                  <Badge variant="secondary" className="mb-3">{game.genre}</Badge>
                  <h3 className="font-sans text-[24px] font-bold text-on-surface mb-2">
                    {game.title}
                  </h3>
                  
                  <div className="flex items-center gap-4 mb-4 text-sm text-on-surface-variant">
                    <span className="font-mono">{game.players} Players</span>
                    <span>•</span>
                    <span className="font-mono">{game.platform}</span>
                  </div>
                  
                  <p className="font-body text-[16px] text-on-surface-variant mb-6 line-clamp-2">
                    {game.description}
                  </p>
                  
                  <Link href="/booking">
                    <Button className="w-full">Book Session</Button>
                  </Link>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Tournament Section */}
        <section className="py-[120px] px-[20px] md:px-[80px]">
          <div className="max-w-[1440px] mx-auto">
            <Card className="text-center p-12 md:p-16 hero-mesh cyan-glow">
              <Badge variant="tertiary" className="mb-4">Competitive Gaming</Badge>
              <h2 className="font-sans text-[32px] md:text-[48px] font-bold text-on-surface mb-6">
                Host Your Tournament
              </h2>
              <p className="font-body text-[18px] text-on-surface-variant max-w-2xl mx-auto mb-8">
                Book our entire gaming zone for private tournaments, corporate team building, or competitive gaming events with full support.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/booking">
                  <Button size="lg">Book Tournament</Button>
                </Link>
                <Link href="/contact">
                  <Button variant="secondary" size="lg">Event Inquiries</Button>
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