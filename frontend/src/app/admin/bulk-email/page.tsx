import React from 'react';
import DashboardClient from "../dashboard/DashboardClient";
import BulkEmailClient from "./BulkEmailClient";

export const dynamic = "force-dynamic";

export default function BulkEmailPage() {
  return (
    <DashboardClient 
      authors={[]} 
      overrideTitle="Bulk Email" 
      overrideSubtitle="Send campaigns to your authors."
    >
      <div className="mt-8">
        <BulkEmailClient />
      </div>
    </DashboardClient>
  );
}
