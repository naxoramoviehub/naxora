import type { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle2, LockKeyhole, MailCheck, ShieldCheck } from 'lucide-react';
import AuthForm from '@/components/admin/AuthForm';

export const metadata: Metadata = { title: 'Request administrator access', robots: { index: false, follow: false } };

export default function Page() {
  return <main id="main-content" className="relative min-h-screen overflow-hidden bg-[#050914] px-5 py-8 text-white sm:py-12">
    <div aria-hidden className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(139,92,246,.12),transparent_30%),radial-gradient(circle_at_85%_80%,rgba(34,211,238,.08),transparent_28%)]" />
    <div className="relative mx-auto max-w-5xl">
      <Link href="/" className="mb-8 inline-flex items-center gap-3 font-sans text-2xl font-extrabold tracking-tight sm:mb-10"><span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-primary to-tertiary text-sm text-white">N</span><span className="gradient-text">NAXORA</span></Link>
      <div className="grid overflow-hidden rounded-[28px] border border-white/10 bg-[#0b1220]/95 shadow-2xl shadow-black/40 lg:grid-cols-[.9fr_1.1fr]">
        <section className="relative border-b border-white/10 bg-gradient-to-br from-primary/15 via-[#0c1324] to-tertiary/5 p-7 sm:p-10 lg:border-b-0 lg:border-r">
          <p className="mb-4 text-xs font-bold uppercase tracking-[.22em] text-tertiary">Controlled access</p>
          <h1 className="max-w-sm font-sans text-3xl font-bold leading-tight sm:text-4xl">Join the NAXORA administration team.</h1>
          <p className="mt-5 max-w-md leading-relaxed text-on-surface-variant">Administrator accounts can view customer bookings and payment receipts, so every new account is reviewed by the super admin.</p>
          <ol className="mt-8 space-y-5">
            <li className="flex gap-4"><span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary/15 text-sm font-bold text-primary">1</span><div><h2 className="font-semibold">Request access</h2><p className="mt-1 text-sm text-slate-400">Submit only your email address. No password is requested or retained.</p></div></li>
            <li className="flex gap-4"><span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary/15 text-sm font-bold text-primary">2</span><div><h2 className="font-semibold">Wait for approval</h2><p className="mt-1 text-sm text-slate-400">The super admin reviews your request and emails a one-time code.</p></div></li>
            <li className="flex gap-4"><span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary/15 text-sm font-bold text-primary">3</span><div><h2 className="font-semibold">Complete registration</h2><p className="mt-1 text-sm text-slate-400">Enter the code, choose a username, and create your private password.</p></div></li>
          </ol>
          <div className="mt-9 grid grid-cols-3 gap-3 border-t border-white/10 pt-6 text-center text-xs text-slate-400"><span><ShieldCheck className="mx-auto mb-2 h-5 w-5 text-tertiary" />Approved</span><span><MailCheck className="mx-auto mb-2 h-5 w-5 text-tertiary" />Email verified</span><span><LockKeyhole className="mx-auto mb-2 h-5 w-5 text-tertiary" />Protected</span></div>
        </section>
        <section className="p-7 sm:p-10 lg:p-12">
          <div className="mb-7 flex items-start gap-3"><CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-primary" /><div><p className="text-xs font-bold uppercase tracking-[.2em] text-primary">Administrator enrollment</p><h2 className="mt-2 text-2xl font-bold">Get started</h2><p className="mt-2 text-sm leading-relaxed text-on-surface-variant">Choose the correct step below. The primary super admin can go directly to Complete signup without a code.</p></div></div>
          <AuthForm mode="sign-up" />
        </section>
      </div>
      <p className="mt-6 text-center text-xs text-slate-600">Authorized NAXORA personnel only. Access activity may be monitored.</p>
    </div>
  </main>;
}
