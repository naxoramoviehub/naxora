import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';

export default function MoviesPage() {
  const movies = [
    {
      id: 1,
      title: "Dune: Part Two",
      genre: "Sci-Fi Epic",
      duration: "2h 46m",
      rating: "4K HDR",
      image: "/image-from-rawpixel-id-12136149-jpeg.jpg",
      description: "Experience the epic continuation of Paul Atreides' journey on the big screen."
    },
    {
      id: 2,
      title: "Oppenheimer",
      genre: "Historical Drama",
      duration: "3h 0m",
      rating: "IMAX 70mm",
      image: "/image-from-rawpixel-id-12373169-png.png",
      description: "Christopher Nolan's masterpiece about the father of the atomic bomb."
    },
    {
      id: 3,
      title: "The Batman",
      genre: "Action Thriller",
      duration: "2h 56m",
      rating: "Dolby Atmos",
      image: "/image-from-rawpixel-id-14510238-jpeg.jpg",
      description: "A darker, grittier take on the Dark Knight's early years."
    },
    {
      id: 4,
      title: "Top Gun: Maverick",
      genre: "Action Drama",
      duration: "2h 11m",
      rating: "DTS:X",
      image: "/image-from-rawpixel-id-15201674-jpeg.jpg",
      description: "Return to the danger zone with this stunning sequel."
    },
    {
      id: 5,
      title: "Avatar: The Way of Water",
      genre: "Sci-Fi Adventure",
      duration: "3h 12m",
      rating: "HFR 3D",
      image: "/f21b86159275023.639b110867040.jpg",
      description: "James Cameron's visual masterpiece in breathtaking detail."
    },
    {
      id: 6,
      title: "Interstellar",
      genre: "Sci-Fi Drama",
      duration: "2h 49m",
      rating: "4K Atmos",
      image: "/image-from-rawpixel-id-12136149-jpeg.jpg",
      description: "A journey through space and time from Christopher Nolan."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background text-on-background">
      <Header />
      
      <main className="flex-1 pt-20">
        {/* Hero Section */}
        <section className="relative min-h-[60vh] flex items-center justify-center bg-gradient-to-b from-surface-container to-background overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10"></div>
          </div>
          
          <div className="relative z-10 text-center px-[20px] md:px-[80px] max-w-[1440px] mx-auto">
            <Badge variant="primary" className="mb-4">Private Cinema</Badge>
            <h1 className="font-sans text-[40px] md:text-[64px] font-extrabold leading-[1.1] tracking-tight text-on-surface mb-6 gradient-text">
              Cinematic Excellence
            </h1>
            <p className="font-body text-[18px] md:text-[20px] text-on-surface-variant max-w-2xl mx-auto mb-8 leading-relaxed">
              Experience movies the way they were meant to be seen - in luxury private screening rooms with state-of-the-art projection and immersive sound.
            </p>
            <Link href="/booking">
              <Button size="lg">Book a Private Screening</Button>
            </Link>
          </div>
        </section>

        {/* Features */}
        <section className="py-[120px] px-[20px] md:px-[80px] max-w-[1440px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-sans text-[32px] md:text-[48px] font-bold text-on-surface mb-4">
              Cinema Packages
            </h2>
            <p className="font-body text-[18px] text-on-surface-variant max-w-2xl mx-auto">
              Choose from our range of cinema packages with Netflix and YouTube streaming.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <Card glowColor="purple" className="text-center p-8">
              <div className="text-4xl mb-4">🎬</div>
              <h3 className="font-sans text-[20px] font-bold text-on-surface mb-3">FHD/4K Projection</h3>
              <p className="font-body text-[16px] text-on-surface-variant">
                Crystal-clear projection with FHD or 4K resolution for stunning visual clarity.
              </p>
            </Card>
            <Card glowColor="purple" className="text-center p-8">
              <div className="text-4xl mb-4">🔊</div>
              <h3 className="font-sans text-[20px] font-bold text-on-surface mb-3">5.1/7.1 Sound</h3>
              <p className="font-body text-[16px] text-on-surface-variant">
                Immersive surround sound systems for an authentic cinema experience.
              </p>
            </Card>
            <Card glowColor="purple" className="text-center p-8">
              <div className="text-4xl mb-4">📺</div>
              <h3 className="font-sans text-[20px] font-bold text-on-surface mb-3">Netflix & YouTube</h3>
              <p className="font-body text-[16px] text-on-surface-variant">
                Stream your favorite content from Netflix and YouTube on the big screen.
              </p>
            </Card>
          </div>
        </section>

        {/* Movie Selection */}
        <section className="py-[120px] px-[20px] md:px-[80px] bg-surface-container/30">
          <div className="max-w-[1440px] mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-sans text-[32px] md:text-[48px] font-bold text-on-surface mb-4">
                Current Selection
              </h2>
              <p className="font-body text-[18px] text-on-surface-variant max-w-2xl mx-auto">
                Choose from our curated selection of blockbuster films and timeless classics.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {movies.map((movie) => (
                <Card key={movie.id} glowColor="purple" className="group">
                  <div className="relative h-64 mb-6 overflow-hidden rounded-lg">
                    <Image
                      src={movie.image}
                      alt={movie.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 right-3">
                      <Badge variant="primary">{movie.rating}</Badge>
                    </div>
                  </div>
                  
                  <Badge variant="secondary" className="mb-3">{movie.genre}</Badge>
                  <h3 className="font-sans text-[24px] font-bold text-on-surface mb-2">
                    {movie.title}
                  </h3>
                  
                  <div className="flex items-center gap-4 mb-4 text-sm text-on-surface-variant">
                    <span className="font-mono">{movie.duration}</span>
                    <span>•</span>
                    <span className="font-mono">{movie.rating}</span>
                  </div>
                  
                  <p className="font-body text-[16px] text-on-surface-variant mb-6 line-clamp-2">
                    {movie.description}
                  </p>
                  
                  <Link href="/booking">
                    <Button className="w-full">Book Screening</Button>
                  </Link>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-[120px] px-[20px] md:px-[80px]">
          <div className="max-w-[1440px] mx-auto">
            <Card className="text-center p-12 md:p-16 hero-mesh">
              <h2 className="font-sans text-[32px] md:text-[48px] font-bold text-on-surface mb-6">
                Custom Private Screenings
              </h2>
              <p className="font-body text-[18px] text-on-surface-variant max-w-2xl mx-auto mb-8">
                Don't see your preferred film? Contact us for custom private screenings of any movie from our extensive library.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/booking">
                  <Button size="lg">Request Custom Screening</Button>
                </Link>
                <Link href="/contact">
                  <Button variant="secondary" size="lg">Contact Us</Button>
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