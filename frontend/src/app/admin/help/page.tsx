import DashboardClient from "../dashboard/DashboardClient";
import React from "react";
import Link from "next/link";

export default function HelpPage() {
  return (
    <DashboardClient 
      authors={[]} 
      overrideTitle="Help & Documentation" 
      overrideSubtitle="Complete guidance on managing the P&P Academy system."
    >
      <div className="glass-panel p-8 rounded-xl max-w-5xl mx-auto w-full mb-12">
        <h3 className="text-2xl font-bold text-brand-text mb-6 border-b border-brand-primary/10 pb-4">Admin Dashboard Guide</h3>
        
        <div className="space-y-8">
          
          {/* Section 1: Overview */}
          <div className="bg-brand-light-bg p-6 rounded-lg border border-brand-primary/20 hover:border-brand-primary transition-colors">
            <h4 className="text-xl font-semibold text-brand-primary mb-3 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>
              1. Overview (Dashboard)
            </h4>
            <p className="text-sm text-brand-text/80 mb-3 leading-relaxed">
              The Overview section gives you a bird's-eye view of your entire operation. Here you can track how many authors have completed onboarding, view pending tasks, and see high-level statistics.
            </p>
            <ul className="list-disc list-inside text-sm text-brand-text/70 space-y-1 ml-2">
              <li><strong>KPI Metrics:</strong> Shows total registered authors, pending applications, and published works.</li>
              <li><strong>Quick Actions:</strong> Jump directly to adding a new team member or inviting an author.</li>
            </ul>
          </div>

          {/* Section 2: Team Access */}
          <div className="bg-brand-light-bg p-6 rounded-lg border border-brand-primary/20 hover:border-brand-primary transition-colors">
            <h4 className="text-xl font-semibold text-brand-primary mb-3 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
              2. Team Access
            </h4>
            <p className="text-sm text-brand-text/80 mb-3 leading-relaxed">
              Manage who has access to the admin backend. You can invite your internal team members and assign them roles.
            </p>
            <ul className="list-disc list-inside text-sm text-brand-text/70 space-y-1 ml-2">
              <li><strong>Super Admins:</strong> Have full control over settings, deletions, and billing.</li>
              <li><strong>Editors/Sales:</strong> Can manage authors and view reports, but cannot change global settings.</li>
              <li>To invite a team member, click "Add User" and enter their email and role.</li>
            </ul>
          </div>

          {/* Section 3: Authors */}
          <div className="bg-brand-light-bg p-6 rounded-lg border border-brand-primary/20 hover:border-brand-primary transition-colors">
            <h4 className="text-xl font-semibold text-brand-primary mb-3 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
              3. Authors
            </h4>
            <p className="text-sm text-brand-text/80 mb-3 leading-relaxed">
              The core CRM view for managing all registered authors who have completed the onboarding process.
            </p>
            <ul className="list-disc list-inside text-sm text-brand-text/70 space-y-1 ml-2">
              <li><strong>View Details:</strong> Click on an author to see their uploaded files, book title, target audience, and signatures.</li>
              <li><strong>CSV Import:</strong> If migrating from another system, click "Import CSV" to map legacy data into the CRM.</li>
              <li><strong>Deletion:</strong> Note that only Super Admins can permanently delete author records.</li>
            </ul>
          </div>

          {/* Section 4: Bulk Email */}
          <div className="bg-brand-light-bg p-6 rounded-lg border border-brand-primary/20 hover:border-brand-primary transition-colors">
            <h4 className="text-xl font-semibold text-brand-primary mb-3 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              4. Bulk Email
            </h4>
            <p className="text-sm text-brand-text/80 mb-3 leading-relaxed">
              Communicate with your authors efficiently using the Bulk Email tool. You can select specific segments of authors or email everyone at once.
            </p>
            <ul className="list-disc list-inside text-sm text-brand-text/70 space-y-1 ml-2">
              <li><strong>Provider Selection:</strong> The system sends emails via your default provider configured in Settings (either Brevo or Gmail SMTP).</li>
              <li><strong>Testing:</strong> Always use the "Send Test Email" feature to your own inbox before broadcasting to all authors.</li>
            </ul>
          </div>

          {/* Section 5: Security */}
          <div className="bg-brand-light-bg p-6 rounded-lg border border-brand-primary/20 hover:border-brand-primary transition-colors">
            <h4 className="text-xl font-semibold text-brand-primary mb-3 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="m9 12 2 2 4-4"/></svg>
              5. Security
            </h4>
            <p className="text-sm text-brand-text/80 mb-3 leading-relaxed">
              Monitor the safety of your platform. The Security page provides an audit log of who logged in, when, and from what IP address.
            </p>
            <ul className="list-disc list-inside text-sm text-brand-text/70 space-y-1 ml-2">
              <li><strong>Audit Logs:</strong> Tracks password changes, login attempts, and sensitive data exports.</li>
              <li><strong>Active Sessions:</strong> You can force-logout inactive sessions if a security breach is suspected.</li>
            </ul>
          </div>

          {/* Section 6: Pages */}
          <div className="bg-brand-light-bg p-6 rounded-lg border border-brand-primary/20 hover:border-brand-primary transition-colors">
            <h4 className="text-xl font-semibold text-brand-primary mb-3 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>
              6. Pages (Dynamic Marketing)
            </h4>
            <p className="text-sm text-brand-text/80 mb-3 leading-relaxed">
              Manage dynamic content pages like Terms of Service, Privacy Policy, or specific landing pages directly from the CRM.
            </p>
            <ul className="list-disc list-inside text-sm text-brand-text/70 space-y-1 ml-2">
              <li><strong>Rich Text Editor:</strong> Allows you to format content without knowing HTML.</li>
              <li><strong>Publishing Status:</strong> You can keep pages in "Draft" mode until they are ready to go live.</li>
            </ul>
          </div>

          {/* Section 7: Pre-Invites */}
          <div className="bg-brand-light-bg p-6 rounded-lg border border-brand-primary/20 hover:border-brand-primary transition-colors">
            <h4 className="text-xl font-semibold text-brand-primary mb-3 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" x2="19" y1="8" y2="14"/><line x1="22" x2="16" y1="11" y2="11"/></svg>
              7. Pre-Invites
            </h4>
            <p className="text-sm text-brand-text/80 mb-3 leading-relaxed">
              If an author has not yet made a payment but is interested, they fall into the Pre-Invites category. This is essentially your leads pipeline.
            </p>
            <ul className="list-disc list-inside text-sm text-brand-text/70 space-y-1 ml-2">
              <li><strong>Lead Conversion:</strong> Once a lead makes a payment, you can generate a unique invite link and send it directly to their email via this page.</li>
              <li><strong>Invite Links:</strong> Links are secure and one-time-use to prevent sharing.</li>
            </ul>
          </div>

          {/* Section 8: Reports */}
          <div className="bg-brand-light-bg p-6 rounded-lg border border-brand-primary/20 hover:border-brand-primary transition-colors">
            <h4 className="text-xl font-semibold text-brand-primary mb-3 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>
              8. Reports
            </h4>
            <p className="text-sm text-brand-text/80 mb-3 leading-relaxed">
              Visualize your data and monitor system integrations.
            </p>
            <ul className="list-disc list-inside text-sm text-brand-text/70 space-y-1 ml-2">
              <li><strong>Conversion Tracking:</strong> See how many pre-invites convert into fully registered authors.</li>
              <li><strong>Integration Logs:</strong> Check if emails sent via Brevo/SMTP were delivered, or if webhook transfers to Google Sheets failed.</li>
            </ul>
          </div>

          {/* Section 9: Settings */}
          <div className="bg-brand-light-bg p-6 rounded-lg border border-brand-primary/20 hover:border-brand-primary transition-colors">
            <h4 className="text-xl font-semibold text-brand-primary mb-3 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
              9. Settings & Branding
            </h4>
            <p className="text-sm text-brand-text/80 mb-3 leading-relaxed">
              The control center of your application. All configuration happens here.
            </p>
            <ul className="list-disc list-inside text-sm text-brand-text/70 space-y-1 ml-2">
              <li><strong>Branding:</strong> Upload your logo and set the Primary (Blue), Navy (Dark), and Accent (Yellow) colors. Changes reflect instantly across the entire platform.</li>
              <li><strong>Marketing:</strong> Insert your Google Analytics ID, Meta Pixel ID, and Meta CAPI token.</li>
              <li><strong>Email Credentials:</strong> Manage Brevo and Gmail SMTP app passwords.</li>
              <li><strong>Webhooks:</strong> Paste your Google Apps Script URL here to sync data to Sheets.</li>
            </ul>
          </div>
          
          {/* Section 10: Deep Dives */}
          <div className="bg-brand-white p-6 rounded-lg border border-[#1e293b] shadow-sm">
            <h4 className="text-xl font-semibold text-brand-text mb-4 border-b border-brand-primary/10 pb-2">Technical Deep Dives</h4>
            <div className="space-y-4">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-brand-light-bg rounded border border-brand-primary/10">
                <div>
                  <h5 className="font-semibold text-brand-primary">Meta Conversion API Setup</h5>
                  <p className="text-sm text-brand-text/70 mt-1">Detailed guide on generating tokens and verifying server-side events.</p>
                </div>
                <Link href="/admin/help/meta-conversion-api" className="mt-3 sm:mt-0 px-4 py-2 bg-brand-white border border-brand-primary/20 text-brand-primary text-sm font-medium rounded-md hover:bg-brand-light-bg transition-colors whitespace-nowrap">
                  View Guide
                </Link>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-start justify-between p-4 bg-brand-light-bg rounded border border-brand-primary/10">
                <div className="w-full">
                  <h5 className="font-semibold text-brand-primary mb-2">Google Sheets Webhook Script</h5>
                  <p className="text-sm text-brand-text/70 mb-3">Paste this into your Google Apps Script editor to sync incoming authors directly to a spreadsheet.</p>
                  <div className="bg-white p-4 rounded border border-brand-primary/10 text-xs font-mono text-brand-text/80 overflow-x-auto whitespace-pre">
{`function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);
    
    // Automatically add headers to the first row if the sheet is empty
    if (sheet.getLastRow() === 0) {
      var headers = Object.keys(data);
      sheet.appendRow(headers);
    }
    
    // Read the headers to map the incoming JSON data to the correct columns
    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    var rowData = headers.map(function(header) {
      return data[header] || "";
    });
    
    sheet.appendRow(rowData);
    
    return ContentService.createTextOutput(JSON.stringify({"status": "success"}))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({"error": error.message}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}`}
                  </div>
                </div>
              </div>

            </div>
          </div>
          
        </div>

        <div className="mt-12 pt-8 border-t border-brand-primary/20">
          <h3 className="text-xl font-bold text-brand-text mb-4">Need Support?</h3>
          <p className="text-sm text-brand-text/70">
            Contact the development team for deep technical issues that go beyond standard configuration.
          </p>
        </div>
      </div>
    </DashboardClient>
  );
}
