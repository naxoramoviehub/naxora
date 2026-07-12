'use client';

import { useActionState, useState } from 'react';
import Link from 'next/link';
import { Eye, EyeOff, KeyRound, Mail, UserRound } from 'lucide-react';
import { signIn, signUp, type AuthState } from '@/app/admin/auth/actions';

function FieldIcon({ children }: { children: React.ReactNode }) {
  return <span className="pointer-events-none absolute left-4 top-[46px] text-slate-500">{children}</span>;
}

export default function AuthForm({ mode }: { mode: 'sign-in' | 'sign-up' }) {
  const action = mode === 'sign-in' ? signIn : signUp;
  const [state, formAction, pending] = useActionState<AuthState, FormData>(action, undefined);
  const [signupStep, setSignupStep] = useState<'request' | 'complete'>('request');
  const [showPassword, setShowPassword] = useState(false);
  const input = 'w-full rounded-xl border border-white/10 bg-[#111a2b] px-11 py-3.5 text-[15px] text-white outline-none transition placeholder:text-slate-600 hover:border-white/20 focus:border-primary focus:ring-4 focus:ring-primary/10';
  return <form action={formAction} className="space-y-5" aria-describedby="auth-status">
    {mode === 'sign-up' && <>
      <div className="grid grid-cols-2 rounded-xl bg-black/20 p-1" role="tablist" aria-label="Registration step">
        <button type="button" role="tab" aria-selected={signupStep === 'request'} onClick={() => setSignupStep('request')} className={`rounded-lg px-3 py-2.5 text-sm font-bold transition ${signupStep === 'request' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-on-surface-variant hover:text-white'}`}>1. Request access</button>
        <button type="button" role="tab" aria-selected={signupStep === 'complete'} onClick={() => setSignupStep('complete')} className={`rounded-lg px-3 py-2.5 text-sm font-bold transition ${signupStep === 'complete' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-on-surface-variant hover:text-white'}`}>2. Complete signup</button>
      </div>
      <input type="hidden" name="intent" value={signupStep} />
    </>}

    <label className="relative block text-sm font-medium text-slate-200">Email address<FieldIcon><Mail className="h-4 w-4" /></FieldIcon><input className={`${input} mt-2`} name="email" type="email" autoComplete="email" placeholder="you@example.com" required /></label>

    {mode === 'sign-up' && signupStep === 'complete' && <label className="relative block text-sm font-medium text-slate-200">One-time invite code<FieldIcon><KeyRound className="h-4 w-4" /></FieldIcon><input className={`${input} mt-2 uppercase tracking-[.18em]`} name="inviteCode" autoComplete="one-time-code" placeholder="Not needed for primary super admin" maxLength={32} /><span className="mt-1.5 block text-xs text-slate-500">Use the code from your approval email. It expires after 24 hours.</span></label>}
    {mode === 'sign-up' && signupStep === 'complete' && <label className="relative block text-sm font-medium text-slate-200">Username<FieldIcon><UserRound className="h-4 w-4" /></FieldIcon><input className={`${input} mt-2`} name="username" autoComplete="username" placeholder="your_username" required minLength={5} pattern="[a-zA-Z0-9_-]+" /><span className="mt-1.5 block text-xs text-slate-500">Minimum 5 characters. Letters, numbers, underscores and hyphens only.</span></label>}
    {(mode === 'sign-in' || signupStep === 'complete') && <label className="relative block text-sm font-medium text-slate-200">Password<FieldIcon><KeyRound className="h-4 w-4" /></FieldIcon><input className={`${input} mt-2 pr-12`} name="password" type={showPassword ? 'text' : 'password'} autoComplete={mode === 'sign-up' ? 'new-password' : 'current-password'} placeholder={mode === 'sign-up' ? 'At least 8 characters' : 'Your password'} required minLength={8} /><button type="button" onClick={() => setShowPassword((value) => !value)} className="absolute right-3 top-[39px] rounded-lg p-2 text-slate-500 hover:text-white" aria-label={showPassword ? 'Hide password' : 'Show password'}>{showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}</button></label>}
    {mode === 'sign-up' && signupStep === 'complete' && <label className="relative block text-sm font-medium text-slate-200">Confirm password<FieldIcon><KeyRound className="h-4 w-4" /></FieldIcon><input className={`${input} mt-2`} name="confirmPassword" type={showPassword ? 'text' : 'password'} autoComplete="new-password" placeholder="Enter the password again" required minLength={8} /></label>}

    <div id="auth-status" aria-live="polite">{state?.error && <p className="rounded-xl border border-red-400/15 bg-red-500/10 p-3.5 text-sm leading-relaxed text-red-300">{state.error}</p>}{state?.message && <p className="rounded-xl border border-emerald-400/15 bg-emerald-500/10 p-3.5 text-sm leading-relaxed text-emerald-300">{state.message}</p>}</div>
    <button disabled={pending} className="w-full rounded-xl bg-gradient-to-r from-primary to-primary-container px-5 py-3.5 font-bold text-white shadow-lg shadow-primary/20 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60">{pending ? 'Please wait…' : mode === 'sign-in' ? 'Sign in securely' : signupStep === 'request' ? 'Send approval request' : 'Create administrator account'}</button>
    <p className="text-center text-sm text-on-surface-variant">{mode === 'sign-in' ? <>Need administrator access? <Link className="font-semibold text-primary hover:underline" href="/admin/auth/sign-up">Request access</Link></> : <>Already registered? <Link className="font-semibold text-primary hover:underline" href="/admin/auth/sign-in">Sign in</Link></>}</p>
  </form>;
}
