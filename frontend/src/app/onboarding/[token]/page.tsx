import React from 'react';
import prisma from '@/lib/prisma';
import OnboardingClient from './OnboardingClient';
import PreInviteForm from '../PreInviteForm';
import { getSettings } from '@/app/actions/settings';

export default async function OnboardingServerPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const settings = await getSettings();
  const websiteTitle = settings.website_title || "PnP Academy";
  
  let invite = null;
  if (token) {
    invite = await prisma.invite.findUnique({
      where: { token }
    });
  }

  if (!token || !invite || invite.status !== 'PENDING') {
    return (
      <div className="min-h-screen bg-brand-light-bg flex items-center justify-center p-6 font-sans selection:bg-brand-primary/30">
        <PreInviteForm websiteTitle={websiteTitle} />
      </div>
    );
  }

  return <OnboardingClient inviteEmail={invite.email} inviteToken={invite.token} websiteTitle={websiteTitle} />;
}
