"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const nextStep = () => setStep(prev => Math.min(prev + 1, 3));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      nextStep();
      return;
    }
    
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
    }, 1200);
  };

  const slideVariants = {
    hidden: { x: 50, opacity: 0 },
    visible: { x: 0, opacity: 1 },
    exit: { x: -50, opacity: 0 }
  };

  return (
    <div className="min-h-screen bg-[#031427] text-[#d3e4fe] selection:bg-blue-500/30 font-sans">
      <style dangerouslySetInnerHTML={{ __html: `
        .glass-panel {
            background: rgba(16, 32, 52, 0.8);
            backdrop-filter: blur(12px);
            border: 1px solid rgba(66, 70, 86, 0.4);
        }
        .input-glow:focus {
            box-shadow: 0 0 0 2px rgba(0, 102, 255, 0.4);
            border-color: #b3c5ff;
        }
      ` }} />

      <div className="relative w-full min-h-screen overflow-x-hidden flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">
        <main className="relative z-10 w-full max-w-4xl">
          
          {/* Header Section */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#b3c5ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
              <h1 className="text-2xl font-semibold text-[#b3c5ff] tracking-tight">PnP Academy</h1>
            </div>
            <h2 className="text-3xl md:text-4xl font-semibold text-[#d3e4fe] mb-2">Author Onboarding</h2>
            <p className="text-sm text-[#c2c6d8] max-w-md mx-auto">
              Join our elite community of technical educators. Complete your profile to start publishing.
            </p>
          </div>

          {/* Stepper Component */}
          <div className="flex items-center justify-between mb-10 px-2 sm:px-12 max-w-2xl mx-auto">
            {[
              { num: 1, label: 'Identity' },
              { num: 2, label: 'Review' },
              { num: 3, label: 'Contract' }
            ].map((s, idx) => (
              <React.Fragment key={s.num}>
                <div className={`flex flex-col items-center gap-2 ${step >= s.num ? 'opacity-100' : 'opacity-50'}`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-colors ${
                    step >= s.num ? 'bg-blue-600 text-white' : 'border-2 border-[#424656] text-[#8c90a1]'
                  }`}>
                    {s.num}
                  </div>
                  <span className={`text-xs font-medium ${step >= s.num ? 'text-[#b3c5ff]' : 'text-[#8c90a1]'}`}>
                    {s.label}
                  </span>
                </div>
                {idx < 2 && (
                  <div className={`flex-1 h-[2px] mx-2 sm:mx-4 -mt-6 transition-colors ${
                    step > s.num ? 'bg-blue-600' : 'bg-[#424656]'
                  }`} />
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Form Container */}
          <div className="glass-panel rounded-2xl p-6 md:p-12 shadow-2xl overflow-hidden">
            <form onSubmit={handleSubmit} className="space-y-8 relative">
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div 
                    key="step1"
                    variants={slideVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center gap-2 border-b border-[#424656]/30 pb-2 mb-6">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#b3c5ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                      <h3 className="text-xl font-medium">Personal Information</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="flex flex-col gap-2">
                        <label className="text-xs font-medium text-[#c2c6d8]" htmlFor="full_name">Full Name</label>
                        <input required className="bg-[#102034] border border-[#424656] text-[#d3e4fe] rounded-xl p-4 text-sm focus:outline-none input-glow transition-all" id="full_name" placeholder="Johnathan Doe" type="text" />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-xs font-medium text-[#c2c6d8]" htmlFor="mobile_number">Mobile Number</label>
                        <input required className="bg-[#102034] border border-[#424656] text-[#d3e4fe] rounded-xl p-4 text-sm focus:outline-none input-glow transition-all" id="mobile_number" placeholder="+1 (555) 000-0000" type="tel" />
                      </div>
                      <div className="flex flex-col gap-2 md:col-span-2">
                        <label className="text-xs font-medium text-[#c2c6d8]" htmlFor="email_id">Email ID</label>
                        <input required className="bg-[#102034] border border-[#424656] text-[#d3e4fe] rounded-xl p-4 text-sm focus:outline-none input-glow transition-all" id="email_id" placeholder="john.doe@example.com" type="email" />
                      </div>
                      <div className="flex flex-col gap-2 md:col-span-2">
                        <label className="text-xs font-medium text-[#c2c6d8]" htmlFor="address">Address with PIN Code</label>
                        <textarea required className="bg-[#102034] border border-[#424656] text-[#d3e4fe] rounded-xl p-4 text-sm focus:outline-none input-glow transition-all resize-none" id="address" placeholder="123 Creator Lane, Tech Hub, 94103" rows={3}></textarea>
                      </div>
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div 
                    key="step2"
                    variants={slideVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center gap-2 border-b border-[#424656]/30 pb-2 mb-6">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#b3c5ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                      <h3 className="text-xl font-medium">Nominee Information</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="flex flex-col gap-2">
                        <label className="text-xs font-medium text-[#c2c6d8]" htmlFor="nominee_name">Nominee Full Name</label>
                        <input required className="bg-[#102034] border border-[#424656] text-[#d3e4fe] rounded-xl p-4 text-sm focus:outline-none input-glow transition-all" id="nominee_name" placeholder="Jane Doe" type="text" />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-xs font-medium text-[#c2c6d8]" htmlFor="relation">Relation with Nominee</label>
                        <select required className="bg-[#102034] border border-[#424656] text-[#d3e4fe] rounded-xl p-4 text-sm focus:outline-none input-glow transition-all appearance-none" id="relation" defaultValue="">
                          <option disabled value="">Select relation</option>
                          <option value="spouse">Spouse</option>
                          <option value="parent">Parent</option>
                          <option value="sibling">Sibling</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div 
                    key="step3"
                    variants={slideVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center gap-2 border-b border-[#424656]/30 pb-2 mb-6">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#b3c5ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 8h20"/><path d="M6 16h.01"/></svg>
                      <h3 className="text-xl font-medium">Banking Details</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="flex flex-col gap-2 md:col-span-2">
                        <label className="text-xs font-medium text-[#c2c6d8]" htmlFor="holder_name">Bank Account Holder Name</label>
                        <input required className="bg-[#102034] border border-[#424656] text-[#d3e4fe] rounded-xl p-4 text-sm focus:outline-none input-glow transition-all" id="holder_name" placeholder="Name as per Bank Records" type="text" />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-xs font-medium text-[#c2c6d8]" htmlFor="account_number">Account Number</label>
                        <input required className="bg-[#102034] border border-[#424656] text-[#d3e4fe] rounded-xl p-4 text-sm focus:outline-none input-glow transition-all" id="account_number" placeholder="•••• •••• ••••" type="password" />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-xs font-medium text-[#c2c6d8]" htmlFor="ifsc_code">IFSC Code</label>
                        <input required className="bg-[#102034] border border-[#424656] text-[#d3e4fe] rounded-xl p-4 text-sm focus:outline-none input-glow transition-all" id="ifsc_code" placeholder="PNPA0001234" type="text" />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Action Buttons */}
              <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 mt-8">
                {step > 1 ? (
                  <button onClick={prevStep} type="button" className="w-full md:w-auto px-8 py-3 border border-[#424656] text-[#d3e4fe] rounded-xl text-xs font-medium hover:bg-[#1b2b3f] transition-all active:scale-[0.98]">
                    Back
                  </button>
                ) : (
                  <div></div> // Spacer
                )}
                
                <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
                  <button type="button" className="w-full md:w-auto px-8 py-3 border border-[#424656] text-[#d3e4fe] rounded-xl text-xs font-medium hover:bg-[#1b2b3f] transition-all active:scale-[0.98]">
                    Save as Draft
                  </button>
                  <button 
                    type="submit" 
                    disabled={isLoading || isSuccess}
                    className={`w-full md:w-auto px-10 py-3 rounded-xl text-xs font-medium text-white transition-all active:scale-[0.98] flex items-center justify-center gap-2 ${
                      isSuccess ? 'bg-green-600' : 'bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/20'
                    }`}
                  >
                    {isLoading ? (
                       <>
                         <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                         Saving...
                       </>
                    ) : isSuccess ? (
                      <>
                        Success
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                      </>
                    ) : (
                      <>
                        {step === 3 ? 'Submit Application' : 'Save and Continue'}
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* Footer Help */}
          <div className="mt-10 text-center">
            <p className="text-sm text-[#c2c6d8]">
              Need help? <a className="text-[#b3c5ff] hover:underline underline-offset-4" href="#">Contact Academy Support</a> or <a className="text-[#b3c5ff] hover:underline underline-offset-4" href="#">View Onboarding Guide</a>
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}
