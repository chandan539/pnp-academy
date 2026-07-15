import React from 'react';
import prisma from "@/lib/prisma";
import DashboardClient from "./DashboardClient";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const applications = await prisma.authorApplication.findMany({
    orderBy: { createdAt: 'desc' },
    take: 10
  });

  const pendingCount = await prisma.authorApplication.count({
    where: { status: 'Pending' }
  });

  return (
    <DashboardClient applications={applications} pendingCount={pendingCount} />
  );
}
