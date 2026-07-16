"use client";

import React, { useState, useTransition } from "react";
import { sendBulkEmail } from "@/app/actions/email";

export default function BulkEmailClient() {
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  async function handleSend(formData: FormData) {
    setMessage(null);
    startTransition(async () => {
      const result = await sendBulkEmail(formData);
      if (result.success) {
        setMessage({ type: "success", text: `Successfully sent to ${result.count} authors!` });
        (document.getElementById("bulk-email-form") as HTMLFormElement)?.reset();
      } else {
        setMessage({ type: "error", text: result.error || "Failed to send." });
      }
    });
  }

  return (
    <div className="bg-[#0b1c30] border border-brand-primary/50 rounded-xl p-8 max-w-4xl">
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-brand-white">Bulk Email Campaigns</h3>
        <p className="text-[#8c90a1] text-sm mt-1">
          Send a broadcast email to all registered authors. Uses your Preferred Provider from Settings.
        </p>
      </div>

      {message && (
        <div className={`p-4 rounded-lg mb-6 text-sm font-medium ${message.type === 'success' ? 'bg-[#b3c5ff]/10 text-brand-secondary border border-[#b3c5ff]/20' : 'bg-[#ffb4ab]/10 text-[#ffb4ab] border border-[#ffb4ab]/20'}`}>
          {message.text}
        </div>
      )}

      <form id="bulk-email-form" action={handleSend} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-brand-light-bg mb-2">Subject Line</label>
          <input 
            type="text" 
            name="subject" 
            required
            placeholder="e.g., Important Update for Authors"
            className="w-full bg-brand-primary border border-brand-primary/50 rounded-lg px-4 py-3 text-sm focus:ring-1 focus:ring-blue-400 focus:border-blue-400 outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-brand-light-bg mb-2">Email Body (HTML supported)</label>
          <textarea 
            name="body" 
            required
            rows={12}
            placeholder="<p>Hello authors...</p>"
            className="w-full bg-brand-primary border border-brand-primary/50 rounded-lg px-4 py-3 text-sm focus:ring-1 focus:ring-blue-400 focus:border-blue-400 outline-none custom-scrollbar"
          />
          <p className="text-xs text-[#8c90a1] mt-2">You can use standard HTML tags like &lt;b&gt;, &lt;a&gt;, &lt;p&gt;, etc.</p>
        </div>

        <div className="pt-4 border-t border-brand-primary/30 flex justify-end">
          <button 
            type="submit" 
            disabled={isPending}
            className="px-8 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 active:scale-95 transition-all disabled:opacity-50 flex items-center gap-2"
          >
            {isPending ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                Sending...
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                Send Broadcast
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
