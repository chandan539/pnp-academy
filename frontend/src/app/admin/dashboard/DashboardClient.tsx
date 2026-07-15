"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

export default function DashboardClient({ 
  applications,
  pendingCount
}: { 
  applications: any[];
  pendingCount: number;
}) {
  const [revenue, setRevenue] = useState(124592);

  useEffect(() => {
    const interval = setInterval(() => {
      const change = Math.floor(Math.random() * 50) - 10;
      setRevenue(prev => prev + change);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[#031427] text-[#d3e4fe] min-h-screen font-sans selection:bg-blue-600/30 selection:text-white">
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
      <aside className="hidden lg:flex flex-col h-screen fixed left-0 top-0 bg-[#0b1c30] border-r border-[#424656] shadow-sm w-64 z-50">
        <div className="p-6 flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
          </div>
          <div>
            <h1 className="text-xl font-bold text-[#b3c5ff] leading-tight">PnP Academy</h1>
            <p className="text-[10px] uppercase tracking-widest text-[#8c90a1]">Premium SaaS</p>
          </div>
        </div>
        
        <nav className="flex-1 mt-6 px-4 space-y-1 overflow-y-auto custom-scrollbar">
          <Link href="/admin/dashboard" className="flex items-center gap-4 px-4 py-3 rounded-lg text-[#b3c5ff] font-bold border-r-2 border-[#b3c5ff] bg-[#1b2b3f] transition-colors group">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="3" width="7" height="9"/><rect x="14" y="3" width="7" height="5"/><rect x="14" y="12" width="7" height="9"/><rect x="3" y="16" width="7" height="5"/></svg>
            <span className="text-sm font-medium">Dashboard</span>
          </Link>
          <Link href="#" className="flex items-center gap-4 px-4 py-3 rounded-lg text-[#c2c6d8] hover:bg-[#1b2b3f] transition-colors group">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
            <span className="text-sm font-medium">Academy</span>
          </Link>
          <Link href="#" className="flex items-center gap-4 px-4 py-3 rounded-lg text-[#c2c6d8] hover:bg-[#1b2b3f] transition-colors group">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
            <span className="text-sm font-medium">Analytics</span>
          </Link>
          
          <div className="pt-6 pb-2 px-4 text-[10px] font-bold text-[#8c90a1] uppercase tracking-wider">System</div>
          <Link href="#" className="flex items-center gap-4 px-4 py-3 rounded-lg text-[#c2c6d8] hover:bg-[#1b2b3f] transition-colors group">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
            <span className="text-sm font-medium">Settings</span>
          </Link>
        </nav>
        
        <div className="p-6 border-t border-[#424656]/30 space-y-4">
          <button className="w-full bg-blue-600 text-white text-xs font-medium py-4 rounded-lg hover:bg-blue-700 active:scale-[0.98] transition-all flex items-center justify-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            Quick Actions
          </button>
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#26364a] flex items-center justify-center border border-[#424656]">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#b3c5ff" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              </div>
              <span className="text-sm text-[#d3e4fe]">Profile</span>
            </div>
            <button className="text-[#c2c6d8] hover:text-[#ffb4ab] transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="lg:ml-64 min-h-screen flex flex-col">
        {/* Top Navigation Bar */}
        <header className="sticky top-0 z-40 flex justify-between items-center px-6 py-4 w-full bg-[#031427]/80 backdrop-blur-md border-b border-[#424656]/30 shadow-md">
          <div className="flex items-center gap-6 flex-1">
            <div className="relative max-w-md w-full hidden sm:block">
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8c90a1]" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              <input className="w-full bg-[#0b1c30] border border-[#424656]/50 rounded-lg pl-12 pr-4 py-2 text-sm text-[#d3e4fe] focus:ring-1 focus:ring-blue-400 focus:border-blue-400 outline-none" placeholder="Search analytics, authors, or reports..." type="text" />
            </div>
            <nav className="hidden lg:flex items-center gap-6">
              <Link href="#" className="text-[#b3c5ff] font-bold border-b-2 border-[#b3c5ff] pb-2 text-sm">Overview</Link>
              <Link href="#" className="text-[#c2c6d8] hover:text-[#b3c5ff] transition-all text-sm">Users</Link>
              <Link href="#" className="text-[#c2c6d8] hover:text-[#b3c5ff] transition-all text-sm">Reports</Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <button className="w-10 h-10 flex items-center justify-center rounded-full text-[#c2c6d8] hover:bg-[#102034] transition-colors relative">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
              <span className="absolute top-2 right-2 w-2 h-2 bg-[#ffb4ab] rounded-full border border-[#031427]"></span>
            </button>
            <div className="h-8 w-[1px] bg-[#424656]/30 mx-2"></div>
            <div className="flex items-center gap-2">
              <div className="text-right hidden sm:block">
                <p className="text-xs text-[#d3e4fe] font-medium leading-none">Alex Rivera</p>
                <p className="text-[10px] text-[#8c90a1]">Administrator</p>
              </div>
              <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold">
                AR
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Canvas */}
        <div className="p-6 md:p-10 space-y-10 max-w-[1600px] mx-auto w-full">
          {/* Page Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h2 className="text-4xl font-semibold text-[#d3e4fe]">Dashboard</h2>
              <p className="text-[#c2c6d8] text-base mt-2">Welcome back. Here's what's happening in the academy today.</p>
            </div>
            <div className="flex gap-4">
              <button className="px-6 py-3 rounded-lg border border-[#424656] hover:bg-[#102034] transition-all flex items-center gap-2 text-xs font-medium">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                Last 30 Days
              </button>
              <button className="px-6 py-3 rounded-lg bg-blue-600 text-white shadow-lg shadow-blue-600/20 hover:bg-blue-700 active:scale-95 transition-all flex items-center gap-2 text-xs font-medium">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                Export Data
              </button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Revenue Card */}
            <div className="glass-panel p-6 rounded-xl group hover:border-[#b3c5ff]/50 transition-all duration-500">
              <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 rounded-lg bg-[#b3c5ff]/10 flex items-center justify-center text-[#b3c5ff]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                </div>
                <span className="text-[#b3c5ff] font-bold text-xs">+12.5%</span>
              </div>
              <p className="text-[#8c90a1] text-xs font-medium uppercase tracking-wider">Total Revenue</p>
              <h3 className="text-3xl font-semibold text-[#d3e4fe] mt-2 transition-colors">${revenue.toLocaleString()}</h3>
              <div className="mt-6 h-12 w-full overflow-hidden">
                <svg className="w-full h-full preserve-3d" viewBox="0 0 100 40">
                  <path className="text-[#b3c5ff] sparkline-path" d="M0,35 Q10,15 20,25 T40,10 T60,30 T80,5 T100,20" fill="none" stroke="currentColor" strokeWidth="2" />
                </svg>
              </div>
            </div>

            {/* Pending Card */}
            <div className="glass-panel p-6 rounded-xl group hover:border-[#ffb59d]/50 transition-all duration-500">
              <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 rounded-lg bg-[#ffb59d]/10 flex items-center justify-center text-[#ffb59d]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                </div>
                <span className="text-[#ffb59d] font-bold text-xs">-2.1%</span>
              </div>
              <p className="text-[#8c90a1] text-xs font-medium uppercase tracking-wider">Pending Enrollments</p>
              <h3 className="text-3xl font-semibold text-[#d3e4fe] mt-2">{pendingCount}</h3>
              <div className="mt-6 h-12 w-full overflow-hidden">
                <svg className="w-full h-full" viewBox="0 0 100 40">
                  <path className="text-[#ffb59d] sparkline-path" d="M0,20 Q15,35 30,15 T50,25 T70,5 T100,30" fill="none" stroke="currentColor" strokeWidth="2" />
                </svg>
              </div>
            </div>

            {/* Completed Card */}
            <div className="glass-panel p-6 rounded-xl group hover:border-[#bec6e0]/50 transition-all duration-500">
              <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 rounded-lg bg-[#bec6e0]/10 flex items-center justify-center text-[#bec6e0]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                </div>
                <span className="text-[#bec6e0] font-bold text-xs">+8.4%</span>
              </div>
              <p className="text-[#8c90a1] text-xs font-medium uppercase tracking-wider">Course Completions</p>
              <h3 className="text-3xl font-semibold text-[#d3e4fe] mt-2">1,205</h3>
              <div className="mt-6 h-12 w-full overflow-hidden">
                <svg className="w-full h-full" viewBox="0 0 100 40">
                  <path className="text-[#bec6e0] sparkline-path" d="M0,30 Q20,5 40,20 T60,10 T80,35 T100,5" fill="none" stroke="currentColor" strokeWidth="2" />
                </svg>
              </div>
            </div>

            {/* Conversion Card */}
            <div className="glass-panel p-6 rounded-xl group hover:border-blue-600/50 transition-all duration-500">
              <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 rounded-lg bg-blue-600/10 flex items-center justify-center text-blue-500">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
                </div>
                <span className="text-blue-500 font-bold text-xs">+4.2%</span>
              </div>
              <p className="text-[#8c90a1] text-xs font-medium uppercase tracking-wider">Conversion Rate</p>
              <h3 className="text-3xl font-semibold text-[#d3e4fe] mt-2">24.8%</h3>
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
            <div className="lg:col-span-8 glass-panel rounded-xl flex flex-col overflow-hidden">
              <div className="p-6 border-b border-[#424656]/30 flex justify-between items-center">
                <h4 className="text-2xl font-semibold text-[#d3e4fe]">Today's Authors</h4>
                <button className="text-[#b3c5ff] text-xs font-medium hover:underline">View All</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#0b1c30]/50">
                      <th className="px-6 py-4 text-xs font-medium text-[#8c90a1] uppercase tracking-wider">Author</th>
                      <th className="px-6 py-4 text-xs font-medium text-[#8c90a1] uppercase tracking-wider">Status</th>
                      <th className="px-6 py-4 text-xs font-medium text-[#8c90a1] uppercase tracking-wider">Course</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#424656]/20">
                    {applications.length === 0 ? (
                      <tr>
                        <td colSpan={3} className="px-6 py-8 text-center text-sm text-[#8c90a1]">No applications found.</td>
                      </tr>
                    ) : applications.map((app) => (
                      <tr key={app.id} className="hover:bg-[#102034]/30 transition-colors">
                        <td className="px-6 py-4 flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
                            {app.fullName.substring(0, 2).toUpperCase()}
                          </div>
                          <div>
                            <p className="text-sm text-[#d3e4fe] font-medium">{app.fullName}</p>
                            <p className="text-[11px] text-[#8c90a1]">{app.emailId}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border ${
                            app.status === 'Pending' ? 'bg-[#ffb59d]/10 text-[#ffb59d] border-[#ffb59d]/20' : 
                            'bg-[#b3c5ff]/10 text-[#b3c5ff] border-[#b3c5ff]/20'
                          }`}>
                            {app.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-[#c2c6d8]">-</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Sales Pipeline Funnel */}
            <div className="lg:col-span-4 glass-panel rounded-xl p-6 flex flex-col">
              <h4 className="text-2xl font-semibold text-[#d3e4fe] mb-6">Sales Pipeline</h4>
              <div className="flex-1 flex flex-col justify-center gap-2 relative">
                <div className="w-full bg-[#b3c5ff]/20 h-16 rounded-lg relative overflow-hidden flex items-center px-6 group">
                  <div className="absolute inset-y-0 left-0 bg-[#b3c5ff]/40 w-[95%] transition-all duration-1000 group-hover:w-full"></div>
                  <div className="relative flex justify-between w-full items-center">
                    <span className="text-xs font-medium text-[#b3c5ff] font-bold">Leads</span>
                    <span className="text-2xl font-bold">12.5k</span>
                  </div>
                </div>
                <div className="w-[90%] mx-auto bg-blue-600/20 h-16 rounded-lg relative overflow-hidden flex items-center px-6 group">
                  <div className="absolute inset-y-0 left-0 bg-blue-600/40 w-[60%] transition-all duration-1000 group-hover:w-[65%]"></div>
                  <div className="relative flex justify-between w-full items-center">
                    <span className="text-xs font-medium text-[#b3c5ff] font-bold">Qualified</span>
                    <span className="text-2xl font-bold">8.1k</span>
                  </div>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-[#424656]/30 text-center">
                <p className="text-[#c2c6d8] text-sm">Conversion velocity is <span className="text-[#b3c5ff] font-bold">up 8%</span> this week.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
