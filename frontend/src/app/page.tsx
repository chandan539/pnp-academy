import Link from "next/link";
import { ArrowRight, UserPlus, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";

import { getDynamicPage } from '@/app/actions/pages';

export default async function Home() {
  const dynamicPage = await getDynamicPage('home');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col items-center justify-center relative overflow-hidden">
      <div className="flex-grow w-full flex flex-col items-center justify-center p-6 relative">
        {/* Background decoration */}
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-brand-secondary/10 rounded-full blur-3xl" />

        <main className="max-w-3xl w-full text-center space-y-8 relative z-10">
          
          <div className="space-y-4">
            <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80 mb-6">
              PnP Academy V1.0
            </div>
            
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white">
              Premium Book Publishing Services <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600">
                For Limited Premium Authors
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto pt-4 leading-relaxed">
              By invitation only. A complete Author CRM, Workflow Automation, and Marketing Integration Platform tailored for elite authors.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-16 text-left">
            <div className="p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-brand-secondary rounded-xl flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
              </div>
              <h3 className="font-bold text-lg mb-2">Author CRM</h3>
              <p className="text-muted-foreground text-sm">Manage the complete author lifecycle from a single, unified dashboard.</p>
            </div>
            
            <div className="p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-xl flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
              </div>
              <h3 className="font-bold text-lg mb-2">Workflow Automation</h3>
              <p className="text-muted-foreground text-sm">Automate PDFs, QR codes, and team notifications instantly.</p>
            </div>

            <div className="p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-xl flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
              </div>
              <h3 className="font-bold text-lg mb-2">Marketing Sync</h3>
              <p className="text-muted-foreground text-sm">Built-in tracking for Meta CAPI, Google Analytics, and HubSpot.</p>
            </div>
          </div>
        </main>
      </div>
      <div className="w-full">
        <Footer />
      </div>
    </div>
  );
}
