"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      // Simulate successful login and set cookie
      document.cookie = "admin_token=mock-token; path=/;";
      router.push('/admin/dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#031427] text-[#d3e4fe] flex items-center justify-center p-4 selection:bg-blue-500/30 overflow-hidden relative">
      <style dangerouslySetInnerHTML={{ __html: `
        .glass-card {
            background: rgba(15, 23, 42, 0.6);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            border: 1px solid rgba(255, 255, 255, 0.08);
            box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
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
          <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-blue-600/20">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
          </div>
          <h1 className="text-3xl font-semibold text-[#d3e4fe] tracking-tighter">PnP Academy</h1>
          <p className="text-sm text-[#c2c6d8] mt-2">Premium SaaS for Modern Authors</p>
        </div>
        
        {/* Login Card */}
        <div className="glass-card rounded-xl p-10 shimmer">
          <form className="space-y-4" onSubmit={handleLogin}>
            <div>
              <label className="block text-xs font-medium text-[#c2c6d8] mb-2 ml-1 uppercase tracking-widest" htmlFor="email">Email Address</label>
              <input className="w-full bg-[#1b2b3f]/50 border border-[#424656]/30 rounded-lg px-6 py-4 text-sm text-[#d3e4fe] placeholder:text-[#8c90a1] focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400 transition-all input-glow" id="email" name="email" placeholder="name@company.com" required type="email" />
            </div>
            <div>
              <div className="flex justify-between items-center mb-2 ml-1">
                <label className="block text-xs font-medium text-[#c2c6d8] uppercase tracking-widest" htmlFor="password">Password</label>
                <Link className="text-xs font-medium text-[#b3c5ff] hover:text-blue-500 transition-colors" href="#">Forgot password?</Link>
              </div>
              <input className="w-full bg-[#1b2b3f]/50 border border-[#424656]/30 rounded-lg px-6 py-4 text-sm text-[#d3e4fe] placeholder:text-[#8c90a1] focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400 transition-all input-glow" id="password" name="password" placeholder="••••••••" required type="password" />
            </div>
            <button className="w-full bg-blue-600 text-white text-xs font-medium py-4 rounded-lg hover:bg-blue-700 active:scale-[0.98] transition-all flex items-center justify-center gap-2 mt-6" type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
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
          
          {/* Divider */}
          <div className="relative my-10">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-[#424656]/30"></span>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-[#0b1c30] px-4 text-[#8c90a1] font-medium tracking-widest rounded-full border border-[#424656]/30">Or continue with</span>
            </div>
          </div>
          
          {/* SSO Options */}
          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-4 bg-[#1b2b3f]/30 border border-[#424656]/30 rounded-lg py-4 px-6 hover:bg-[#1b2b3f] transition-colors active:scale-[0.98]">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"></path>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
              </svg>
              <span className="text-xs font-medium text-[#d3e4fe]">Google</span>
            </button>
            <button className="flex items-center justify-center gap-4 bg-[#1b2b3f]/30 border border-[#424656]/30 rounded-lg py-4 px-6 hover:bg-[#1b2b3f] transition-colors active:scale-[0.98]">
              <svg className="w-5 h-5" fill="#0A66C2" viewBox="0 0 24 24">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"></path>
              </svg>
              <span className="text-xs font-medium text-[#d3e4fe]">LinkedIn</span>
            </button>
          </div>
        </div>
        
        {/* Footer */}
        <footer className="mt-10 text-center">
          <p className="text-sm text-[#c2c6d8]">
            Don't have an account? 
            <Link className="text-[#b3c5ff] font-bold hover:underline ml-1" href="/onboarding">Apply for Academy</Link>
          </p>
          <div className="flex items-center justify-center gap-6 mt-10 opacity-40">
            <Link className="text-xs font-medium text-[#c2c6d8] hover:text-[#d3e4fe]" href="#">Privacy</Link>
            <Link className="text-xs font-medium text-[#c2c6d8] hover:text-[#d3e4fe]" href="#">Terms</Link>
            <Link className="text-xs font-medium text-[#c2c6d8] hover:text-[#d3e4fe]" href="#">Contact</Link>
          </div>
        </footer>
      </main>
    </div>
  );
}
