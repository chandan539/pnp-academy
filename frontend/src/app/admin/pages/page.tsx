import { Metadata } from "next";
import PagesClient from "./PagesClient";
import prisma from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Pages Management | Admin Dashboard",
  description: "Manage dynamic pages for marketing and legal content",
};

export default async function PagesPage() {
  const pages = await prisma.dynamicPage.findMany({
    orderBy: { createdAt: "desc" },
  });
  
  return <PagesClient initialPages={pages} />;
}
