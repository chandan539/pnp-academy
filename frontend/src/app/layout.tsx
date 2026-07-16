import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Analytics from "@/components/Analytics";
import { Suspense } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();
  return {
    title: settings.website_title || "PnP Academy",
    description: "Premium SaaS for Modern Authors",
    icons: {
      icon: '/api/branding/favicon',
    }
  };
}

import { getSettings } from "@/app/actions/settings";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSettings();
  
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <style dangerouslySetInnerHTML={{
          __html: `
            :root {
              ${settings.brand_primary ? `--primary: ${settings.brand_primary};` : ''}
              ${settings.brand_primary_dark ? `--primary-dark: ${settings.brand_primary_dark};` : ''}
              ${settings.brand_accent ? `--accent: ${settings.brand_accent};` : ''}
            }
          `
        }} />
      </head>
      <body className="min-h-full flex flex-col">
        {children}
        <Suspense fallback={null}>
          <Analytics 
            gaId={settings.ga_code} 
            fbPixelId={settings.fb_pixel_id} 
            hubspotCode={settings.hubspot_code} 
          />
        </Suspense>
      </body>
    </html>
  );
}
