"use client";

import React, { useState } from "react";
import DashboardClient from "../dashboard/DashboardClient";
import { Search, Filter, CheckCircle, XCircle } from "lucide-react";

type PreInviteApplication = {
  id: string;
  name: string;
  email: string;
  phone: string;
  aboutYou: string;
  linkedinUrl: string;
  status: string;
  createdAt: Date;
};

export default function PreInvitesClient({ applications }: { applications: PreInviteApplication[] }) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredApps = applications.filter(app => 
    app.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    app.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardClient authors={[]} overrideTitle="Pre-Invite Applications" overrideSubtitle="Review requests from authors for premium access">
      <div className="space-y-6 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-[#0b1c35] p-6 rounded-2xl border border-blue-500/10">
          <div>
            <h1 className="text-2xl font-semibold text-white tracking-tight">Pre-Invite Applications</h1>
            <p className="text-blue-200/60 mt-1">Review requests from authors for premium access</p>
          </div>
          
          <div className="flex w-full md:w-auto gap-3">
            <div className="relative flex-1 md:w-64">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-blue-200/40" />
              <input
                type="text"
                placeholder="Search name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-[#031427] border border-blue-500/20 rounded-lg pl-9 pr-4 py-2 text-sm text-white placeholder-blue-200/30 focus:outline-none focus:border-blue-500/50 transition-colors"
              />
            </div>
            <button className="flex items-center justify-center gap-2 bg-[#031427] border border-blue-500/20 text-blue-200 px-4 py-2 rounded-lg hover:bg-[#0f2442] transition-colors">
              <Filter className="w-4 h-4" />
              <span className="text-sm font-medium">Filter</span>
            </button>
          </div>
        </div>

        <div className="bg-[#0b1c35] rounded-2xl border border-blue-500/10 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-blue-500/10 bg-[#0f2442]">
                  <th className="px-6 py-4 text-xs font-semibold text-blue-200 uppercase tracking-wider">Applicant</th>
                  <th className="px-6 py-4 text-xs font-semibold text-blue-200 uppercase tracking-wider">Contact</th>
                  <th className="px-6 py-4 text-xs font-semibold text-blue-200 uppercase tracking-wider">About</th>
                  <th className="px-6 py-4 text-xs font-semibold text-blue-200 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-xs font-semibold text-blue-200 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-blue-500/10">
                {filteredApps.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-blue-200/50">
                      No applications found.
                    </td>
                  </tr>
                ) : (
                  filteredApps.map((app) => (
                    <tr key={app.id} className="hover:bg-[#0f2442]/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-medium text-white">{app.name}</div>
                        <div className="text-xs text-blue-300 mt-1">
                          <a href={app.linkedinUrl} target="_blank" rel="noopener noreferrer" className="hover:underline">
                            LinkedIn Profile ↗
                          </a>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-blue-200">{app.email}</div>
                        <div className="text-sm text-blue-200/70">{app.phone}</div>
                      </td>
                      <td className="px-6 py-4 text-sm text-blue-200/80 max-w-xs truncate" title={app.aboutYou}>
                        {app.aboutYou}
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 text-xs rounded-full font-medium bg-yellow-500/10 text-yellow-400 border border-yellow-500/20">
                          {app.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button className="p-2 bg-green-500/10 hover:bg-green-500/20 rounded-lg text-green-400 transition-colors tooltip" title="Approve">
                            <CheckCircle className="w-4 h-4" />
                          </button>
                          <button className="p-2 bg-red-500/10 hover:bg-red-500/20 rounded-lg text-red-400 transition-colors tooltip" title="Reject">
                            <XCircle className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardClient>
  );
}
