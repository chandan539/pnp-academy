import React from 'react';
import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
import OnboardingClient from './OnboardingClient';

export default async function OnboardingServerPage({ params }: { params: { token: string } }) {
  const token = params.token;
  
  if (!token) {
    return notFound();
  }

  const invite = await prisma.invite.findUnique({
    where: { token }
  });

  if (!invite || invite.status !== 'PENDING') {
    return (
      <div className="min-h-screen bg-[#031427] flex items-center justify-center p-6 font-sans">
        <div className="max-w-md w-full bg-[#102034] border border-[#424656] p-8 rounded-2xl shadow-2xl text-center space-y-4">
          <div className="w-16 h-16 bg-red-500/20 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
          </div>
          <h2 className="text-2xl font-bold text-[#d3e4fe]">Invalid Invite</h2>
          <p className="text-sm text-[#8c90a1] leading-relaxed">
            This invitation link is either invalid, expired, or has already been used. Please contact support if you believe this is an error.
          </p>
        </div>
      </div>
    );
  }

  return <OnboardingClient inviteEmail={invite.email} inviteToken={invite.token} />;
}
