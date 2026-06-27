import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';

export default function AboutPage() {
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
            <Badge variant="primary" className="mb-4">About Us</Badge>
            <h1 className="font-sans text-[40px] md:text-[64px] font-extrabold leading-[1.1] tracking-tight text-on-surface mb-6 gradient-text">
              Welcome to NAXORA
            </h1>
            <p className="font-body text-[18px] md:text-[20px] text-on-surface-variant max-w-2xl mx-auto mb-8 leading-relaxed">
              Sri Lanka's premier private entertainment destination, where luxury meets unforgettable experiences.
            </p>
          </div>
        </section>

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
              <Link href="/packages">
                <Button size="lg">Experience NAXORA</Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}