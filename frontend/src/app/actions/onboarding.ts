"use server";
import prisma from "@/lib/prisma";

export async function saveApplication(data: {
  fullName: string;
  mobileNumber: string;
  emailId: string;
  address: string;
  nomineeName: string;
  relation: string;
  holderName: string;
  accountNumber: string;
  ifscCode: string;
}) {
  try {
    const application = await prisma.authorApplication.create({
      data: {
        fullName: data.fullName,
        mobileNumber: data.mobileNumber,
        emailId: data.emailId,
        address: data.address,
        nomineeName: data.nomineeName,
        relation: data.relation,
        holderName: data.holderName,
        accountNumber: data.accountNumber,
        ifscCode: data.ifscCode,
        status: "Pending"
      }
    });

    return { success: true, id: application.id };
  } catch (error: any) {
    console.error("Failed to save application:", error);
    return { error: "Failed to save application." };
  }
}
