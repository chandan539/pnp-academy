import DashboardClient from "../dashboard/DashboardClient";
import prisma from "@/lib/prisma";
export default async function UsersPage() {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <DashboardClient 
      authors={[]} 
      overrideTitle="Team Access" 
      overrideSubtitle="Manage internal team members and administrators."
    >
      <div className="glass-panel p-6 rounded-xl w-full">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-brand-text">Team Members ({users.length})</h3>
          <button className="px-4 py-2 bg-brand-primary text-brand-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            Add Member
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-brand-white/50">
                <th className="px-6 py-4 text-xs font-medium text-brand-text/70 uppercase tracking-wider">Member Name</th>
                <th className="px-6 py-4 text-xs font-medium text-brand-text/70 uppercase tracking-wider">Email</th>
                <th className="px-6 py-4 text-xs font-medium text-brand-text/70 uppercase tracking-wider">Role</th>
                <th className="px-6 py-4 text-xs font-medium text-brand-text/70 uppercase tracking-wider">Joined Date</th>
                <th className="px-6 py-4 text-xs font-medium text-brand-text/70 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#424656]/20">
              {users.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-sm text-brand-text/70">No team members found.</td>
                </tr>
              ) : users.map((user) => (
                <tr key={user.id} className="hover:bg-brand-light-bg/30 transition-colors">
                  <td className="px-6 py-4 flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-brand-primary/20 text-brand-primary flex items-center justify-center font-bold text-xs">
                      {user.name ? user.name.substring(0, 2).toUpperCase() : 'TM'}
                    </div>
                    <span className="text-sm text-brand-text font-medium">{user.name || 'Unnamed Member'}</span>
                  </td>
                  <td className="px-6 py-4 text-sm text-brand-text/80">{user.email}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border bg-[#b3c5ff]/10 text-brand-primary border-[#b3c5ff]/20">
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-brand-text/70">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-brand-text/70 hover:text-brand-text transition-colors p-2 text-sm font-medium">Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardClient>
  );
}
