'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, this would submit to a backend
    console.log('Contact form submitted:', formData);
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
  };

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
            <Badge variant="primary" className="mb-4">Contact Us</Badge>
            <h1 className="font-sans text-[40px] md:text-[64px] font-extrabold leading-[1.1] tracking-tight text-on-surface mb-6 gradient-text">
              Get in Touch
            </h1>
            <p className="font-body text-[18px] md:text-[20px] text-on-surface-variant max-w-2xl mx-auto mb-8 leading-relaxed">
              Have questions about our experiences? We're here to help you plan your perfect entertainment session.
            </p>
          </div>
        </section>

        {/* Contact Form */}
        <section className="py-[120px] px-[20px] md:px-[80px] max-w-[1440px] mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="font-sans text-[32px] font-bold text-on-surface mb-6">
                Send us a Message
              </h2>
              <Card className="p-8">
                <form onSubmit={handleSubmit}>
                  <div className="space-y-6">
                    <div>
                      <label className="block font-sans text-[16px] font-semibold text-on-surface mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-3 bg-surface-container border border-glass-stroke rounded-lg text-on-surface focus:outline-none focus:border-primary"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block font-sans text-[16px] font-semibold text-on-surface mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        className="w-full px-4 py-3 bg-surface-container border border-glass-stroke rounded-lg text-on-surface focus:outline-none focus:border-primary"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block font-sans text-[16px] font-semibold text-on-surface mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        className="w-full px-4 py-3 bg-surface-container border border-glass-stroke rounded-lg text-on-surface focus:outline-none focus:border-primary"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block font-sans text-[16px] font-semibold text-on-surface mb-2">
                        Subject
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-3 bg-surface-container border border-glass-stroke rounded-lg text-on-surface focus:outline-none focus:border-primary"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block font-sans text-[16px] font-semibold text-on-surface mb-2">
                        Message
                      </label>
                      <textarea
                        required
                        className="w-full px-4 py-3 bg-surface-container border border-glass-stroke rounded-lg text-on-surface focus:outline-none focus:border-primary h-32"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      />
                    </div>
                    <Button size="lg" className="w-full">Send Message</Button>
                  </div>
                </form>
              </Card>
            </div>

            <div>
              <h2 className="font-sans text-[32px] font-bold text-on-surface mb-6">
                Contact Information
              </h2>
              <div className="space-y-6">
                <Card glowColor="purple" className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="text-2xl">📍</div>
                    <div>
                      <h3 className="font-sans text-[20px] font-bold text-on-surface mb-2">Location</h3>
                      <p className="font-body text-[16px] text-on-surface-variant">
                        Colombo, Sri Lanka
                      </p>
                    </div>
                  </div>
                </Card>

                <Card glowColor="cyan" className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="text-2xl">📞</div>
                    <div>
                      <h3 className="font-sans text-[20px] font-bold text-on-surface mb-2">Phone</h3>
                      <p className="font-body text-[16px] text-on-surface-variant">
                        +94 XX XXX XXXX
                      </p>
                    </div>
                  </div>
                </Card>

                <Card glowColor="purple" className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="text-2xl">✉️</div>
                    <div>
                      <h3 className="font-sans text-[20px] font-bold text-on-surface mb-2">Email</h3>
                      <p className="font-body text-[16px] text-on-surface-variant">
                        info@naxora.lk
                      </p>
                    </div>
                  </div>
                </Card>

                <Card glowColor="cyan" className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="text-2xl">⏰</div>
                    <div>
                      <h3 className="font-sans text-[20px] font-bold text-on-surface mb-2">Hours</h3>
                      <p className="font-body text-[16px] text-on-surface-variant">
                        Open 7 days a week<br />
                        10:00 AM - 11:00 PM
                      </p>
                    </div>
                  </div>
                </Card>
              </div>

              <div className="mt-8 text-center">
                <p className="font-body text-[18px] text-on-surface-variant mb-4">
                  Ready to book your experience?
                </p>
                <Link href="/booking">
                  <Button size="lg">Book Now</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}