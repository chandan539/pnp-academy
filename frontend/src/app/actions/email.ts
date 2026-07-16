"use server";

import prisma from "@/lib/prisma";
import nodemailer from "nodemailer";
import { getSettings } from "./settings";

export async function sendTransactionalEmail({ to, subject, htmlBody }: { to: string; subject: string; htmlBody: string }) {
  try {
    const settings = await getSettings();
    const preferredProvider = settings["preferred_email_service"] || "BREVO";

    if (preferredProvider === "SMTP") {
      const smtpEmail = settings["smtp_from_email"];
      const smtpPassword = settings["gmail_smtp_password"];

      if (!smtpEmail || !smtpPassword) {
        return { success: false, error: "Gmail SMTP settings are incomplete." };
      }

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: smtpEmail,
          pass: smtpPassword,
        },
      });

      await transporter.sendMail({
        from: smtpEmail,
        to: to,
        replyTo: "publish@pnpacademy.in",
        subject: subject,
        html: htmlBody,
      });

      return { success: true };
    } else {
      // BREVO
      const brevoKey = settings["brevo_api_key"] || process.env.BREVO_API_KEY;
      const brevoFromEmail = settings["brevo_from_email"] || "info@pnpacademy.com";
      const brevoFromName = settings["brevo_from_name"] || "PnP Academy";

      if (!brevoKey) {
        return { success: false, error: "Brevo settings are incomplete." };
      }

      const brevoPayload = {
        sender: {
          name: brevoFromName,
          email: brevoFromEmail,
        },
        replyTo: { email: "publish@pnpacademy.in", name: "PnP Academy" },
        to: [{ email: to }],
        subject: subject,
        htmlContent: htmlBody,
      };

      const response = await fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: {
          "api-key": brevoKey,
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify(brevoPayload),
      });

      if (!response.ok) {
        const errorText = await response.text();
        return { success: false, error: `Brevo API error: ${errorText}` };
      }

      return { success: true };
    }
  } catch (error: any) {
    console.error("Transactional email error:", error);
    return { success: false, error: error.message || "Failed to send email." };
  }
}

export async function sendBulkEmail(formData: FormData) {
  try {
    const subject = formData.get("subject") as string;
    const htmlBody = formData.get("body") as string;

    if (!subject || !htmlBody) {
      return { success: false, error: "Subject and Body are required." };
    }

    const settings = await getSettings();
    const preferredProvider = settings["preferred_email_service"] || "BREVO";

    // Fetch all authors with email
    const authors = await prisma.author.findMany({
      where: {
        emailId: { not: "" },
      },
      select: { emailId: true, fullName: true },
    });

    if (authors.length === 0) {
      return { success: false, error: "No authors found to send emails to." };
    }

    const bccList = authors.map((a) => a.emailId).join(",");

    // Always use SMTP for Bulk Email as per requirement
    const smtpEmail = settings["smtp_from_email"];
    const smtpPassword = settings["gmail_smtp_password"];

    if (!smtpEmail || !smtpPassword) {
      return { success: false, error: "Gmail SMTP settings are incomplete." };
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: smtpEmail,
        pass: smtpPassword,
      },
      });

      await transporter.sendMail({
        from: smtpEmail,
        to: smtpEmail, // Send to self
        replyTo: "publish@pnpacademy.in",
        bcc: bccList, // BCC all authors
        subject: subject,
        html: htmlBody,
      });

    return { success: true, count: authors.length };
  } catch (error: any) {
    console.error("Bulk email error:", error);
    return { success: false, error: error.message || "Failed to send emails." };
  }
}
