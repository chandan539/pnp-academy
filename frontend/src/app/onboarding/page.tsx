import React from 'react';
import PreInviteForm from './PreInviteForm';
import Footer from '@/components/Footer';

import { getSettings } from '@/app/actions/settings';

export default async function PreInviteOnboardingPage() {
  const settings = await getSettings();
  const websiteTitle = settings.website_title || "PnP Academy";

  return (
    <div className="min-h-screen bg-brand-light-bg flex flex-col font-sans selection:bg-brand-primary/30">
      <PreInviteForm websiteTitle={websiteTitle} />
      <Footer />
    </div>
  );
}
