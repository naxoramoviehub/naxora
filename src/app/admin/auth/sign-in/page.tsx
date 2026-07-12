import type { Metadata } from 'next';
import Link from 'next/link';
import AuthForm from '@/components/admin/AuthForm';
export const metadata: Metadata = { title: 'Admin sign in', robots: { index: false, follow: false } };
export default function Page() { return <main className="min-h-screen bg-background px-5 py-16 text-white"><div className="mx-auto max-w-md"><Link href="/" className="mb-10 block text-center text-2xl font-extrabold gradient-text">NAXORA</Link><div className="rounded-3xl border border-glass-stroke bg-surface-elevated/50 p-7 shadow-2xl"><p className="mb-2 text-xs font-bold uppercase tracking-[.2em] text-primary">Protected portal</p><h1 className="mb-2 text-3xl font-bold">Administrator sign in</h1><p className="mb-8 text-on-surface-variant">Manage reservations using your authorized NAXORA account.</p><AuthForm mode="sign-in" /></div></div></main>; }
