"use client";

import React, { useState } from "react";
import DashboardClient from "../dashboard/DashboardClient";
import { Search, Filter, CheckCircle, XCircle } from "lucide-react";

type InviteRecord = {
  id: string;
  email: string;
  status: string;
  token: string;
  createdAt: Date;
};

export default function PreInvitesClient({ applications }: { applications: InviteRecord[] }) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredApps = applications.filter(app => 
    app.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardClient authors={[]} overrideTitle="Invites" overrideSubtitle="Review sent invites and their status">
      <div className="space-y-6 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-[#0b1c35] p-6 rounded-2xl border border-blue-500/10">
          <div>
            <h1 className="text-2xl font-semibold text-white tracking-tight">Invited Authors</h1>
            <p className="text-blue-200/60 mt-1">Review sent invites and their onboarding status</p>
          </div>
          
          <div className="flex w-full md:w-auto gap-3">
            <div className="relative flex-1 md:w-64">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-blue-200/40" />
              <input
                type="text"
                placeholder="Search name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-brand-primary-dark border border-blue-500/20 rounded-lg pl-9 pr-4 py-2 text-sm text-white placeholder-blue-200/30 focus:outline-none focus:border-blue-500/50 transition-colors"
              />
            </div>
            <button className="flex items-center justify-center gap-2 bg-brand-primary-dark border border-blue-500/20 text-blue-200 px-4 py-2 rounded-lg hover:bg-[#0f2442] transition-colors">
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
                  <th className="px-6 py-4 text-xs font-semibold text-blue-200 uppercase tracking-wider">Email Address</th>
                  <th className="px-6 py-4 text-xs font-semibold text-blue-200 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-xs font-semibold text-blue-200 uppercase tracking-wider">Sent Date</th>
                  <th className="px-6 py-4 text-xs font-semibold text-blue-200 uppercase tracking-wider text-right">Invite Link</th>
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
                        <div className="font-medium text-white">{app.email}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                          app.status === 'PENDING' ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20' :
                          app.status === 'USED' ? 'bg-green-500/10 text-green-400 border border-green-500/20' :
                          'bg-red-500/10 text-red-400 border border-red-500/20'
                        }`}>
                          {app.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-blue-200/80">
                        {new Date(app.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button 
                          onClick={() => {
                            const url = `${window.location.origin}/onboarding/${app.token}`;
                            navigator.clipboard.writeText(url);
                            alert('Invite link copied to clipboard!');
                          }}
                          className="px-3 py-1.5 text-xs bg-[#0b1c35] border border-blue-500/30 hover:bg-[#0f2442] hover:border-blue-400 text-blue-200 rounded-lg transition-colors"
                        >
                          Copy Link
                        </button>
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
