"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginClient({ websiteTitle }: { websiteTitle: string }) {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPending(true);
    setError('');

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email');
    const password = formData.get('password');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Failed to login');
      } else {
        router.push('/admin');
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-light-bg text-brand-white flex items-center justify-center p-4 selection:bg-brand-primary/30 overflow-hidden relative">
      <style dangerouslySetInnerHTML={{ __html: `
        .glass-card {
            background: rgba(255, 255, 255, 0.8);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            border: 1px solid rgba(0, 0, 0, 0.08);
            box-shadow: 0 20px 50px rgba(0, 0, 0, 0.05);
        }
        .glow-effect {
            position: absolute;
            width: 600px;
            height: 600px;
            background: radial-gradient(circle, rgba(0, 102, 255, 0.15) 0%, rgba(3, 20, 39, 0) 70%);
            border-radius: 100%;
            pointer-events: none;
            z-index: 0;
        }
        .input-glow:focus {
            box-shadow: 0 0 0 2px rgba(0, 102, 255, 0.2);
        }
        .shimmer {
            position: relative;
            overflow: hidden;
        }
        .shimmer::after {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: linear-gradient(
                to bottom right,
                rgba(255, 255, 255, 0) 0%,
                rgba(255, 255, 255, 0.05) 50%,
                rgba(255, 255, 255, 0) 100%
            );
            transform: rotate(45deg);
            animation: shimmer 6s infinite linear;
            pointer-events: none;
        }
        @keyframes shimmer {
            0% { transform: translate(-30%, -30%) rotate(45deg); }
            100% { transform: translate(30%, 30%) rotate(45deg); }
        }
      ` }} />

      {/* Ambient background effects */}
      <div className="glow-effect top-[-100px] right-[-100px]"></div>
      <div className="glow-effect bottom-[-100px] left-[-100px]"></div>
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
      
      <main className="relative z-10 w-full max-w-[420px]">
        {/* Brand Identity */}
        <div className="flex flex-col items-center mb-16">
          <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 text-brand-primary dark:text-brand-primary rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-blue-600/20 p-1">
            <img src="/api/branding/logo" alt="Logo" className="w-full h-full object-contain" />
          </div>
          <h1 className="text-3xl font-semibold text-brand-text tracking-tighter">{websiteTitle}</h1>
          <p className="text-sm text-brand-text/80 mt-2">Premium SaaS for Modern Authors</p>
        </div>
        
        {/* Login Card */}
        <div className="glass-card rounded-xl p-10 shimmer">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-xs font-medium text-brand-text/80 mb-2 ml-1 uppercase tracking-widest" htmlFor="email">Email Address</label>
              <input className="w-full bg-brand-white/50 border border-brand-primary/20/30 rounded-lg px-6 py-4 text-sm text-brand-text placeholder:text-brand-text/70 focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-brand-primary/40 transition-all input-glow relative z-20" id="email" name="email" placeholder="name@company.com" required type="email" />
            </div>
            <div>
              <div className="flex justify-between items-center mb-2 ml-1">
                <label className="block text-xs font-medium text-brand-text/80 uppercase tracking-widest" htmlFor="password">Password</label>
                <Link className="text-xs font-medium text-brand-primary hover:text-brand-primary transition-colors relative z-20" href="#">Forgot password?</Link>
              </div>
              <input className="w-full bg-brand-white/50 border border-brand-primary/20/30 rounded-lg px-6 py-4 text-sm text-brand-text placeholder:text-brand-text/70 focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-brand-primary/40 transition-all input-glow relative z-20" id="password" name="password" placeholder="••••••••" required type="password" />
            </div>
            
            {error && (
              <div className="text-red-600 text-xs font-medium text-center mt-2">
                {error}
              </div>
            )}
            
            <button className="w-full bg-brand-primary text-brand-white text-xs font-medium py-4 rounded-lg hover:bg-blue-700 active:scale-[0.98] transition-all flex items-center justify-center gap-2 mt-6 relative z-20" type="submit" disabled={isPending}>
              {isPending ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-brand-text" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                  Authenticating...
                </>
              ) : (
                <>
                  Sign In
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                </>
              )}
            </button>
          </form>
          
        </div>
        
        {/* Footer */}
        <footer className="mt-10 text-center">

          <div className="flex items-center justify-center gap-6 mt-10 opacity-40">
            <Link className="text-xs font-medium text-brand-text/80 hover:text-brand-text" href="#">Privacy</Link>
            <Link className="text-xs font-medium text-brand-text/80 hover:text-brand-text" href="#">Terms</Link>
            <Link className="text-xs font-medium text-brand-text/80 hover:text-brand-text" href="#">Contact</Link>
          </div>
        </footer>
      </main>
    </div>
  );
}
