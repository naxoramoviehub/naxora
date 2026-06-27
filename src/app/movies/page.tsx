import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import { Film, Volume2, Maximize2, Tv } from 'lucide-react';

export default function MoviesPage() {
  const movies = [
    {
      id: 1,
      title: "Interstellar Voyage",
      genre: "Sci-Fi Epic",
      duration: "2h 46m",
      rating: "4K HDR",
      image: "/image-from-rawpixel-id-12136149-jpeg.jpg",
      description: "Experience an epic journey across time and space, exploring new worlds through the ultimate cinematic lens."
    },
    {
      id: 2,
      title: "The Silent Cosmos",
      genre: "Suspense Thriller",
      duration: "2h 18m",
      rating: "IMAX",
      image: "/image-from-rawpixel-id-12373169-png.png",
      description: "A dark mystery unfolding on the outer edges of the solar system, where silence is the only witness."
    },
    {
      id: 3,
      title: "Neon Shadows",
      genre: "Neo-Noir Action",
      duration: "2h 56m",
      rating: "Dolby Atmos",
      image: "/image-from-rawpixel-id-14510238-jpeg.jpg",
      description: "A gritty detective tracks down a high-tech crime syndicate in a futuristic, neon-drenched metropolis."
    },
    {
      id: 4,
      title: "The Velocity Horizon",
      genre: "Action Thriller",
      duration: "2h 11m",
      rating: "4K HDR",
      image: "/image-from-rawpixel-id-15201674-jpeg.jpg",
      description: "High-octane action meets high stakes as elite pilots navigate dangerous skies on a covert operations mission."
    },
    {
      id: 5,
      title: "Submerged Abyss",
      genre: "Adventure Epic",
      duration: "3h 12m",
      rating: "IMAX 3D",
      image: "/f21b86159275023.639b110867040.jpg",
      description: "An ancient secret buried deep within the ocean floor triggers a race for discovery that will change humanity forever."
    },
    {
      id: 6,
      title: "Chronicles of Time",
      genre: "Fantasy Drama",
      duration: "2h 35m",
      rating: "Dolby Vision",
      image: "/image-from-rawpixel-id-12136149-jpeg.jpg",
      description: "Two lives intertwined across centuries seek a lost artifact that governs the flow of human destiny."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background text-on-background">
      <Header />
      
      <main className="flex-1 pt-20">
        {/* Hero Section */}
        <section className="relative min-h-[50vh] flex items-center justify-center bg-gradient-to-b from-surface-container/30 to-background overflow-hidden px-5">
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-tertiary/10"></div>
          </div>
          
          <div className="relative z-10 text-center max-w-[800px] mx-auto pt-10">
            <Badge variant="primary" className="mb-4">Private Screening</Badge>
            <h1 className="font-sans text-[44px] md:text-[68px] font-extrabold leading-[1.1] tracking-tight text-white mb-6">
              Cinematic Luxury
            </h1>
            <p className="font-body text-[16px] sm:text-[18px] text-on-surface-variant max-w-xl mx-auto mb-8 leading-relaxed">
              Rent a private cinema cabin featuring custom 4K HDR projection, deep leather recliners, and immersive surround sound.
            </p>
            <Link href="/booking">
              <Button size="lg" variant="primary">Book Private Screening</Button>
            </Link>
          </div>
        </section>

        {/* Features / Cabin specs */}
        <section className="py-20 px-5 md:px-[80px] max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
            <Card glowColor="purple" className="flex flex-col items-center text-center p-8">
              <div className="w-14 h-14 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-6">
                <Tv className="w-6 h-6" />
              </div>
              <h3 className="font-sans text-[20px] font-bold text-white mb-3">4K HDR Projection</h3>
              <p className="font-body text-[15px] text-on-surface-variant leading-relaxed">
                Enjoy ultra-clear, high-contrast imagery on screen with our state-of-the-art native 4K laser projection systems.
              </p>
            </Card>
            
            <Card glowColor="purple" className="flex flex-col items-center text-center p-8">
              <div className="w-14 h-14 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-6">
                <Volume2 className="w-6 h-6" />
              </div>
              <h3 className="font-sans text-[20px] font-bold text-white mb-3">Dolby Atmos Surround</h3>
              <p className="font-body text-[15px] text-on-surface-variant leading-relaxed">
                Positional audio with premium 7.1 surround sound arrays that place you directly in the middle of the story.
              </p>
            </Card>
            
            <Card glowColor="purple" className="flex flex-col items-center text-center p-8">
              <div className="w-14 h-14 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-6">
                <Film className="w-6 h-6" />
              </div>
              <h3 className="font-sans text-[20px] font-bold text-white mb-3">On-Demand Streaming</h3>
              <p className="font-body text-[15px] text-on-surface-variant leading-relaxed">
                Log into Netflix, YouTube, Disney+, or stream high-definition sports channels directly on our screens.
              </p>
            </Card>
          </div>

          {/* Curated Selections */}
          <div className="mb-20">
            <div className="text-center mb-16">
              <Badge variant="default" className="mb-4">Trending Collections</Badge>
              <h2 className="font-sans text-[36px] md:text-[50px] font-bold text-white tracking-tight">
                Now Streaming
              </h2>
              <p className="font-body text-[16px] text-on-surface-variant max-w-xl mx-auto">
                Explore a few of our suggested cinema library titles to inspire your next screening block.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {movies.map((movie) => (
                <Card key={movie.id} glowColor="purple" className="group flex flex-col p-5">
                  <div className="relative h-56 mb-6 overflow-hidden rounded-xl bg-surface-base">
                    <Image
                      src={movie.image}
                      alt={movie.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3 z-10">
                      <Badge variant="primary">{movie.rating}</Badge>
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <Badge variant="secondary">{movie.genre}</Badge>
                  </div>
                  
                  <h3 className="font-sans text-[22px] font-bold text-white mb-2 group-hover:text-primary transition-colors">
                    {movie.title}
                  </h3>
                  
                  <p className="font-body text-[15px] text-on-surface-variant mb-6 line-clamp-3 leading-relaxed flex-grow">
                    {movie.description}
                  </p>
                  
                  <div className="flex items-center justify-between border-t border-glass-stroke pt-4 mt-auto">
                    <span className="font-mono text-xs text-on-surface-variant">{movie.duration}</span>
                    <Link href={`/booking`}>
                      <Button size="sm" variant="secondary">Book Screening</Button>
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Custom Screenings CTA */}
        <section className="py-20 px-5 md:px-[80px] bg-surface-container-lowest/40">
          <div className="max-w-[1440px] mx-auto">
            <Card className="p-12 md:p-16 text-center hero-mesh border border-glass-stroke rounded-3xl">
              <h2 className="font-sans text-[32px] md:text-[46px] font-bold text-white mb-4 tracking-tight">
                Want to stream your own content?
              </h2>
              <p className="font-body text-[16px] sm:text-[18px] text-on-surface-variant max-w-xl mx-auto mb-8 leading-relaxed">
                Connect your console, laptop, or sign in to your personal streaming account. Enjoy live sporting events, video conferences, or private watch parties.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/booking">
                  <Button size="lg" variant="primary">Book Custom Cabin</Button>
                </Link>
                <Link href="/contact">
                  <Button size="lg" variant="secondary">Inquire Details</Button>
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