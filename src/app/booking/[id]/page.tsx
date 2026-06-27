'use client';

import { useState, useEffect, Suspense } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import { 
  Calendar as CalendarIcon, Clock, User, Check, AlertCircle, ArrowLeft, 
  Copy, ExternalLink, MessageSquare, DollarSign, CheckCircle2, ChevronLeft, ChevronRight 
} from 'lucide-react';
import { TIME_SLOTS, createBooking, getBookedSlots, Booking } from '@/lib/database';

function BookingFormContent() {
  const params = useParams();
  const router = useRouter();
  const experienceId = params.id as string;
  
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    notes: ''
  });

  const [bookedSlots, setBookedSlots] = useState<{ time: string; status: Booking['status'] }[]>([]);
  const [createdBooking, setCreatedBooking] = useState<Booking | null>(null);
  
  // Persisted Countdown hold timer
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [timerExpired, setTimerExpired] = useState(false);

  // Month navigation for custom calendar
  const [currentDate, setCurrentDate] = useState<Date>(new Date('2026-06-27'));
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  useEffect(() => {
    setCurrentDate(new Date());
  }, []);

  const experiences: Record<string, any> = {
    'mini-cabin': {
      title: 'Mini Cabin Suite',
      description: 'Intimate private lounge perfect for couples or small groups.',
      price: '2350 LKR',
      duration: '2.5 Hours',
      capacity: 'Max 3 Pax',
      extraHour: '900 LKR',
      image: '/image-from-rawpixel-id-12136149-jpeg.jpg',
      features: ['Netflix / YouTube HD', 'Comfortable Sofa Cabin', '1080p Laser Projector', '5.1 Positional Audio']
    },
    'elite-silver': {
      title: 'Elite Silver Suite',
      description: 'Enhanced screen size and audio fidelity for a cinematic experience.',
      price: '2550 LKR',
      duration: '3.0 Hours',
      capacity: 'Max 4 Pax',
      extraHour: '900 LKR',
      image: '/image-from-rawpixel-id-14510238-jpeg.jpg',
      features: ['Netflix / YouTube HD', 'Premium Leather Recliners', 'Full HD Projector System', '5.1 Surround Sound Array']
    },
    'gold': {
      title: 'Gold VIP Cabin',
      description: 'Complete luxury with climate-control air conditioning and 4K resolution.',
      price: '3000 LKR',
      duration: '3.0 Hours',
      capacity: 'Max 4 Pax',
      extraHour: '1000 LKR',
      image: '/image-from-rawpixel-id-15201674-jpeg.jpg',
      features: ['Climate A/C Control', 'Premium Reclining Sofa', 'Native 4K Projector Screen', '7.1 Positional Audio Setup']
    },
    'platinum': {
      title: 'Platinum Gamer Suite',
      description: 'High-performance console gaming setup coupled with cinematic movie streams.',
      price: '3450 LKR',
      duration: '3.0 Hours',
      capacity: 'Max 4 Pax',
      extraHour: '1000 LKR',
      image: '/image-from-rawpixel-id-12136149-jpeg.jpg',
      features: ['PS5 / PS4 Pro Console', '4 Wireless Controllers', 'Climate A/C Control', '7.1 Sound & 4K Projector']
    },
    'royal': {
      title: 'Royal VIP Suite',
      description: 'Generous suite size designed for larger family viewings or group co-op gaming.',
      price: '5300 LKR',
      duration: '3.0 Hours',
      capacity: 'Max 6 Pax',
      extraHour: '1300 LKR',
      image: '/image-from-rawpixel-id-14510238-jpeg.jpg',
      features: ['VIP Lounge Seating', 'PS5 Console / PS4 Pro', 'Large 4K Laser Screen', '7.1 Positional Audio Setup']
    },
    'lite-celebration': {
      title: 'Lite Celebration Package',
      description: 'Ideal package for hosting surprise birthday parties or small milestones.',
      price: '6250 LKR',
      duration: '3.0 Hours',
      capacity: 'Max 6 Pax',
      extraHour: '1600 LKR',
      image: '/image-from-rawpixel-id-15201674-jpeg.jpg',
      features: ['Balloon & Banner Setup', 'Pro Wireless Karaoke Mics', 'PS5 / PS4 Pro System', 'Beverages & Catering Space']
    },
    'grand-celebration': {
      title: 'Grand Celebration Package',
      description: 'Our ultimate luxury party package with extended duration and full decorations.',
      price: '8950 LKR',
      duration: '4.0 Hours',
      capacity: 'Max 8 Pax',
      extraHour: '1900 LKR',
      image: '/image-from-rawpixel-id-15201674-jpeg.jpg',
      features: ['Full Balloon Theme Decor', 'Extended 4-Hour Block', 'Wireless Dual Karaoke Mics', 'PS5 Console + Games Suite', 'Complimentary Snack Tray']
    }
  };

  const experience = experiences[experienceId];

  // Fetch slot availability when date changes
  useEffect(() => {
    if (formData.date && experienceId) {
      getBookedSlots(formData.date, experienceId).then(slots => {
        setBookedSlots(slots);
      });
    }
  }, [formData.date, experienceId]);

  // Persisted countdown timer management
  useEffect(() => {
    if (!formData.date || !formData.time || step === 4) {
      setTimeLeft(null);
      return;
    }

    const timerKey = `naxora_hold_expiry_${experienceId}`;
    let expiry = localStorage.getItem(timerKey);
    
    if (!expiry) {
      const newExpiry = Date.now() + 15 * 60 * 1000; // 15 mins
      localStorage.setItem(timerKey, newExpiry.toString());
      expiry = newExpiry.toString();
    }

    const updateTimer = () => {
      const remaining = parseInt(expiry!) - Date.now();
      if (remaining <= 0) {
        setTimeLeft(0);
        setTimerExpired(true);
        // Reset selections
        setFormData(prev => ({ ...prev, date: '', time: '' }));
        localStorage.removeItem(timerKey);
      } else {
        setTimeLeft(Math.floor(remaining / 1000));
        setTimerExpired(false);
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [formData.date, formData.time, step, experienceId]);

  if (!experience) {
    return (
      <div className="flex flex-col min-h-screen bg-background text-on-background">
        <Header />
        <main className="flex-1 pt-20 flex items-center justify-center">
          <div className="text-center">
            <h1 className="font-sans text-[32px] font-bold text-white mb-4">Suite Not Found</h1>
            <Link href="/booking">
              <Button variant="primary">Back to Booking</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Handle finalize submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const booking = await createBooking({
        customer_name: formData.name,
        customer_email: formData.email,
        customer_phone: formData.phone,
        experience_id: experienceId,
        booking_date: formData.date,
        booking_time: formData.time,
        notes: formData.notes
      });
      setCreatedBooking(booking);
      
      // Clear hold timer upon successful booking
      localStorage.removeItem(`naxora_hold_expiry_${experienceId}`);
      setStep(4);
    } catch (err) {
      console.error(err);
      alert('Error creating booking request. Please try again.');
    }
  };

  // Format countdown string
  const formatTimeLeft = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const secs = sec % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Copy text helper
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  // Generate WhatsApp message
  const triggerWhatsApp = () => {
    if (!createdBooking) return;
    const phoneNum = '+94771234567'; // Admin phone
    const text = `Hello NAXORA, I would like to submit my bank transfer receipt for confirmation.

*Booking Details:*
- *Booking ID:* ${createdBooking.id}
- *Customer:* ${createdBooking.customer_name}
- *Package:* ${experience.title}
- *Date & Time:* ${createdBooking.booking_date} at ${
      TIME_SLOTS.find(ts => ts.time === createdBooking.booking_time)?.display || createdBooking.booking_time
    }
- *Participants:* ${experience.capacity}
- *Reference:* ${createdBooking.id}-REC

I have attached the screenshot of the bank transfer transaction receipt below. Please confirm my slot. Thank you!`;

    const url = `https://api.whatsapp.com/send?phone=${phoneNum}&text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  // Custom Calendar Helpers
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay();

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
  };

  const selectDate = (day: number) => {
    const dateStr = `${currentYear}-${(currentMonth + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    setFormData({ ...formData, date: dateStr, time: '' });
  };

  // Render Calendar squares
  const renderCalendar = () => {
    const squares = [];
    const today = new Date();
    today.setHours(0,0,0,0);

    // Padding empty cells
    for (let i = 0; i < firstDayIndex; i++) {
      squares.push(<div key={`empty-${i}`} className="h-10 md:h-12 w-full" />);
    }

    // Days cells
    for (let day = 1; day <= daysInMonth; day++) {
      const cellDate = new Date(currentYear, currentMonth, day);
      const isPast = cellDate < today;
      
      const dateStr = `${currentYear}-${(currentMonth + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
      const isSelected = formData.date === dateStr;

      squares.push(
        <button
          key={`day-${day}`}
          type="button"
          disabled={isPast}
          onClick={() => selectDate(day)}
          className={`h-10 md:h-12 w-full flex items-center justify-center font-mono rounded-lg transition-all text-sm border focus:outline-none ${
            isPast 
              ? 'text-muted border-transparent cursor-not-allowed opacity-20' 
              : isSelected
                ? 'bg-primary border-primary text-white font-bold shadow-[0_0_15px_rgba(139,92,246,0.4)]'
                : 'text-white border-glass-stroke hover:border-primary/50 hover:bg-primary/5'
          }`}
        >
          {day}
        </button>
      );
    }

    return squares;
  };

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  return (
    <div className="flex flex-col min-h-screen bg-background text-on-background">
      <Header />
      
      <main className="flex-1 pt-20">
        {/* Wizard progress header */}
        <section className="pt-16 pb-8 px-5 md:px-[80px] max-w-[1440px] mx-auto text-center">
          <div className="mb-4">
            <Badge variant="primary">Step {step + 1} of 3</Badge>
          </div>
          <h1 className="font-sans text-[36px] md:text-[50px] font-extrabold text-white tracking-tight mb-4">
            {step === 1 ? 'Details Review' : step === 2 ? 'Schedule Time' : step === 3 ? 'Contact Info' : 'Submit Receipt'}
          </h1>
          
          {/* Progress bar */}
          <div className="max-w-md mx-auto relative mb-12">
            <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-surface-container -translate-y-1/2 z-0" />
            <div 
              className="absolute top-1/2 left-0 h-[2px] bg-primary -translate-y-1/2 z-0 transition-all duration-300"
              style={{ width: step === 1 ? '33.3%' : step === 2 ? '66.6%' : '100%' }}
            />
            <div className="relative z-10 flex justify-between">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-mono text-sm font-bold shadow-lg shadow-primary/25">1</div>
                <span className="text-xs font-semibold text-white mt-2">Suite</span>
              </div>
              <div className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-mono text-sm font-bold transition-colors ${
                  step >= 2 ? 'bg-primary text-white shadow-lg shadow-primary/25' : 'bg-surface-container text-on-surface-variant'
                }`}>2</div>
                <span className={`text-xs font-semibold mt-2 transition-colors ${step >= 2 ? 'text-white' : 'text-on-surface-variant'}`}>Time Slot</span>
              </div>
              <div className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-mono text-sm font-bold transition-colors ${
                  step >= 3 ? 'bg-primary text-white shadow-lg shadow-primary/25' : 'bg-surface-container text-on-surface-variant'
                }`}>3</div>
                <span className={`text-xs font-semibold mt-2 transition-colors ${step >= 3 ? 'text-white' : 'text-on-surface-variant'}`}>Details</span>
              </div>
            </div>
          </div>

          {/* Persistent Hold Timer banner */}
          {timeLeft !== null && (
            <div className="max-w-md mx-auto bg-primary/10 border border-primary/25 rounded-xl px-4 py-3 flex items-center justify-center gap-3.5 mb-8 animate-pulse">
              <Clock className="w-5 h-5 text-primary" />
              <div className="text-sm font-medium text-white flex items-center gap-1.5">
                <span>Slot reserved:</span>
                <span className="font-mono text-primary font-bold text-base">{formatTimeLeft(timeLeft)}</span>
              </div>
            </div>
          )}

          {timerExpired && (
            <div className="max-w-md mx-auto bg-error/10 border border-error/25 rounded-xl px-4 py-3 flex items-center justify-center gap-3.5 mb-8">
              <AlertCircle className="w-5 h-5 text-error" />
              <span className="text-sm font-medium text-error">Reservation expired. Select date/time slot again.</span>
            </div>
          )}
        </section>

        {/* Form Container */}
        <section className="pb-24 px-5 md:px-[80px] max-w-[1440px] mx-auto">
          {step === 1 && (
            <div className="max-w-4xl mx-auto">
              <Card className="p-6 md:p-10 border border-glass-stroke">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <div className="relative h-64 mb-6 overflow-hidden rounded-xl bg-surface-base">
                      <Image
                        src={experience.image}
                        alt={experience.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover"
                      />
                    </div>
                    <Badge variant="primary" className="mb-3">{experience.price}</Badge>
                    <h2 className="font-sans text-[28px] font-bold text-white mb-2">
                      {experience.title}
                    </h2>
                    <p className="font-body text-[15px] text-on-surface-variant mb-6 leading-relaxed">
                      {experience.description}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-sans text-[18px] font-bold text-white mb-4 uppercase tracking-wider">Features Included</h3>
                    <ul className="space-y-3.5 mb-8">
                      {experience.features.map((feature: string, index: number) => (
                        <li key={index} className="font-body text-[15px] text-on-surface-variant flex items-center gap-3.5">
                          <Check className="w-4 h-4 text-primary shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="space-y-3.5 border-t border-glass-stroke pt-5">
                      <div className="flex items-center gap-3.5 text-[15px] text-on-surface-variant">
                        <Clock className="w-4 h-4 text-primary shrink-0" />
                        <span>Slot Duration: <strong className="text-white font-semibold">{experience.duration}</strong></span>
                      </div>
                      <div className="flex items-center gap-3.5 text-[15px] text-on-surface-variant">
                        <User className="w-4 h-4 text-primary shrink-0" />
                        <span>Suite Capacity: <strong className="text-white font-semibold">{experience.capacity}</strong></span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-10 flex justify-between border-t border-glass-stroke pt-6">
                  <Link href="/booking">
                    <Button variant="secondary" className="flex items-center gap-2">
                      <ArrowLeft className="w-4 h-4" />
                      <span>Back to Suites</span>
                    </Button>
                  </Link>
                  <Button size="lg" onClick={() => setStep(2)}>Continue to Schedule</Button>
                </div>
              </Card>
            </div>
          )}

          {step === 2 && (
            <div className="max-w-5xl mx-auto">
              <div className="grid lg:grid-cols-12 gap-8">
                {/* Custom Calendar Column */}
                <div className="lg:col-span-7">
                  <Card className="p-6 border border-glass-stroke">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="font-sans text-xl font-bold text-white">
                        {monthNames[currentMonth]} {currentYear}
                      </h3>
                      <div className="flex items-center space-x-2">
                        <button 
                          onClick={handlePrevMonth} 
                          type="button"
                          className="p-1.5 rounded-lg border border-glass-stroke text-on-surface-variant hover:text-white hover:bg-white/5 transition-all cursor-pointer"
                        >
                          <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button 
                          onClick={handleNextMonth} 
                          type="button"
                          className="p-1.5 rounded-lg border border-glass-stroke text-on-surface-variant hover:text-white hover:bg-white/5 transition-all cursor-pointer"
                        >
                          <ChevronRight className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                    {/* Calendar grid headers */}
                    <div className="grid grid-cols-7 gap-2 text-center text-xs font-bold text-on-surface-variant font-mono mb-4 uppercase tracking-wider">
                      <div>Su</div><div>Mo</div><div>Tu</div><div>We</div><div>Th</div><div>Fr</div><div>Sa</div>
                    </div>
                    {/* Calendar days */}
                    <div className="grid grid-cols-7 gap-2">
                      {renderCalendar()}
                    </div>
                  </Card>
                </div>

                {/* Time Slots Column */}
                <div className="lg:col-span-5 flex flex-col">
                  <Card className="p-6 border border-glass-stroke flex-1">
                    <h3 className="font-sans text-xl font-bold text-white mb-2">Available Slots</h3>
                    <p className="font-body text-xs text-on-surface-variant mb-6">
                      Selected Date: <strong className="text-white font-mono">{formData.date || 'Please select a date'}</strong>
                    </p>

                    {formData.date ? (
                      <div className="space-y-4">
                        {TIME_SLOTS.map((slot) => {
                          const booked = bookedSlots.find(bs => bs.time === slot.time);
                          const isBooked = booked?.status === 'confirmed';
                          const isPending = booked?.status === 'pending';
                          const isSelected = formData.time === slot.time;

                          let slotStyle = "border-glass-stroke text-white hover:border-primary/50 hover:bg-primary/5";
                          let labelText = "Available";
                          let labelColor = "text-primary border-primary/20 bg-primary/10";
                          let disabled = false;

                          if (isBooked) {
                            slotStyle = "border-transparent bg-surface-container/20 text-muted opacity-30 cursor-not-allowed";
                            labelText = "Booked";
                            labelColor = "text-muted border-glass-stroke bg-white/5";
                            disabled = true;
                          } else if (isPending) {
                            slotStyle = "border-amber-500/30 text-white bg-amber-500/5 hover:bg-amber-500/10 hover:border-amber-500/50";
                            labelText = "Hold Pending";
                            labelColor = "text-amber-500 border-amber-500/20 bg-amber-500/10";
                          }

                          if (isSelected) {
                            slotStyle = "border-primary bg-primary text-white font-semibold shadow-[0_0_20px_rgba(139,92,246,0.3)]";
                            labelText = "Selected";
                            labelColor = "text-white border-white/20 bg-white/10";
                          }

                          return (
                            <button
                              key={slot.id}
                              type="button"
                              disabled={disabled}
                              onClick={() => setFormData({ ...formData, time: slot.time })}
                              className={`w-full px-5 py-4 border rounded-xl flex items-center justify-between text-left transition-all focus:outline-none cursor-pointer ${slotStyle}`}
                            >
                              <div className="flex items-center gap-3.5">
                                <Clock className={`w-4.5 h-4.5 ${isSelected ? 'text-white' : 'text-primary'}`} />
                                <span className="font-mono text-sm font-bold">{slot.display}</span>
                              </div>
                              <span className={`font-mono text-[9px] uppercase tracking-wider px-2 py-0.5 border rounded-full font-bold ${labelColor}`}>
                                {labelText}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center py-20 text-center text-on-surface-variant">
                        <CalendarIcon className="w-10 h-10 mb-4 opacity-30 text-primary" />
                        <p className="text-sm font-medium">Please select a date on the calendar first.</p>
                      </div>
                    )}
                  </Card>
                </div>
              </div>

              <div className="mt-8 flex justify-between max-w-5xl mx-auto border-t border-glass-stroke pt-6">
                <Button variant="secondary" onClick={() => setStep(1)} className="flex items-center gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </Button>
                <Button 
                  size="lg" 
                  onClick={() => setStep(3)}
                  disabled={!formData.date || !formData.time}
                  className={(!formData.date || !formData.time) ? 'opacity-40 cursor-not-allowed' : ''}
                >
                  Continue to Contact Details
                </Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="max-w-2xl mx-auto">
              <Card className="p-6 md:p-10 border border-glass-stroke">
                <h2 className="font-sans text-[26px] font-bold text-white mb-6 tracking-tight">Your Details</h2>
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
                        className="w-full px-4 py-3 bg-background border border-glass-stroke rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/60 transition-all placeholder:text-muted/50"
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
                        className="w-full px-4 py-3 bg-background border border-glass-stroke rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/60 transition-all placeholder:text-muted/50"
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
                        required
                        placeholder="+94 7X XXX XXXX"
                        className="w-full px-4 py-3 bg-background border border-glass-stroke rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/60 transition-all placeholder:text-muted/50"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block font-sans text-[14px] font-bold text-white mb-2 uppercase tracking-wide">
                        Special Requests (Optional)
                      </label>
                      <textarea
                        placeholder="Any movie request, celebration instructions, balloon color theme..."
                        className="w-full px-4 py-3 bg-background border border-glass-stroke rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/60 transition-all h-24 placeholder:text-muted/50 resize-none"
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="mt-10 flex justify-between border-t border-glass-stroke pt-6">
                    <Button variant="secondary" onClick={() => setStep(2)} className="flex items-center gap-2">
                      <ArrowLeft className="w-4 h-4" />
                      <span>Back</span>
                    </Button>
                    <Button size="lg" type="submit">Submit Booking & Proceed</Button>
                  </div>
                </form>
              </Card>
            </div>
          )}

          {step === 4 && createdBooking && (
            <div className="max-w-2xl mx-auto">
              <Card className="p-6 md:p-10 border border-glass-stroke">
                <div className="text-center mb-8 flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-4">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h2 className="font-sans text-[30px] font-bold text-white tracking-tight">
                    Booking Request Submitted!
                  </h2>
                  <p className="font-body text-[16px] text-on-surface-variant max-w-md mx-auto mt-2 leading-relaxed">
                    Your booking reference is <strong className="text-white font-mono">{createdBooking.id}</strong>. The slot is held in pending status.
                  </p>
                </div>

                {/* Bank details instruction */}
                <div className="bg-secondary/40 border border-glass-stroke rounded-2xl p-6 mb-8">
                  <h3 className="font-sans text-[16px] font-bold text-white mb-4 uppercase tracking-wide flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-primary" />
                    <span>Bank Transfer Payment Instructions</span>
                  </h3>
                  <p className="font-body text-xs text-on-surface-variant leading-relaxed mb-6">
                    To guarantee your reservation, please transfer the package cost within 15 minutes and upload your bank transfer receipt via WhatsApp below.
                  </p>
                  
                  <div className="space-y-3.5 text-sm font-mono border-t border-glass-stroke pt-4">
                    <div className="flex justify-between items-center py-1">
                      <span className="text-on-surface-variant">Bank Name:</span>
                      <span className="text-white font-semibold">Commercial Bank</span>
                    </div>
                    <div className="flex justify-between items-center py-1">
                      <span className="text-on-surface-variant">Account Number:</span>
                      <div className="flex items-center gap-2">
                        <span className="text-white font-semibold">1000 2345 6789</span>
                        <button 
                          onClick={() => copyToClipboard('100023456789')} 
                          className="text-primary hover:text-white transition-colors cursor-pointer"
                          aria-label="Copy account number"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                    <div className="flex justify-between items-center py-1">
                      <span className="text-on-surface-variant">Account Name:</span>
                      <span className="text-white font-semibold">NAXORA PVT LTD</span>
                    </div>
                    <div className="flex justify-between items-center py-1">
                      <span className="text-on-surface-variant">Amount Due:</span>
                      <span className="text-primary font-bold">{experience.price}</span>
                    </div>
                  </div>
                </div>

                {/* Summary */}
                <div className="border border-glass-stroke/40 rounded-xl p-5 mb-8">
                  <h4 className="font-sans text-[15px] font-bold text-white mb-3 uppercase tracking-wide">Summary</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-on-surface-variant">Experience:</span>
                      <span className="text-white font-semibold">{experience.title}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-on-surface-variant">Date:</span>
                      <span className="text-white font-mono">{createdBooking.booking_date}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-on-surface-variant">Time:</span>
                      <span className="text-white font-mono">
                        {TIME_SLOTS.find(ts => ts.time === createdBooking.booking_time)?.display || createdBooking.booking_time}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center border-t border-glass-stroke pt-6">
                  <Link href="/">
                    <Button variant="secondary" className="w-full sm:w-auto">Return Home</Button>
                  </Link>
                  <Button 
                    variant="primary" 
                    className="w-full sm:w-auto flex items-center justify-center gap-2"
                    onClick={triggerWhatsApp}
                  >
                    <MessageSquare className="w-5 h-5 fill-current" />
                    <span>Upload Receipt via WhatsApp</span>
                  </Button>
                </div>
              </Card>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default function ExperienceBookingPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background text-on-background flex items-center justify-center font-body text-[16px] text-on-surface-variant">
        Loading booking details...
      </div>
    }>
      <BookingFormContent />
    </Suspense>
  );
}