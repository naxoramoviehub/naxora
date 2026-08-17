'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';
import { ChevronDown } from 'lucide-react';

export default function Hero() {
  const [particles, setParticles] = useState<{ id: number; size: number; x: number; y: number; duration: number; delay: number }[]>([]);

  useEffect(() => {
    const generated = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      size: Math.random() * 4 + 2,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: Math.random() * 10 + 10,
      delay: Math.random() * 5,
    }));
    setParticles(generated);
  }, []);

  return (
    <section className="relative min-h-screen pt-20 flex items-center justify-start overflow-hidden bg-background">
      {/* Background Image with Masking */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none">
        {/* Responsive image container */}
        <div className="absolute inset-0 w-full h-full lg:w-2/3 lg:left-1/3">
          <Image
            src="/Hero_image.png"
            alt="NAXORA Luxury Private Screenings"
            fill
            sizes="(min-width: 1024px) 67vw, 100vw"
            priority
            className="object-cover object-right md:object-center opacity-65"
          />
        </div>
        
        {/* Soft lighting overlays / Vignette */}
        {/* Left deep mask to keep text clear */}
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-transparent z-10 lg:w-3/5" />
        {/* Ambient bottom fade */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent z-10" />
        {/* Ambient glow highlight top left */}
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full bg-primary/25"
            style={{
              width: p.size,
              height: p.size,
              left: `${p.x}%`,
              top: `${p.y}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0.1, 0.7, 0.1],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Hero Content */}
      <div className="relative z-20 w-full max-w-[1440px] mx-auto px-5 md:px-[80px] pt-10 pb-16">
        <div className="max-w-2xl text-left">

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-sans text-[44px] sm:text-[64px] lg:text-[76px] font-extrabold leading-[1.05] tracking-tight text-white mb-6"
          >
            Experience
            <br />
            Entertainment
            <br />
            <span className="bg-gradient-to-r from-primary via-primary-container to-tertiary bg-clip-text text-transparent text-glow-purple">
              Redefined.
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-body text-[16px] sm:text-[18px] text-on-surface-variant mb-10 leading-relaxed max-w-xl"
          >
            Immerse yourself in luxury private cinema cabins, competitive gaming arenas, and bespoke group celebrations. Tailored technology meets comfort for the ultimate escape.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-wrap gap-4 items-center"
          >
            <Link href="/#packages">
              <Button size="lg" variant="primary">
                Book Your Cabin
              </Button>
            </Link>
            <Link href="/#packages">
              <Button size="lg" variant="secondary">
                Explore Offerings
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 2.5, repeat: Infinity }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 hidden md:flex flex-col items-center gap-2 cursor-pointer"
        role="button" tabIndex={0} aria-label="Scroll to featured experiences"
        onClick={() => window.scrollTo({ top: window.innerHeight * 0.9, behavior: 'smooth' })}
        onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') window.scrollTo({ top: window.innerHeight * 0.9, behavior: 'smooth' }); }}
      >
        <span className="font-mono text-xs uppercase tracking-widest text-on-surface-variant">Scroll down</span>
        <ChevronDown className="w-5 h-5 text-on-surface-variant animate-bounce" />
      </motion.div>
    </section>
  );
}
