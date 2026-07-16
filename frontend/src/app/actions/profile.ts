"use server";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function getCurrentUser() {
  try {
    const cookieStore = cookies();
    // Support Next.js 15 async cookies if needed (fallback)
    const resolvedCookies = cookieStore instanceof Promise ? await cookieStore : cookieStore;
    const token = resolvedCookies.get("auth_token")?.value;
    
    if (!token) return null;
    
    const payload = await verifyToken(token);
    if (!payload || !payload.userId) return null;
    
    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: { id: true, name: true, email: true, role: true }
    });
    
    return user;
  } catch (error) {
    console.error("Failed to get current user:", error);
    return null;
  }
}
