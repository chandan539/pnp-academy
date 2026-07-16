"use server";
import { getCurrentUser } from "./profile";
import prisma from "@/lib/prisma";
import { hashPassword, comparePassword } from "@/lib/auth";

export async function updatePassword(currentPassword: string, newPassword: string) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return { success: false, error: "Not authenticated" };
    }

    const dbUser = await prisma.user.findUnique({ where: { id: user.id } });
    if (!dbUser) return { success: false, error: "User not found" };

    const isValid = await comparePassword(currentPassword, dbUser.password);
    if (!isValid) {
      return { success: false, error: "Current password is incorrect" };
    }

    const newHashedPassword = await hashPassword(newPassword);
    await prisma.user.update({
      where: { id: user.id },
      data: { password: newHashedPassword }
    });

    return { success: true };
  } catch (error) {
    console.error("Failed to update password:", error);
    return { success: false, error: "Internal server error" };
  }
}
