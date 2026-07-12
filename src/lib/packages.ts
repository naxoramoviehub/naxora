export type PackageCategory = 'cinema' | 'gaming' | 'celebration';
export interface Experience {
  id: string; title: string; description: string; price: number; duration: string;
  capacity: number; extraHour: number; image: string; category: PackageCategory;
  categoryLabel: string; features: string[];
}

export const EXPERIENCES: Experience[] = [
  { id:'mini-cabin', title:'Mini Cabin Suite', description:'Intimate private lounge perfect for couples or small groups.', price:2350, duration:'2.5 Hours', capacity:3, extraHour:900, image:'/image-from-rawpixel-id-12136149-jpeg.jpg', category:'cinema', categoryLabel:'Cinema', features:['Netflix / YouTube HD','Comfortable Sofa Cabin','1080p Laser Projector','5.1 Positional Audio'] },
  { id:'elite-silver', title:'Elite Silver Suite', description:'Enhanced screen size and audio fidelity for a cinematic experience.', price:2550, duration:'3 Hours', capacity:4, extraHour:900, image:'/image-from-rawpixel-id-14510238-jpeg.jpg', category:'cinema', categoryLabel:'Cinema', features:['Netflix / YouTube HD','Premium Leather Recliners','Full HD Projector System','5.1 Surround Sound Array'] },
  { id:'gold', title:'Gold VIP Cabin', description:'Complete luxury with climate-control air conditioning and 4K resolution.', price:3000, duration:'3 Hours', capacity:4, extraHour:1000, image:'/gold_vip_cabin.png', category:'cinema', categoryLabel:'Cinema & Gaming', features:['Climate A/C Control','Premium Reclining Sofa','Native 4K Projector Screen','7.1 Positional Audio Setup'] },
  { id:'platinum', title:'Platinum Gamer Suite', description:'High-performance console gaming paired with cinematic movie streaming.', price:3450, duration:'3 Hours', capacity:4, extraHour:1000, image:'/image-from-rawpixel-id-12373169-png.png', category:'gaming', categoryLabel:'Gaming Focus', features:['PS5 / PS4 Pro Console','4 Wireless Controllers','Climate A/C Control','7.1 Sound & 4K Projector'] },
  { id:'royal', title:'Royal VIP Suite', description:'A generous suite for family viewings and group co-op gaming.', price:5300, duration:'3 Hours', capacity:6, extraHour:1300, image:'/image-from-rawpixel-id-15201674-jpeg.jpg', category:'celebration', categoryLabel:'Celebration VIP', features:['VIP Lounge Seating','PS5 Console / PS4 Pro','Large 4K Laser Screen','7.1 Positional Audio Setup'] },
  { id:'lite-celebration', title:'Lite Celebration Package', description:'Ideal for surprise birthdays and intimate milestones.', price:6250, duration:'3 Hours', capacity:6, extraHour:1600, image:'/gold_vip_cabin.png', category:'celebration', categoryLabel:'Celebration Focus', features:['Balloon & Banner Setup','Pro Wireless Karaoke Mics','PS5 / PS4 Pro System','Beverages & Catering Space'] },
  { id:'grand-celebration', title:'Grand Celebration Package', description:'Our complete party package with extended duration and decorations.', price:8950, duration:'4 Hours', capacity:8, extraHour:1900, image:'/f21b86159275023.639b110867040.jpg', category:'celebration', categoryLabel:'Celebration Focus', features:['Full Balloon Theme Decor','Extended 4-Hour Block','Wireless Dual Karaoke Mics','PS5 Console + Games Suite','Complimentary Snack Tray'] },
];

export const getExperience = (id: string) => EXPERIENCES.find((item) => item.id === id);
export const formatLkr = (amount: number) => `${amount.toLocaleString('en-LK')} LKR`;
