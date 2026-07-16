import React from 'react';
import prisma from '@/lib/prisma';
import OnboardingClient from './OnboardingClient';
import PreInviteForm from '../PreInviteForm';

export default async function OnboardingServerPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  
  let invite = null;
  if (token) {
    invite = await prisma.invite.findUnique({
      where: { token }
    });
  }

  if (!token || !invite || invite.status !== 'PENDING') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6 font-sans">
        <PreInviteForm />
      </div>
    );
  }

  return <OnboardingClient inviteEmail={invite.email} inviteToken={invite.token} />;
}
