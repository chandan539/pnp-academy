import { Metadata } from "next";
import PreInvitesClient from "./PreInvitesClient";
import prisma from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Invites | Admin Dashboard",
  description: "View invited authors and their onboarding status",
};

export default async function PreInvitesPage() {
  const applications = await prisma.invite.findMany({
    orderBy: { createdAt: "desc" },
  });
  
  return <PreInvitesClient applications={applications} />;
}
