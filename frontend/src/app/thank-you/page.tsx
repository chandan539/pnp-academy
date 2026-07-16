
import React from 'react';
import Link from 'next/link';

export default async function ThankYouPage() {
  return (
    <div className="min-h-screen bg-brand-primary-dark text-brand-white flex flex-col items-center justify-center p-4 selection:bg-brand-secondary/30 overflow-hidden relative font-sans">
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
      ` }} />

      {/* Ambient background effects */}
      <div className="glow-effect top-[-100px] right-[-100px]"></div>
      <div className="glow-effect bottom-[-100px] left-[-100px]"></div>
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
      
      <main className="relative z-10 w-full max-w-lg text-center">
        {/* Brand Identity */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-green-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-green-600/20">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
          </div>
          <h1 className="text-4xl font-semibold text-brand-white tracking-tighter mb-4">Details Submitted!</h1>
          <p className="text-base text-brand-light-bg leading-relaxed max-w-md mx-auto">
            Thank you for submitting your details. You are now officially part of the <span className="text-brand-secondary font-medium">PnP Academy</span>. 
            We will notify you via email regarding the next steps.
          </p>
        </div>
        
        {/* Info Card */}
        <div className="glass-card rounded-xl p-8 mb-10 text-left">
          <h3 className="text-sm font-medium text-brand-secondary mb-4 uppercase tracking-wider">What happens next?</h3>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <div className="mt-0.5 bg-brand-primary p-1 rounded text-brand-secondary">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              </div>
              <p className="text-sm text-brand-white">Your author profile is currently being set up by our team (typically takes 24 hours).</p>
            </li>
          </ul>
        </div>
      </main>
    </div>
  );
}
