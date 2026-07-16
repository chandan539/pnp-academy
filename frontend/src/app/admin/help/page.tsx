import DashboardClient from "../dashboard/DashboardClient";
import React from "react";
import Link from "next/link";

export default function HelpPage() {
  return (
    <DashboardClient 
      authors={[]} 
      overrideTitle="Help & Resources" 
      overrideSubtitle="Documentation and resources for using PnP Academy systems."
    >
      <div className="glass-panel p-8 rounded-xl max-w-4xl mx-auto w-full">
        <h3 className="text-2xl font-bold text-brand-text mb-6">Platform Setup Guide</h3>
        
        <div className="space-y-6">
          <div className="bg-brand-light-bg p-6 rounded-lg border border-brand-primary/20">
            <h4 className="text-lg font-semibold text-brand-primary mb-2">1. Marketing Integrations</h4>
            <p className="text-sm text-brand-text/70 mb-4">
              To track conversions and user flow, go to the <strong>Settings</strong> page and configure your Meta Pixel, Google Analytics, and HubSpot tracking codes.
              These codes will automatically be injected into the public pages.
            </p>
            <Link href="/admin/help/meta-conversion-api" className="text-sm text-brand-primary hover:underline flex items-center gap-1 font-medium">
              View the Complete Meta Conversion API (CAPI) Setup Guideline
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
            </Link>
          </div>

          <div className="bg-brand-light-bg p-6 rounded-lg border border-brand-primary/20">
            <h4 className="text-lg font-semibold text-brand-primary mb-2">2. Email Delivery Setup</h4>
            <p className="text-sm text-brand-text/70 mb-4">
              The platform supports both Gmail SMTP and Brevo API for transactional and bulk emails. 
              Configure your credentials in the <strong>Settings</strong> page.
            </p>
            <ul className="list-disc list-inside text-sm text-brand-text/70 space-y-1">
              <li>For Gmail: Ensure you generate an App Password from your Google Account.</li>
              <li>For Brevo: Retrieve your v3 API Key from the Brevo developer console.</li>
            </ul>
          </div>

          <div className="bg-brand-light-bg p-6 rounded-lg border border-brand-primary/20">
            <h4 className="text-lg font-semibold text-brand-primary mb-2">3. Webhooks & Google Sheets (AppSheet)</h4>
            <p className="text-sm text-brand-text/70 mb-4">
              When an author submits the onboarding form, their data is instantly sent to the webhook URL provided in the <strong>Settings</strong> page.
            </p>
            <p className="text-sm text-brand-text/70 mb-2">
              <strong>To connect to Google Sheets directly:</strong>
            </p>
            <ol className="list-decimal list-inside text-sm text-brand-text/70 space-y-2 mb-4">
              <li>Open your Google Sheet, click <strong>Extensions &gt; Apps Script</strong>.</li>
              <li>Paste the script below into the editor.</li>
              <li>Click <strong>Deploy &gt; New deployment</strong>, select <strong>Web app</strong>.</li>
              <li>Set access to <strong>Anyone</strong>, and copy the Web App URL.</li>
              <li>Paste that URL into the <strong>Settings</strong> page of this dashboard.</li>
            </ol>
            <div className="bg-brand-light-bg p-4 rounded text-xs font-mono text-brand-primary overflow-x-auto whitespace-pre">
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
            <p className="text-xs text-brand-text/70 mt-4">
              The first time the webhook triggers on an empty sheet, it will automatically extract the JSON keys (e.g., FullName, Email, BookTitle) and create the column headers.
            </p>
          </div>

          <div className="bg-brand-light-bg p-6 rounded-lg border border-brand-primary/20">
            <h4 className="text-lg font-semibold text-brand-primary mb-2">4. Author Management & CSV Import</h4>
            <p className="text-sm text-brand-text/70 mb-4">
              Use the <strong>Authors</strong> tab to view all registered authors. You can import legacy data using the CSV upload feature. 
              Note: Only Super Admins can delete authors.
            </p>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-brand-primary/20">
          <h3 className="text-xl font-bold text-brand-text mb-4">Need Support?</h3>
          <p className="text-sm text-brand-text/70">
            Contact the IT team at support@pnpacademy.com for any technical issues.
          </p>
        </div>
      </div>
    </DashboardClient>
  );
}
