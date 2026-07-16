"use client";

import React, { useState, useTransition } from 'react';
import { saveSettings } from '@/app/actions/settings';

export default function SettingsForm({ initialData }: { initialData: Record<string, string> }) {
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage('');
    const formData = new FormData(e.currentTarget);
    
    startTransition(async () => {
      const res = await saveSettings(formData);
      if (res.success) {
        setMessage('Settings saved successfully!');
        setTimeout(() => setMessage(''), 3000);
      } else {
        setMessage(res.error || 'Failed to save settings.');
      }
    });
  };

  const inputClasses = "w-full bg-brand-light-bg border border-brand-primary/20 rounded-md px-3 py-2.5 text-sm text-brand-text placeholder-[#4a5568] focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors";
  const labelClasses = "block text-sm font-medium text-brand-text/80 mb-1.5";
  const sectionClasses = "bg-brand-white border border-[#1e293b] rounded-xl overflow-hidden mb-6";
  const headerClasses = "px-6 py-4 border-b border-[#1e293b] bg-brand-white/50";
  const contentClasses = "p-6 space-y-6";

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto pb-12">
      
      {message && (
        <div className={`mb-6 p-4 rounded-md border flex items-center gap-3 ${message.includes('success') ? 'bg-green-500/10 border-green-500/20 text-green-400' : 'bg-red-500/10 border-red-500/20 text-red-400'}`}>
          {message.includes('success') ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          )}
          <span className="font-medium text-sm">{message}</span>
        </div>
      )}

      {/* General Preferences */}
      <div className={sectionClasses}>
        <div className={headerClasses}>
          <h3 className="font-semibold text-base text-brand-text">General Preferences</h3>
          <p className="text-xs text-brand-text/70 mt-1">Configure global application behavior.</p>
        </div>
        <div className={contentClasses}>
          <div>
            <label className={labelClasses}>Preferred Bulk Email Provider</label>
            <div className="relative w-full sm:w-1/2">
              <select name="preferred_email_service" defaultValue={initialData.preferred_email_service || 'BREVO'} className={`${inputClasses} appearance-none pr-10 cursor-pointer`}>
                <option value="BREVO">Brevo (Transactional API)</option>
                <option value="SMTP">Gmail SMTP (NodeMailer)</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-brand-text/70">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
              </div>
            </div>
            <p className="text-xs text-brand-text/70 mt-2">Select the default service used when sending batch emails to authors.</p>
          </div>
        </div>
      </div>

      {/* Marketing & Analytics */}
      <div className={sectionClasses}>
        <div className={headerClasses}>
          <h3 className="font-semibold text-base text-brand-text">Marketing & Analytics</h3>
          <p className="text-xs text-brand-text/70 mt-1">Manage tracking pixels, analytics IDs, and CRM integrations.</p>
        </div>
        <div className={contentClasses}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className={labelClasses}>Google Analytics ID</label>
              <input name="ga_code" defaultValue={initialData.ga_code || ''} placeholder="G-XXXXXXXXXX" className={inputClasses} />
            </div>
            <div>
              <label className={labelClasses}>Meta Pixel ID</label>
              <input name="fb_pixel_id" defaultValue={initialData.fb_pixel_id || ''} placeholder="123456789012345" className={inputClasses} />
            </div>
            <div>
              <label className={labelClasses}>Meta Conversions API Token</label>
              <input name="fb_capi_token" type="password" defaultValue={initialData.fb_capi_token || ''} placeholder="EAAB..." className={inputClasses} />
            </div>
            <div>
              <label className={labelClasses}>HubSpot Portal ID</label>
              <input name="hubspot_code" defaultValue={initialData.hubspot_code || ''} placeholder="HubSpot Identifier" className={inputClasses} />
            </div>
          </div>
        </div>
      </div>

      {/* Email Configurations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        
        {/* Bulk Email (SMTP) */}
        <div className={sectionClasses.replace('mb-6', 'h-full')}>
          <div className={headerClasses}>
            <h3 className="font-semibold text-base text-brand-text">Gmail SMTP Configuration</h3>
            <p className="text-xs text-brand-text/70 mt-1">Credentials for bulk emailing.</p>
          </div>
          <div className={contentClasses}>
            <div>
              <label className={labelClasses}>Send From Email</label>
              <input name="smtp_from_email" type="email" defaultValue={initialData.smtp_from_email || ''} placeholder="hello@pnpacademy.com" className={inputClasses} />
            </div>
            <div>
              <label className={labelClasses}>From Name</label>
              <input name="smtp_from_name" defaultValue={initialData.smtp_from_name || ''} placeholder="PnP Academy" className={inputClasses} />
            </div>
            <div>
              <label className={labelClasses}>Gmail App Password</label>
              <input name="gmail_smtp_password" type="password" defaultValue={initialData.gmail_smtp_password || ''} placeholder="16-character app password" className={inputClasses} />
            </div>
          </div>
        </div>

        {/* Transactional Email */}
        <div className={sectionClasses.replace('mb-6', 'h-full')}>
          <div className={headerClasses}>
            <h3 className="font-semibold text-base text-brand-text">Brevo API Configuration</h3>
            <p className="text-xs text-brand-text/70 mt-1">Credentials for transactional notifications.</p>
          </div>
          <div className={contentClasses}>
            <div>
              <label className={labelClasses}>Brevo API Key (v3)</label>
              <input name="brevo_api_key" type="password" defaultValue={initialData.brevo_api_key || ''} placeholder="xkeysib-..." className={inputClasses} />
            </div>
            <div>
              <label className={labelClasses}>Send From Email</label>
              <input name="brevo_from_email" type="email" defaultValue={initialData.brevo_from_email || ''} placeholder="notifications@pnpacademy.com" className={inputClasses} />
            </div>
            <div>
              <label className={labelClasses}>From Name</label>
              <input name="brevo_from_name" defaultValue={initialData.brevo_from_name || ''} placeholder="PnP Academy Notifications" className={inputClasses} />
            </div>
          </div>
        </div>
      </div>

      {/* Webhooks */}
      <div className={sectionClasses}>
        <div className={headerClasses}>
          <h3 className="font-semibold text-base text-brand-text">Webhooks</h3>
          <p className="text-xs text-brand-text/70 mt-1">Send author data to Google Sheets via Apps Script.</p>
        </div>
        <div className={contentClasses}>
          <div>
            <label className={labelClasses}>Apps Script Webhook URL</label>
            <input name="sheet_webhook_url" defaultValue={initialData.sheet_webhook_url || ''} placeholder="https://script.google.com/macros/s/.../exec" className={inputClasses} />
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <button 
          type="submit" 
          disabled={isPending}
          className="bg-brand-primary hover:bg-blue-700 text-brand-white font-medium py-2 px-6 rounded-md shadow-sm transition-colors disabled:opacity-50 flex items-center gap-2 text-sm"
        >
          {isPending ? (
            <>
              <svg className="animate-spin h-4 w-4 text-brand-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
              Saving...
            </>
          ) : (
            'Save Configuration'
          )}
        </button>
      </div>
    </form>
  );
}
