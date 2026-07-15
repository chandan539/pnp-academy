import { Metadata } from "next";
import PreInvitesClient from "./PreInvitesClient";
import prisma from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Pre-Invites Management | Admin Dashboard",
  description: "Manage pre-invite applications from authors",
};

export default async function PreInvitesPage() {
  const applications = await prisma.preInviteApplication.findMany({
    orderBy: { createdAt: "desc" },
  });
  
  return <PreInvitesClient applications={applications} />;
}
