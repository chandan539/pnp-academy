"use client";

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { submitApplication } from '@/app/actions/onboarding';

export default function OnboardingClient({ inviteEmail, inviteToken, websiteTitle = "Premium Author Program" }: { inviteEmail: string, inviteToken: string, websiteTitle?: string }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formRef.current && !formRef.current.checkValidity()) {
      formRef.current.reportValidity();
      return;
    }
    
    setErrorMsg('');
    setIsLoading(true);
    
    const formData = new FormData(e.currentTarget);
    formData.append('currentUrl', window.location.href);
    formData.append('inviteToken', inviteToken);

    // We no longer have the agreement step, so we append these manually to bypass server checks
    formData.append('termsAccepted', 'true');
    formData.append('privacyAccepted', 'true');

    const result = await submitApplication(formData);

    setIsLoading(false);

    if (result.success) {
      setIsSuccess(true);
      
      // Call Server-Side Conversion API
      try {
        await fetch('/api/conversion', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            eventName: 'ApplicationSubmitted',
            eventData: {
              email: inviteEmail,
              fullName: formData.get('fullName')
            },
            sourceUrl: window.location.href
          })
        });
      } catch (err) {
        console.error('Failed to log conversion', err);
      }

      setTimeout(() => {
        router.push('/thank-you');
      }, 500);
    } else {
      setErrorMsg(result.error || 'Failed to save application');
    }
  };

  return (
    <div className="min-h-screen bg-brand-light-bg text-brand-white selection:bg-brand-primary/30 font-sans">
      <style dangerouslySetInnerHTML={{ __html: `
        .glass-panel {
            background: rgba(255, 255, 255, 0.8);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            border: 1px solid rgba(0, 0, 0, 0.08);
            box-shadow: 0 20px 50px rgba(0, 0, 0, 0.05);
        }
        .input-glow:focus {
            box-shadow: 0 0 0 2px rgba(0, 102, 255, 0.4);
            border-color: #b3c5ff;
        }
      ` }} />

      <div className="relative w-full min-h-screen overflow-x-hidden flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">
        <main className="relative z-10 w-full max-w-5xl">
          
          {/* Header Section */}
          <div className="text-center mb-10">
            <div className="flex justify-center mb-6">
              <img src="/api/branding/logo" alt={`${websiteTitle} Logo`} className="h-24 w-auto" />
            </div>
            <h2 className="text-3xl md:text-4xl font-semibold text-brand-text mb-2">Author Onboarding</h2>
            <p className="text-sm text-brand-text/80 max-w-md mx-auto">
              Welcome! Please complete your profile below to start publishing for {websiteTitle}.
            </p>
          </div>

          {/* Form Container */}
          <div className="glass-panel rounded-2xl p-6 md:p-12 shadow-2xl overflow-hidden">
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-12">
              
              {/* Personal Information */}
              <div className="space-y-6">
                <h3 className="text-xl font-medium border-b border-brand-primary/20/30 pb-2">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-medium text-brand-text/80">Full Name *</label>
                    <input name="fullName" required className="bg-brand-light-bg border border-brand-primary/20 text-brand-text rounded-xl p-4 text-sm focus:outline-none input-glow" placeholder="Johnathan Doe" type="text" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-medium text-brand-text/80">Email ID (Invited) *</label>
                    <input name="emailId" required readOnly value={inviteEmail} className="bg-brand-white border border-brand-primary/20 text-brand-text/70 cursor-not-allowed rounded-xl p-4 text-sm focus:outline-none" type="email" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-medium text-brand-text/80">Mobile Number *</label>
                    <input name="mobileNumber" required className="bg-brand-light-bg border border-brand-primary/20 text-brand-text rounded-xl p-4 text-sm focus:outline-none input-glow" placeholder="+1 (555) 000-0000" type="tel" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-medium text-brand-text/80">WhatsApp Number</label>
                    <input name="whatsappNumber" className="bg-brand-light-bg border border-brand-primary/20 text-brand-text rounded-xl p-4 text-sm focus:outline-none input-glow" placeholder="Optional" type="tel" />
                  </div>
                  <div className="flex flex-col gap-2 md:col-span-2">
                    <label className="text-xs font-medium text-brand-text/80">Address *</label>
                    <textarea name="address" required className="bg-brand-light-bg border border-brand-primary/20 text-brand-text rounded-xl p-4 text-sm focus:outline-none input-glow resize-none" rows={3}></textarea>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-medium text-brand-text/80">City</label>
                    <input name="city" className="bg-brand-light-bg border border-brand-primary/20 text-brand-text rounded-xl p-4 text-sm focus:outline-none input-glow" type="text" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-medium text-brand-text/80">Country</label>
                    <input name="country" className="bg-brand-light-bg border border-brand-primary/20 text-brand-text rounded-xl p-4 text-sm focus:outline-none input-glow" type="text" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-medium text-brand-text/80">Company Name</label>
                    <input name="companyName" className="bg-brand-light-bg border border-brand-primary/20 text-brand-text rounded-xl p-4 text-sm focus:outline-none input-glow" type="text" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-medium text-brand-text/80">Occupation</label>
                    <input name="occupation" className="bg-brand-light-bg border border-brand-primary/20 text-brand-text rounded-xl p-4 text-sm focus:outline-none input-glow" type="text" />
                  </div>
                </div>
              </div>

              {/* Nominee Details */}
              <div className="space-y-6">
                <h3 className="text-xl font-medium border-b border-brand-primary/20/30 pb-2">Nominee Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-medium text-brand-text/80">Nominee Full Name *</label>
                    <input name="nomineeName" required className="bg-brand-light-bg border border-brand-primary/20 text-brand-text rounded-xl p-4 text-sm focus:outline-none input-glow" type="text" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-medium text-brand-text/80">Relation *</label>
                    <select name="relation" required className="bg-brand-light-bg border border-brand-primary/20 text-brand-text rounded-xl p-4 text-sm focus:outline-none input-glow appearance-none">
                      <option value="">Select relation</option>
                      <option value="Spouse">Spouse</option>
                      <option value="Parent">Parent</option>
                      <option value="Sibling">Sibling</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-medium text-brand-text/80">Nominee Mobile</label>
                    <input name="nomineeMobile" className="bg-brand-light-bg border border-brand-primary/20 text-brand-text rounded-xl p-4 text-sm focus:outline-none input-glow" type="tel" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-medium text-brand-text/80">Nominee Email</label>
                    <input name="nomineeEmail" className="bg-brand-light-bg border border-brand-primary/20 text-brand-text rounded-xl p-4 text-sm focus:outline-none input-glow" type="email" />
                  </div>
                </div>
              </div>

              {/* Banking Details */}
              <div className="space-y-6">
                <h3 className="text-xl font-medium border-b border-brand-primary/20/30 pb-2">Banking Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2 md:col-span-2">
                    <label className="text-xs font-medium text-brand-text/80">Account Holder Name *</label>
                    <input name="holderName" required className="bg-brand-light-bg border border-brand-primary/20 text-brand-text rounded-xl p-4 text-sm focus:outline-none input-glow" type="text" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-medium text-brand-text/80">Account Number *</label>
                    <input name="accountNumber" required className="bg-brand-light-bg border border-brand-primary/20 text-brand-text rounded-xl p-4 text-sm focus:outline-none input-glow" type="text" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-medium text-brand-text/80">IFSC Code (11 Characters) *</label>
                    <input name="ifscCode" required maxLength={11} minLength={11} pattern="^[A-Za-z]{4}0[A-Za-z0-9]{6}$" title="IFSC must be 11 characters, starting with 4 letters, then a 0, followed by 6 alphanumeric characters" className="bg-brand-light-bg border border-brand-primary/20 text-brand-text rounded-xl p-4 text-sm focus:outline-none input-glow uppercase" type="text" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-medium text-brand-text/80">Bank Name *</label>
                    <input name="bankName" required className="bg-brand-light-bg border border-brand-primary/20 text-brand-text rounded-xl p-4 text-sm focus:outline-none input-glow" type="text" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-medium text-brand-text/80">Branch *</label>
                    <input name="branch" required className="bg-brand-light-bg border border-brand-primary/20 text-brand-text rounded-xl p-4 text-sm focus:outline-none input-glow" type="text" />
                  </div>
                </div>
              </div>

              {errorMsg && (
                <div className="bg-red-500/10 border border-red-500/30 text-red-600 p-4 rounded-xl text-sm mb-4">
                  {errorMsg}
                </div>
              )}

              {/* Action Buttons */}
              <div className="pt-8 flex flex-col md:flex-row items-center justify-end mt-8 border-t border-brand-primary/20/30">
                <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
                  <button 
                    type="submit" 
                    disabled={isLoading || isSuccess}
                    className={`w-full md:w-auto px-10 py-3 rounded-xl text-xs font-medium text-brand-white transition-all flex items-center justify-center gap-2 ${
                      isSuccess ? 'bg-green-600' : 'bg-brand-primary hover:bg-brand-primary-dark'
                    }`}
                  >
                    {isLoading ? 'Processing...' : isSuccess ? 'Success' : 'Submit Application'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}
