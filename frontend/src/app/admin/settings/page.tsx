import React from 'react';
import prisma from '@/lib/prisma';
import SettingsForm from './SettingsForm';
import { getSettings } from '@/app/actions/settings';
import DashboardClient from '../dashboard/DashboardClient';

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  const logs = await prisma.integrationLog.findMany({
    orderBy: { createdAt: 'desc' },
    take: 20,
    include: {
      author: true
    }
  });

  const initialSettings = await getSettings();

  return (
    <DashboardClient 
      authors={[]} 
      overrideTitle="Settings" 
      overrideSubtitle="Manage system configurations and integrations."
    >
      <div className="w-full space-y-8">
        <SettingsForm initialData={initialSettings} />

        <div className="bg-[#0b1c30] border border-[#1e293b] rounded-xl overflow-hidden">
          <h3 className="text-base font-semibold text-[#d3e4fe] px-6 py-4 border-b border-[#1e293b] bg-[#0b1c30]/50">Recent System Logs</h3>
          <div className="overflow-x-auto p-6">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#0b1c30]/50">
                  <th className="px-6 py-3 text-xs font-medium text-[#8c90a1] uppercase tracking-wider">Service</th>
                  <th className="px-6 py-3 text-xs font-medium text-[#8c90a1] uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-xs font-medium text-[#8c90a1] uppercase tracking-wider">Author</th>
                  <th className="px-6 py-3 text-xs font-medium text-[#8c90a1] uppercase tracking-wider text-right">Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#424656]/20">
                {logs.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-8 text-center text-[#8c90a1] text-sm">No recent activity logs.</td>
                  </tr>
                ) : (
                  logs.map(log => (
                    <tr key={log.id} className="hover:bg-[#102034]/30 transition-colors">
                      <td className="px-6 py-4 text-sm text-[#d3e4fe] font-medium">{log.service}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border ${log.status === 'SUCCESS' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border-rose-500/20'}`}>
                          {log.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-[#c2c6d8]">{log.author?.fullName || 'System'}</td>
                      <td className="px-6 py-4 text-xs text-[#8c90a1] text-right">{new Date(log.createdAt).toLocaleString()}</td>
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
