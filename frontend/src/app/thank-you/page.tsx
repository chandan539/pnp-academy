
import React from 'react';
import Link from 'next/link';
import { getSettings } from '@/app/actions/settings';

export default async function ThankYouPage() {
  const settings = await getSettings();
  const websiteTitle = settings.website_title || "PnP Academy";
  return (
    <div className="min-h-screen bg-brand-light-bg text-brand-text flex flex-col items-center justify-center p-4 selection:bg-brand-primary/30 overflow-hidden relative font-sans">
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
      ` }} />

      {/* Ambient background effects */}
      <div className="glow-effect top-[-100px] right-[-100px]"></div>
      <div className="glow-effect bottom-[-100px] left-[-100px]"></div>
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
      
      <main className="relative z-10 w-full max-w-lg text-center">
        {/* Brand Identity */}
        <div className="flex flex-col items-center mb-8">
          <Link href="/" className="flex items-center justify-center mb-6 transition-transform hover:scale-105">
            <img src="/api/branding/logo" alt={`${websiteTitle} Logo`} className="h-24 w-auto" />
          </Link>
          <h1 className="text-4xl font-semibold text-brand-text tracking-tighter mb-4">Details Submitted!</h1>
          <p className="text-base text-brand-text/80 leading-relaxed max-w-md mx-auto">
            Thank you for submitting your details. You are now officially part of <span className="text-brand-primary font-medium">{websiteTitle}</span>. 
            We will notify you via email regarding the next steps.
          </p>
        </div>
        
        {/* Info Card */}
        <div className="glass-card rounded-xl p-8 mb-10 text-left">
          <h3 className="text-sm font-medium text-brand-primary mb-4 uppercase tracking-wider">What happens next?</h3>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <div className="mt-0.5 bg-brand-white p-1 rounded text-brand-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              </div>
              <p className="text-sm text-brand-text">Your author profile is currently being set up by our team (typically takes 24 hours).</p>
            </li>
          </ul>
        </div>
      </main>
    </div>
  );
}
