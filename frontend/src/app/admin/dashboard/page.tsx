import React from 'react';
import prisma from "@/lib/prisma";
import DashboardClient from "./DashboardClient";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const authors = await prisma.author.findMany({
    orderBy: { createdAt: 'desc' },
    take: 10
  });

  const totalAuthors = await prisma.author.count();
  const pendingAuthors = await prisma.author.count({ where: { status: 'SUBMITTED' } });
  const approvedAuthors = await prisma.author.count({ where: { status: 'APPROVED' } });
  const publishedAuthors = await prisma.author.count({ where: { status: 'PUBLISHED' } });

  const stats = {
    total: totalAuthors,
    pending: pendingAuthors,
    approved: approvedAuthors,
    published: publishedAuthors
  };

  return (
    <DashboardClient authors={authors} stats={stats} />
  );
}
