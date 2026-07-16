"use client";
import React, { useState } from "react";
import DashboardClient from "../dashboard/DashboardClient";
import { updatePassword } from "@/app/actions/security";

export default function SecurityClient() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [status, setStatus] = useState<{type: 'idle' | 'loading' | 'success' | 'error', message?: string}>({ type: 'idle' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword || !newPassword || !confirmPassword) {
      setStatus({ type: 'error', message: 'All fields are required' });
      return;
    }
    if (newPassword !== confirmPassword) {
      setStatus({ type: 'error', message: 'New passwords do not match' });
      return;
    }
    if (newPassword.length < 6) {
      setStatus({ type: 'error', message: 'Password must be at least 6 characters long' });
      return;
    }
    
    setStatus({ type: 'loading' });
    const res = await updatePassword(currentPassword, newPassword);
    if (res.success) {
      setStatus({ type: 'success', message: 'Password updated successfully!' });
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } else {
      setStatus({ type: 'error', message: res.error || 'Failed to update password' });
    }
  };

  return (
    <DashboardClient authors={[]} overrideTitle="Security Settings" overrideSubtitle="Manage your account security and password.">
      <div className="bg-brand-white rounded-2xl border border-blue-500/10 overflow-hidden max-w-4xl mx-auto">
        <div className="p-6 sm:p-10 border-b border-blue-500/10">
          <h2 className="text-xl font-semibold text-brand-white">Change Password</h2>
          <p className="text-blue-200/60 mt-1">Update your password to keep your account secure.</p>
        </div>
        
        <div className="p-6 sm:p-10">
          <form className="max-w-md" onSubmit={handleSubmit}>
            {status.message && (
              <div className={`p-4 rounded-xl mb-6 text-sm font-medium ${
                status.type === 'error' ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 
                status.type === 'success' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : ''
              }`}>
                {status.message}
              </div>
            )}
            
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-blue-200 mb-1.5">Current Password</label>
                <input 
                  type="password" 
                  value={currentPassword}
                  onChange={e => setCurrentPassword(e.target.value)}
                  className="w-full px-4 py-2.5 bg-brand-light-bg border border-brand-primary/20 rounded-xl text-brand-white focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all"
                  placeholder="Enter current password"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-blue-200 mb-1.5">New Password</label>
                <input 
                  type="password" 
                  value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
                  className="w-full px-4 py-2.5 bg-brand-light-bg border border-brand-primary/20 rounded-xl text-brand-white focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all"
                  placeholder="Enter new password"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-blue-200 mb-1.5">Confirm New Password</label>
                <input 
                  type="password" 
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-2.5 bg-brand-light-bg border border-brand-primary/20 rounded-xl text-brand-white focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all"
                  placeholder="Confirm new password"
                  required
                />
              </div>
              
              <button 
                type="submit"
                disabled={status.type === 'loading'}
                className="mt-8 px-6 py-2.5 bg-brand-primary hover:bg-blue-700 text-brand-white font-medium rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
              >
                {status.type === 'loading' ? 'Updating...' : 'Update Password'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </DashboardClient>
  );
}
