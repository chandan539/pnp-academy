"use client";

import React, { useEffect, useState } from 'react';
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  Users, Search, Bell, Settings, FileText, Activity, 
  HelpCircle, MoreVertical, LayoutDashboard, Send,
  LogOut, ShieldCheck, Mail, BookOpen, UserPlus
} from "lucide-react";
import { createAndSendInvite } from '@/app/actions/invites';
import { getCurrentUser } from '@/app/actions/profile';

const navItems = [
  { icon: LayoutDashboard, label: "Overview", href: "/admin/dashboard" },
  { icon: Users, label: "Team Access", href: "/admin/users" },
  { icon: BookOpen, label: "Authors", href: "/admin/authors" },
  { icon: Mail, label: "Bulk Email", href: "/admin/bulk-email" },
  { icon: ShieldCheck, label: "Security", href: "/admin/security" },
  { icon: FileText, label: "Pages", href: "/admin/pages" },
  { icon: UserPlus, label: "Pre-Invites", href: "/admin/pre-invites" },
  { icon: Activity, label: "Reports", href: "/admin/reports" },
];

export default function DashboardClient({ 
  authors,
  stats,
  overrideTitle,
  overrideSubtitle,
  children
}: { 
  authors: any[];
  stats?: { total: number; pending: number; approved: number; published: number };
  overrideTitle?: string;
  overrideSubtitle?: string;
  children?: React.ReactNode;
}) {
  const [profileOpen, setProfileOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  
  // Invite Modal State
  const [inviteModalOpen, setInviteModalOpen] = useState(false);
  const [inviteName, setInviteName] = useState('');
  const [inviteEmail, setInviteEmail] = useState('');
  const [isInviting, setIsInviting] = useState(false);
  const [inviteMessage, setInviteMessage] = useState('');
  const [inviteError, setInviteError] = useState('');
  const [inviteUrl, setInviteUrl] = useState('');
  
  const [currentUser, setCurrentUser] = useState<{name?: string|null, email?: string|null, role?: string|null} | null>(null);

  useEffect(() => {
    getCurrentUser().then(user => {
      if (user) setCurrentUser(user);
    });
  }, []);
  
  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteEmail) return;
    setIsInviting(true);
    setInviteMessage('');
    setInviteError('');
    setInviteUrl('');
    
    // Pass name as well if we add it to the action later, for now just email
    const res = await createAndSendInvite(inviteEmail);
    if (res.success) {
      setInviteMessage(`Invite successfully processed for ${inviteEmail}.`);
      if (res.inviteUrl) {
        setInviteUrl(res.inviteUrl);
      } else {
        setInviteName('');
        setInviteEmail('');
        setTimeout(() => {
          setInviteModalOpen(false);
          setInviteMessage('');
        }, 2000);
      }
    } else {
      setInviteError(res.error || 'Failed to send invite');
    }
    setIsInviting(false);
  };

  const copyInviteLink = () => {
    navigator.clipboard.writeText(inviteUrl);
    setInviteMessage('Link copied to clipboard!');
  };

  return (
    <div className="bg-brand-primary-dark text-brand-white min-h-screen font-sans selection:bg-blue-600/30 selection:text-white">
      <style dangerouslySetInnerHTML={{ __html: `
        .glass-panel {
            background: rgba(15, 23, 42, 0.8);
            backdrop-filter: blur(12px);
            border: 1px solid rgba(30, 41, 59, 0.5);
        }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 10px; }
        .sparkline-path { stroke-dasharray: 1000; stroke-dashoffset: 1000; animation: draw 2s ease-out forwards; }
        @keyframes draw { to { stroke-dashoffset: 0; } }
      ` }} />

      {/* Sidebar Navigation */}
      <aside className={`hidden lg:flex flex-col h-screen fixed left-0 top-0 bg-[#0b1c30] border-r border-brand-primary shadow-sm z-50 transition-all duration-300 ${isSidebarCollapsed ? 'w-20' : 'w-64'}`}>
        <div className={`p-6 flex items-center ${isSidebarCollapsed ? 'justify-center px-0' : 'gap-4'}`}>
          <div className="w-10 h-10 rounded-lg bg-blue-600 flex-shrink-0 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
          </div>
          {!isSidebarCollapsed && (
            <div className="overflow-hidden whitespace-nowrap">
              <h1 className="text-xl font-bold text-brand-secondary leading-tight">PnP Academy</h1>
              <p className="text-[10px] uppercase tracking-widest text-[#8c90a1]">Premium SaaS</p>
            </div>
          )}
        </div>
        
        <nav className="flex-1 mt-6 px-4 space-y-2 overflow-y-auto custom-scrollbar">
          {navItems.map((item, index) => {
            const Icon = item.icon;
            if (item.label === "Bulk Email") {
              return (
                <React.Fragment key={item.label}>
                  <div className={`pt-6 pb-2 font-bold text-[#8c90a1] uppercase tracking-wider ${isSidebarCollapsed ? 'text-center text-[8px]' : 'px-4 text-[10px]'}`}>
                    System
                  </div>
                  <Link href={item.href} className={`flex items-center gap-4 py-3 rounded-lg text-brand-light-bg hover:bg-brand-primary transition-colors group ${isSidebarCollapsed ? 'justify-center px-0' : 'px-4'}`} title={item.label}>
                    <Icon className="flex-shrink-0" width={20} height={20} />
                    {!isSidebarCollapsed && <span className="text-sm font-medium">{item.label}</span>}
                  </Link>
                </React.Fragment>
              );
            }
            return (
              <Link key={item.label} href={item.href} className={`flex items-center gap-4 py-3 rounded-lg text-brand-light-bg hover:bg-brand-primary transition-colors group ${isSidebarCollapsed ? 'justify-center px-0' : 'px-4'}`} title={item.label}>
                <Icon className="flex-shrink-0" width={20} height={20} />
                {!isSidebarCollapsed && <span className="text-sm font-medium">{item.label}</span>}
              </Link>
            );
          })}
        </nav>
        
        <div className="p-4 border-t border-brand-primary/30 space-y-4 mt-auto">
          <button 
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)} 
            className={`w-full flex items-center ${isSidebarCollapsed ? 'justify-center' : 'justify-between px-4'} py-2 text-[#8c90a1] hover:text-brand-white transition-colors mb-2`}
            title="Toggle Sidebar"
          >
            {!isSidebarCollapsed && <span className="text-xs font-semibold uppercase tracking-wider">Collapse</span>}
            <svg className={`transform transition-transform ${isSidebarCollapsed ? 'rotate-180' : ''}`} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"></polyline></svg>
          </button>

          <button 
            onClick={() => setInviteModalOpen(true)}
            className={`w-full bg-blue-600/10 text-brand-secondary border border-blue-600/20 text-xs font-bold py-3 rounded-lg hover:bg-blue-600 hover:text-white active:scale-[0.98] transition-all flex items-center justify-center gap-2 ${isSidebarCollapsed ? 'px-0' : 'px-4'}`}
            title="Invite Author"
          >
            <svg className="flex-shrink-0" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" y1="8" x2="19" y2="14"/><line x1="22" y1="11" x2="16" y2="11"/></svg>
            {!isSidebarCollapsed && <span>Quick Invite</span>}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className={`transition-all duration-300 min-h-screen flex flex-col ${isSidebarCollapsed ? 'lg:ml-20' : 'lg:ml-64'}`}>
        {/* Top Navigation Bar */}
        <header className="sticky top-0 z-40 flex justify-between items-center px-6 py-4 w-full bg-brand-primary-dark/80 backdrop-blur-md border-b border-brand-primary/30 shadow-md">
          <div className="flex items-center gap-6 flex-1">
            <div className="relative max-w-md w-full hidden sm:block">
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8c90a1]" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              <input className="w-full bg-[#0b1c30] border border-brand-primary/50 rounded-lg pl-12 pr-4 py-2 text-sm text-brand-white focus:ring-1 focus:ring-blue-400 focus:border-blue-400 outline-none" placeholder="Search analytics, authors, or reports..." type="text" />
            </div>
            <div className="hidden lg:flex items-center gap-6">
              {/* Top navigation removed as per request */}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="w-10 h-10 flex items-center justify-center rounded-full text-brand-light-bg hover:bg-[#102034] transition-colors relative">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
              <span className="absolute top-2 right-2 w-2 h-2 bg-[#ffb4ab] rounded-full border border-[#031427]"></span>
            </button>
            <div className="h-8 w-[1px] bg-[#424656]/30 mx-2"></div>
            <div className="relative">
              <button 
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 lg:gap-3 p-1.5 lg:p-2 bg-[#0b1c35] hover:bg-[#0f2442] border border-blue-500/20 rounded-full lg:rounded-xl transition-all"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-brand-secondary to-indigo-500 flex items-center justify-center text-white font-medium text-sm shadow-inner">
                  {currentUser?.name ? currentUser.name.substring(0, 2).toUpperCase() : 'AD'}
                </div>
                <div className="hidden lg:block text-left mr-2">
                  <p className="text-sm font-medium text-white leading-tight">{currentUser?.name || 'Administrator'}</p>
                  <p className="text-xs text-blue-200/50 mt-0.5">{currentUser?.role?.replace('_', ' ') || 'Admin'}</p>
                </div>
                <svg className={`w-4 h-4 text-[#8c90a1] transition-transform ${profileOpen ? 'rotate-180' : ''}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
              </button>

              {/* Profile Dropdown */}
              {profileOpen && (
                <div className="absolute right-0 mt-3 w-56 glass-panel border border-brand-primary/50 rounded-xl shadow-2xl py-2 z-50 transform origin-top-right transition-all">
                  <div className="px-4 py-3 border-b border-brand-primary/30 mb-2">
                    <p className="text-sm font-bold text-brand-white">{currentUser?.name || 'Administrator'}</p>
                    <p className="text-xs text-[#8c90a1] truncate">{currentUser?.email || 'admin@example.com'}</p>
                  </div>
                  
                  <Link href="/admin/settings" className="flex items-center gap-3 px-4 py-2 text-sm text-brand-light-bg hover:bg-[#102034] hover:text-brand-secondary transition-colors">
                    <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                    My Profile
                  </Link>
                  <Link href="/admin/settings" className="flex items-center gap-3 px-4 py-2 text-sm text-brand-light-bg hover:bg-[#102034] hover:text-brand-secondary transition-colors">
                    <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
                    Account Settings
                  </Link>
                  
                  <div className="my-2 border-t border-brand-primary/30"></div>
                  
                  <button 
                    onClick={async () => {
                      await fetch('/api/auth/logout', { method: 'POST' });
                      window.location.href = '/login';
                    }}
                    className="w-full flex items-center gap-3 px-4 py-2 text-sm text-[#ffb4ab] hover:bg-red-500/10 transition-colors text-left font-medium"
                  >
                    <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Dashboard Canvas */}
        <div className="p-6 md:p-10 space-y-10 max-w-[1600px] mx-auto w-full">
          {/* Page Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h2 className="text-4xl font-semibold text-brand-white">{overrideTitle || "Dashboard"}</h2>
              <p className="text-brand-light-bg text-base mt-2">{overrideSubtitle || "Welcome back. Here's what's happening in the academy today."}</p>
            </div>
            <div className="flex gap-4">
              <button className="px-6 py-3 rounded-lg border border-brand-primary hover:bg-[#102034] transition-all flex items-center gap-2 text-xs font-medium">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                Last 30 Days
              </button>
              <button className="px-6 py-3 rounded-lg bg-blue-600 text-white shadow-lg shadow-blue-600/20 hover:bg-blue-700 active:scale-95 transition-all flex items-center gap-2 text-xs font-medium">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                Export Data
              </button>
            </div>
          </div>

          {children ? (
            children
          ) : (
            <>
              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Total Authors */}
                <div className="glass-panel p-6 rounded-xl group hover:border-[#b3c5ff]/50 transition-all duration-500">
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-10 h-10 rounded-lg bg-[#b3c5ff]/10 flex items-center justify-center text-brand-secondary">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                    </div>
                  </div>
                  <p className="text-[#8c90a1] text-xs font-medium uppercase tracking-wider">Total Authors</p>
                  <h3 className="text-3xl font-semibold text-brand-white mt-2 transition-colors">{stats?.total || 0}</h3>
                  <div className="mt-6 h-12 w-full overflow-hidden">
                    <svg className="w-full h-full preserve-3d" viewBox="0 0 100 40">
                      <path className="text-brand-secondary sparkline-path" d="M0,35 Q10,15 20,25 T40,10 T60,30 T80,5 T100,20" fill="none" stroke="currentColor" strokeWidth="2" />
                    </svg>
                  </div>
                </div>

                {/* Pending Card */}
                <div className="glass-panel p-6 rounded-xl group hover:border-[#ffb59d]/50 transition-all duration-500">
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-10 h-10 rounded-lg bg-[#ffb59d]/10 flex items-center justify-center text-[#ffb59d]">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                    </div>
                  </div>
                  <p className="text-[#8c90a1] text-xs font-medium uppercase tracking-wider">Pending Enrollments</p>
                  <h3 className="text-3xl font-semibold text-brand-white mt-2">{stats?.pending || 0}</h3>
                  <div className="mt-6 h-12 w-full overflow-hidden">
                    <svg className="w-full h-full" viewBox="0 0 100 40">
                      <path className="text-[#ffb59d] sparkline-path" d="M0,20 Q15,35 30,15 T50,25 T70,5 T100,30" fill="none" stroke="currentColor" strokeWidth="2" />
                    </svg>
                  </div>
                </div>

                {/* Approved Card */}
                <div className="glass-panel p-6 rounded-xl group hover:border-[#bec6e0]/50 transition-all duration-500">
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-10 h-10 rounded-lg bg-[#bec6e0]/10 flex items-center justify-center text-[#bec6e0]">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                    </div>
                  </div>
                  <p className="text-[#8c90a1] text-xs font-medium uppercase tracking-wider">Approved Authors</p>
                  <h3 className="text-3xl font-semibold text-brand-white mt-2">{stats?.approved || 0}</h3>
                  <div className="mt-6 h-12 w-full overflow-hidden">
                    <svg className="w-full h-full" viewBox="0 0 100 40">
                      <path className="text-[#bec6e0] sparkline-path" d="M0,30 Q20,5 40,20 T60,10 T80,35 T100,5" fill="none" stroke="currentColor" strokeWidth="2" />
                    </svg>
                  </div>
                </div>

                {/* Published Card */}
                <div className="glass-panel p-6 rounded-xl group hover:border-blue-600/50 transition-all duration-500">
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-10 h-10 rounded-lg bg-blue-600/10 flex items-center justify-center text-blue-500">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>
                    </div>
                  </div>
                  <p className="text-[#8c90a1] text-xs font-medium uppercase tracking-wider">Published Books</p>
                  <h3 className="text-3xl font-semibold text-brand-white mt-2">{stats?.published || 0}</h3>
                  <div className="mt-6 h-12 w-full overflow-hidden">
                    <svg className="w-full h-full" viewBox="0 0 100 40">
                      <path className="text-blue-500 sparkline-path" d="M0,38 Q10,30 25,35 T45,15 T75,25 T100,5" fill="none" stroke="currentColor" strokeWidth="2" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Bento Layout Section */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Today's Authors Table */}
                <div className="lg:col-span-12 glass-panel rounded-xl flex flex-col overflow-hidden">
                  <div className="p-6 border-b border-brand-primary/30 flex justify-between items-center">
                    <h4 className="text-2xl font-semibold text-brand-white">Recent Submissions</h4>
                    <Link href="/admin/authors" className="text-brand-secondary text-xs font-medium hover:underline">View All</Link>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-[#0b1c30]/50">
                          <th className="px-6 py-4 text-xs font-medium text-[#8c90a1] uppercase tracking-wider">Author</th>
                          <th className="px-6 py-4 text-xs font-medium text-[#8c90a1] uppercase tracking-wider">Status</th>
                          <th className="px-6 py-4 text-xs font-medium text-[#8c90a1] uppercase tracking-wider">Course / Book</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#424656]/20">
                        {authors.length === 0 ? (
                          <tr>
                            <td colSpan={3} className="px-6 py-8 text-center text-sm text-[#8c90a1]">No authors found.</td>
                          </tr>
                        ) : authors.map((author) => (
                          <tr key={author.id} className="hover:bg-[#102034]/30 transition-colors">
                            <td className="px-6 py-4 flex items-center gap-4">
                              <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
                                {author.fullName?.substring(0, 2).toUpperCase() || 'NA'}
                              </div>
                              <div>
                                <p className="text-sm text-brand-white font-medium">{author.fullName}</p>
                                <p className="text-[11px] text-[#8c90a1]">{author.emailId}</p>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <span className={`inline-flex items-center px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border ${
                                author.status === 'SUBMITTED' ? 'bg-[#ffb59d]/10 text-[#ffb59d] border-[#ffb59d]/20' : 
                                'bg-[#b3c5ff]/10 text-brand-secondary border-[#b3c5ff]/20'
                              }`}>
                                {author.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-sm text-brand-light-bg">{author.bookTitle || '-'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </main>

      {/* Invite Modal */}
      {inviteModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
          <div className="bg-[#0b1c30] border border-brand-primary rounded-xl p-8 max-w-md w-full shadow-2xl relative">
            <button 
              onClick={() => setInviteModalOpen(false)}
              className="absolute top-4 right-4 text-[#8c90a1] hover:text-brand-white transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>

            <h3 className="text-xl font-bold text-brand-white mb-2">Quick Invite Author</h3>
            <p className="text-sm text-[#8c90a1] mb-6">Send an exclusive invite link directly to an author's email.</p>
            
            <form onSubmit={handleInvite} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-brand-light-bg mb-1">Author Name (Optional)</label>
                <input 
                  type="text" 
                  value={inviteName}
                  onChange={(e) => setInviteName(e.target.value)}
                  className="w-full bg-[#102034] border border-brand-primary text-brand-white rounded-lg p-3 text-sm focus:outline-none focus:border-blue-500" 
                  placeholder="John Doe" 
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-brand-light-bg mb-1">Email Address *</label>
                <input 
                  type="email" 
                  required
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  className="w-full bg-[#102034] border border-brand-primary text-brand-white rounded-lg p-3 text-sm focus:outline-none focus:border-blue-500" 
                  placeholder="author@example.com" 
                />
              </div>

              <div className="pt-4">
                <button 
                  type="submit" 
                  disabled={isInviting}
                  className="w-full py-3 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isInviting ? (
                    <span>Sending...</span>
                  ) : (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 2L11 13"/><path d="M22 2l-7 20-4-9-9-4 20-7z"/></svg>
                      Send Invitation
                    </>
                  )}
                </button>
              </div>

              {inviteUrl && (
                <div className="pt-2">
                  <button 
                    type="button" 
                    onClick={copyInviteLink}
                    className="w-full py-3 bg-[#102034] text-brand-secondary border border-[#b3c5ff]/30 rounded-lg text-sm font-medium hover:bg-brand-primary transition-colors flex items-center justify-center gap-2"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                    Copy Invite Link
                  </button>
                </div>
              )}

              {inviteMessage && <div className="mt-4 p-3 bg-green-500/10 border border-green-500/20 text-green-400 rounded-lg text-sm text-center">{inviteMessage}</div>}
              {inviteError && <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg text-sm text-center">{inviteError}</div>}
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
