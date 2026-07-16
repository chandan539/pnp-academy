
import React from 'react';
import Link from 'next/link';

export default async function ThankYouPage() {
  return (
    <div className="min-h-screen bg-[#031427] text-[#d3e4fe] flex flex-col items-center justify-center p-4 selection:bg-blue-500/30 overflow-hidden relative font-sans">
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
          <h1 className="text-4xl font-semibold text-[#d3e4fe] tracking-tighter mb-4">Details Submitted!</h1>
          <p className="text-base text-[#c2c6d8] leading-relaxed max-w-md mx-auto">
            Thank you for submitting your details. Your payment is confirmed and you are now officially part of the <span className="text-[#b3c5ff] font-medium">PnP Academy</span>. 
            We will notify you via email regarding the next steps.
          </p>
        </div>
        
        {/* Info Card */}
        <div className="glass-card rounded-xl p-8 mb-10 text-left">
          <h3 className="text-sm font-medium text-[#b3c5ff] mb-4 uppercase tracking-wider">What happens next?</h3>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <div className="mt-0.5 bg-[#1b2b3f] p-1 rounded text-blue-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              </div>
              <p className="text-sm text-[#d3e4fe]">Your author profile is currently being set up by our team (typically takes 24 hours).</p>
            </li>
            <li className="flex items-start gap-3">
              <div className="mt-0.5 bg-[#1b2b3f] p-1 rounded text-blue-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              </div>
              <p className="text-sm text-[#d3e4fe]">You will receive an email with login credentials to access your Author Dashboard.</p>
            </li>
            <li className="flex items-start gap-3">
              <div className="mt-0.5 bg-[#1b2b3f] p-1 rounded text-blue-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              </div>
              <p className="text-sm text-[#d3e4fe]">Our team will schedule a welcome call to guide you through the process.</p>
            </li>
          </ul>
        </div>
        
        <Link href="/" className="inline-flex items-center justify-center gap-2 text-sm font-medium text-[#b3c5ff] hover:text-white transition-colors bg-[#1b2b3f]/50 hover:bg-[#1b2b3f] px-6 py-3 rounded-lg border border-[#424656]/30">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
          Return to Home
        </Link>
      </main>
    </div>
  );
}
