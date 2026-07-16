import { Metadata } from "next";
import PagesClient from "./PagesClient";
import prisma from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Pages Management | Admin Dashboard",
  description: "Manage dynamic pages for marketing and legal content",
};

export default async function PagesPage() {
  const count = await prisma.dynamicPage.count();
  if (count === 0) {
    const defaultPages = [
      { slug: "home", title: "Home", content: "<h2>Welcome to PNP Academy</h2><p>This is the home page content.</p>", type: "MARKETING", status: "PUBLISHED" },
      { slug: "onboarding", title: "Onboarding", content: "<h2>Premium Author Onboarding</h2><p>Please enter your token to begin.</p>", type: "MARKETING", status: "PUBLISHED" },
      { slug: "thank-you", title: "Thank You", content: "<h2>Application Submitted</h2><p>Thank you for applying.</p>", type: "MARKETING", status: "PUBLISHED" }
    ];
    for (const p of defaultPages) {
      await prisma.dynamicPage.upsert({ where: { slug: p.slug }, update: {}, create: p });
    }
  }

  const pages = await prisma.dynamicPage.findMany({
    orderBy: { createdAt: "desc" },
  });
  
  return <PagesClient initialPages={pages} />;
}
