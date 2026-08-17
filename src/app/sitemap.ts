import type { MetadataRoute } from 'next';
import { EXPERIENCES } from '@/lib/packages';
export default function sitemap(): MetadataRoute.Sitemap { const base = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'; return ['', '/#packages', '/about', '/contact', '/privacy', '/terms', ...EXPERIENCES.map((x) => `/packages/${x.id}`)].map((path) => ({ url: `${base}${path}`, changeFrequency: path.startsWith('/#packages') ? 'weekly' : 'monthly', priority: path === '' ? 1 : .7 })); }
