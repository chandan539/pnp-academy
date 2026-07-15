"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// In a real app, this would use next-auth to verify the user is a SUPER_ADMIN.
// For now, we assume the user has the required permissions if they can call this action.
export async function deleteAuthor(id: string) {
  try {
    // Delete related records first to respect foreign key constraints
    await prisma.activityLog.deleteMany({ where: { authorId: id } });
    await prisma.integrationLog.deleteMany({ where: { authorId: id } });
    await prisma.task.deleteMany({ where: { authorId: id } });
    
    // Delete the author
    await prisma.author.delete({
      where: { id },
    });

    revalidatePath("/admin/authors");
    revalidatePath("/admin/dashboard");
    return { success: true };
  } catch (error: any) {
    console.error("Error deleting author:", error);
    return { success: false, error: error.message };
  }
}

export async function importAuthors(data: any[]) {
  try {
    const validAuthors = data.filter(row => row && (row.fullName || row.name) && (row.emailId || row.email));
    
    const mappedAuthors = validAuthors.map(row => {
      return {
        fullName: row.fullName || row.name || 'Unknown',
        emailId: row.emailId || row.email,
        mobileNumber: String(row.mobileNumber || row.phone || '0000000000'),
        address: row.address || 'Not Provided',
        status: 'SUBMITTED' as const,
        bookTitle: row.bookTitle || row.title || undefined,
        city: row.city || undefined,
        state: row.state || undefined,
      };
    });

    const result = await prisma.author.createMany({
      data: mappedAuthors,
      skipDuplicates: true,
    });

    revalidatePath("/admin/authors");
    revalidatePath("/admin/dashboard");
    return { success: true, count: result.count };
  } catch (error: any) {
    console.error("Error importing authors:", error);
    return { success: false, error: error.message };
  }
}
