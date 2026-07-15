import prisma from "@/lib/prisma";
import AuthorsClient from "./AuthorsClient";

export default async function AuthorsPage() {
  const authors = await prisma.author.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return <AuthorsClient initialAuthors={authors} />;
}
