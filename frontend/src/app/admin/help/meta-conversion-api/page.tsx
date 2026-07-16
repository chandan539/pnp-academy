import DashboardClient from "../../dashboard/DashboardClient";
import React from "react";
import Link from "next/link";

export default function MetaCapiGuidelinePage() {
  return (
    <DashboardClient 
      authors={[]} 
      overrideTitle="Meta Conversion API Guideline" 
      overrideSubtitle="Complete guide to setting up and testing the Meta Conversion API (CAPI)"
    >
      <div className="glass-panel p-8 rounded-xl max-w-4xl mx-auto w-full">
        
        <div className="flex items-center gap-4 mb-8">
          <Link href="/admin/help" className="text-sm text-brand-primary hover:underline flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
            Back to Help
          </Link>
        </div>

        <h3 className="text-2xl font-bold text-brand-text mb-6">Complete Guideline for Meta Conversion API Setup</h3>
        
        <div className="space-y-6">
          <div className="bg-brand-light-bg p-6 rounded-lg border border-brand-primary/20">
            <h4 className="text-lg font-semibold text-brand-primary mb-2">1. Prerequisites</h4>
            <ul className="list-disc list-inside text-sm text-brand-text/70 space-y-2">
              <li>A Facebook Business Manager account.</li>
              <li>An active Meta Pixel configured for your domain.</li>
              <li>A Meta App (for generating the access token).</li>
            </ul>
          </div>

          <div className="bg-brand-light-bg p-6 rounded-lg border border-brand-primary/20">
            <h4 className="text-lg font-semibold text-brand-primary mb-2">2. Generate the CAPI Access Token</h4>
            <ol className="list-decimal list-inside text-sm text-brand-text/70 space-y-2 mb-4">
              <li>Go to <strong>Events Manager</strong> in your Meta Business Manager.</li>
              <li>Select your Pixel from the Data Sources list.</li>
              <li>Go to the <strong>Settings</strong> tab.</li>
              <li>Scroll down to the <strong>Conversions API</strong> section.</li>
              <li>Under "Set up manually", click <strong>Generate access token</strong>.</li>
              <li>Copy the generated token securely. You will need to paste this into the application settings.</li>
            </ol>
          </div>

          <div className="bg-brand-light-bg p-6 rounded-lg border border-brand-primary/20">
            <h4 className="text-lg font-semibold text-brand-primary mb-2">3. Retrieve your Pixel ID</h4>
            <ol className="list-decimal list-inside text-sm text-brand-text/70 space-y-2 mb-4">
              <li>In the <strong>Events Manager</strong>, stay on the Settings tab of your Data Source.</li>
              <li>Copy your <strong>Dataset ID</strong> (Pixel ID), which is a sequence of numbers (e.g., 123456789012345).</li>
            </ol>
          </div>

          <div className="bg-brand-light-bg p-6 rounded-lg border border-brand-primary/20">
            <h4 className="text-lg font-semibold text-brand-primary mb-2">4. Configure Application Settings</h4>
            <ol className="list-decimal list-inside text-sm text-brand-text/70 space-y-2 mb-4">
              <li>Navigate to the <Link href="/admin/settings" className="text-brand-primary underline">Settings</Link> tab in your PnP Academy Dashboard.</li>
              <li>Locate the <strong>Meta Pixel / CAPI</strong> section.</li>
              <li>Paste your <strong>Pixel ID</strong> and your <strong>CAPI Access Token</strong> into the respective fields.</li>
              <li>Save changes. The system will now automatically send server-side events for key actions (e.g., Onboarding Form Submissions, Payments).</li>
            </ol>
          </div>

          <div className="bg-brand-light-bg p-6 rounded-lg border border-brand-primary/20">
            <h4 className="text-lg font-semibold text-brand-primary mb-2">5. Testing and Validation (Test Event Code)</h4>
            <p className="text-sm text-brand-text/70 mb-4">
              To verify that the server-side events are reaching Meta, you should use a Test Event Code.
            </p>
            <ol className="list-decimal list-inside text-sm text-brand-text/70 space-y-2 mb-4">
              <li>In Meta <strong>Events Manager</strong>, go to the <strong>Test events</strong> tab.</li>
              <li>Select <strong>Confirm that your server's events are set up correctly</strong>.</li>
              <li>Copy the <strong>Test Event Code</strong> (e.g., TEST45678).</li>
              <li>In the PnP Academy Dashboard <Link href="/admin/settings" className="text-brand-primary underline">Settings</Link> page, paste this code into the <strong>Test Event Code</strong> field (if available) or temporarily add it to your API calls.</li>
              <li>Perform a test action on your live site (e.g., submit a form).</li>
              <li>Check the Events Manager. The event should appear with the method listed as "Server".</li>
            </ol>
          </div>

          <div className="bg-brand-light-bg p-6 rounded-lg border border-brand-primary/20">
            <h4 className="text-lg font-semibold text-brand-primary mb-2">6. Event Deduplication</h4>
            <p className="text-sm text-brand-text/70 mb-4">
              To ensure events sent from both the browser (Meta Pixel) and the server (CAPI) do not double-count, the application automatically handles deduplication. Both the client and server send the exact same <strong>Event ID</strong> (e.g., generated UUID) and <strong>Event Name</strong> for each action. Meta matches these parameters and keeps only one instance of the event.
            </p>
          </div>
        </div>

      </div>
    </DashboardClient>
  );
}
