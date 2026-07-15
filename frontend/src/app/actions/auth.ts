"use server";
import prisma from "@/lib/prisma";
import { cookies } from "next/headers";

export async function loginAdmin(email: string, password: string) {
  try {
    const admin = await prisma.adminUser.findUnique({
      where: { email },
    });

    if (!admin || admin.password !== password) {
      return { error: "Invalid credentials" };
    }

    // Set cookie for auth proxy
    (await cookies()).set("admin_token", admin.id, { 
      path: "/", 
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 // 1 day
    });

    return { success: true };
  } catch (error: any) {
    return { error: error.message || "An error occurred during login" };
  }
}

export async function logoutAdmin() {
  (await cookies()).delete("admin_token");
  return { success: true };
}
