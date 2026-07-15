import React from 'react';
import PreInviteForm from './PreInviteForm';
import Footer from '@/components/Footer';

export default function PreInviteOnboardingPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <PreInviteForm />
      <Footer />
    </div>
  );
}
