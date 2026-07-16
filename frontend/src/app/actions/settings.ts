"use server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function saveSettings(formData: FormData) {
  try {
    for (const [key, value] of formData.entries()) {
      if (typeof value === "string") {
        await prisma.appSetting.upsert({
          where: { key },
          update: { value },
          create: { key, value }
        });
      }
    }
    revalidatePath("/", "layout");
    return { success: true };
  } catch (error) {
    console.error("Failed to save settings:", error);
    return { success: false, error: "Failed to save settings" };
  }
}

export async function getSettings() {
  const settings = await prisma.appSetting.findMany();
  return settings.reduce((acc, curr) => {
    acc[curr.key] = curr.value;
    return acc;
  }, {} as Record<string, string>);
}
