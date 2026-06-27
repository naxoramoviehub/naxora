import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import { Gamepad2, Laptop, Monitor, Sparkles, Trophy, Cpu } from 'lucide-react';

export default function GamingPage() {
  const games = [
    {
      id: 1,
      title: "Horizon Rally 5",
      genre: "Racing",
      platform: "Xbox Series X",
      players: "1-4",
      image: "/image-from-rawpixel-id-14510238-jpeg.jpg",
      description: "Experience the ultimate racing adventure with photorealistic landscapes in gorgeous 4K at 60fps."
    },
    {
      id: 2,
      title: "Warfare Zone II",
      genre: "FPS",
      platform: "PC Pro Rig",
      players: "2-6",
      image: "/image-from-rawpixel-id-15201674-jpeg.jpg",
      description: "Intense competitive multiplayer action with ray tracing enabled for realistic tactical gameplay."
    },
    {
      id: 3,
      title: "Ultimate Football 24",
      genre: "Sports",
      platform: "PS5 Console",
      players: "2-8",
      image: "/f21b86159275023.639b110867040.jpg",
      description: "Experience next-gen gameplay physics and hyper-realistic motion design in local multiplayer match ups."
    },
    {
      id: 4,
      title: "Cyber City 2088",
      genre: "RPG",
      platform: "PC Pro Rig",
      players: "1-2",
      image: "/image-from-rawpixel-id-12136149-jpeg.jpg",
      description: "Explore a massive sci-fi metropolis featuring fully path-traced lighting and DLSS frame generation."
    },
    {
      id: 5,
      title: "Elden Legends",
      genre: "Action RPG",
      platform: "PS5 Console",
      players: "1-4",
      image: "/image-from-rawpixel-id-12373169-png.png",
      description: "Conquer a vast dark-fantasy realm with cinematic combat dynamics running at high frame rates."
    },
    {
      id: 6,
      title: "Galaxy Odyssey",
      genre: "Space RPG",
      platform: "PC Pro Rig",
      players: "1-4",
      image: "/image-from-rawpixel-id-12136149-jpeg.jpg",
      description: "Embark on an epic voyage across a thousand stars, with graphics cranked to ultra-premium settings."
    }
  ];

  const features = [
    {
      icon: <Gamepad2 className="w-6 h-6" />,
      title: "Next-Gen Consoles",
      description: "Play on PlayStation 5 and Xbox Series X consoles with a massive library of pre-installed games."
    },
    {
      icon: <Cpu className="w-6 h-6" />,
      title: "High-End PC Rigs",
      description: "PC gaming stations featuring RTX 40-series graphics, mechanical keybeds, and ultra-high refresh monitors."
    },
    {
      icon: <Monitor className="w-6 h-6" />,
      title: "4K Laser Projection",
      description: "Play your favorite games on massive low-latency projector screens for absolute visual scale."
    },
    {
      icon: <Trophy className="w-6 h-6" />,
      title: "7.1 Positional Sound",
      description: "Pinpoint opponent footsteps and enjoy sweeping soundscapes with immersive speaker setups."
    },
    {
      icon: <Laptop className="w-6 h-6" />,
      title: "Co-Op & Local Play",
      description: "cabins support multi-controller setups for couch co-op, fighting games, and sports titles."
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "Private Lounge",
      description: "Soundproofed suites with comfortable leather seating, customizable lighting, and snack bar access."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background text-on-background">
      <Header />
      
      <main className="flex-1 pt-20">
        {/* Hero Section */}
        <section className="relative min-h-[50vh] flex items-center justify-center bg-gradient-to-b from-surface-container/30 to-background overflow-hidden px-5">
          <div className="absolute inset-0 opacity-15 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-r from-tertiary/10 to-primary/10"></div>
          </div>
          
          <div className="relative z-10 text-center max-w-[800px] mx-auto pt-10">
            <Badge variant="tertiary" className="mb-4">Elite Gaming Zone</Badge>
            <h1 className="font-sans text-[44px] md:text-[68px] font-extrabold leading-[1.1] tracking-tight text-white mb-6">
              Next-Level Gaming
            </h1>
            <p className="font-body text-[16px] sm:text-[18px] text-on-surface-variant max-w-xl mx-auto mb-8 leading-relaxed">
              Immerse yourself in private, soundproofed gaming suites featuring high-performance rigs, next-gen consoles, and massive screens.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/booking">
                <Button size="lg" variant="highlight">Book Gaming Session</Button>
              </Link>
              <Link href="/booking">
                <Button variant="secondary" size="lg">Explore Pricing</Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-20 px-5 md:px-[80px] max-w-[1440px] mx-auto">
          <div className="text-center mb-16">
            <Badge variant="default" className="mb-4">Tech Specs</Badge>
            <h2 className="font-sans text-[36px] md:text-[50px] font-bold text-white tracking-tight">
              Hardware & Comfort
            </h2>
            <p className="font-body text-[16px] text-on-surface-variant max-w-xl mx-auto leading-relaxed">
              We provide unmatched hardware performance coupled with absolute private luxury.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card key={index} glowColor="cyan" className="p-8 flex flex-col items-center text-center">
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
        </section>

        {/* Game Selection */}
        <section className="py-24 px-5 md:px-[80px] bg-surface-container-lowest/40">
          <div className="max-w-[1440px] mx-auto">
            <div className="text-center mb-16">
              <Badge variant="tertiary" className="mb-4">Titles Library</Badge>
              <h2 className="font-sans text-[36px] md:text-[50px] font-bold text-white tracking-tight">
                Curated Game Catalog
              </h2>
              <p className="font-body text-[16px] text-on-surface-variant max-w-xl mx-auto">
                Access a vast collection of AAA titles, multiplayer cooperative games, and indie classics.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {games.map((game) => (
                <Card key={game.id} glowColor="cyan" className="group flex flex-col p-5">
                  <div className="relative h-56 mb-6 overflow-hidden rounded-xl bg-surface-base">
                    <Image
                      src={game.image}
                      alt={game.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3 z-10">
                      <Badge variant="tertiary">{game.platform}</Badge>
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <Badge variant="secondary">{game.genre}</Badge>
                  </div>
                  
                  <h3 className="font-sans text-[22px] font-bold text-white mb-2 group-hover:text-tertiary transition-colors">
                    {game.title}
                  </h3>
                  
                  <p className="font-body text-[15px] text-on-surface-variant mb-6 line-clamp-3 leading-relaxed flex-grow">
                    {game.description}
                  </p>
                  
                  <div className="flex items-center justify-between border-t border-glass-stroke pt-4 mt-auto">
                    <span className="font-mono text-xs text-on-surface-variant">{game.players} Players</span>
                    <Link href="/booking">
                      <Button size="sm" variant="secondary">Book Session</Button>
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Tournament Section */}
        <section className="py-20 px-5 md:px-[80px]">
          <div className="max-w-[1440px] mx-auto">
            <Card className="p-12 md:p-16 text-center hero-mesh border border-glass-stroke rounded-3xl">
              <Badge variant="tertiary" className="mb-4">Esports & Events</Badge>
              <h2 className="font-sans text-[32px] md:text-[46px] font-bold text-white mb-4 tracking-tight">
                Host Private Tournaments
              </h2>
              <p className="font-body text-[16px] sm:text-[18px] text-on-surface-variant max-w-xl mx-auto mb-8 leading-relaxed">
                Rent our multi-cabin zone for private esports tournaments, team-building sessions, or birthday gaming events. Full audio, recording, and setup support included.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/booking">
                  <Button size="lg" variant="primary">Book Gaming Event</Button>
                </Link>
                <Link href="/contact">
                  <Button size="lg" variant="secondary">Event Inquiries</Button>
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