'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    }, 1200);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-on-background">
      <Header />
      
      <main className="flex-1 pt-20">
        {/* Hero Section */}
        <section className="relative min-h-[45vh] flex items-center justify-center bg-gradient-to-b from-surface-container/30 to-background overflow-hidden px-5">
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/10"></div>
          </div>
          
          <div className="relative z-10 text-center max-w-[800px] mx-auto pt-10">
            <Badge variant="primary" className="mb-4">Support & Bookings</Badge>
            <h1 className="font-sans text-[44px] md:text-[68px] font-extrabold leading-[1.1] tracking-tight text-white mb-6">
              Connect With Us
            </h1>
            <p className="font-body text-[16px] sm:text-[18px] text-on-surface-variant max-w-xl mx-auto mb-8 leading-relaxed">
              Have questions about booking slots, specific packages, or custom screening requests? Our events desk is available to assist you.
            </p>
          </div>
        </section>
 
        {/* Contact Form */}
        <section className="py-20 px-5 md:px-[80px] max-w-[1440px] mx-auto">
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
                      No. 120, Galle Road, Colombo 03, Sri Lanka
                    </p>
                  </div>
                </Card>
 
                <Card glowColor="cyan" className="p-6 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-tertiary/10 border border-tertiary/20 flex items-center justify-center text-tertiary shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-sans text-[18px] font-bold text-white mb-1">Phone Helpline</h3>
                    <p className="font-body text-[15px] text-on-surface-variant">
                      +94 11 234 5678 / +94 77 987 6543
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
                      bookings@naxora.lk
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
 
              <div className="mt-12 text-center p-8 bg-surface-container/20 border border-glass-stroke rounded-2xl">
                <p className="font-body text-[16px] text-on-surface-variant mb-6">
                  Ready to book a slot for cinema or gaming?
                </p>
                <Link href="/booking">
                  <Button size="lg" variant="primary" className="w-full sm:w-auto">Book Your Experience</Button>
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