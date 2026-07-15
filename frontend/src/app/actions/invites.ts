'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function createAndSendInvite(email: string) {
  try {
    if (!email) {
      return { success: false, error: 'Email is required' };
    }

    // Check if email already has an invite
    const existingInvite = await prisma.invite.findUnique({
      where: { email }
    });

    if (existingInvite) {
      return { success: false, error: 'Invite already sent to this email' };
    }

    const invite = await prisma.invite.create({
      data: {
        email
      }
    });

    // Send email using Brevo API
    const apiKey = process.env.BREVO_API_KEY;
    if (apiKey) {
      const appUrl = process.env.NEXT_PUBLIC_APP_URL || process.env.URL || 'http://localhost:3000';
      const inviteUrl = `${appUrl}/onboarding/${invite.token}`;

      await fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: {
          "api-key": apiKey,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          sender: { name: "PNP Academy", email: "info@pnpacademy.com" },
          to: [{ email: email }],
          subject: "You're Invited to PNP Academy Premium Author Program",
          htmlContent: `
            <div style="font-family: sans-serif; max-w: 600px; margin: 0 auto;">
              <h2 style="color: #0b1c35;">You've been invited!</h2>
              <p>Hello,</p>
              <p>You have been exclusively invited to apply for the PNP Academy Premium Author Program.</p>
              <p>Please click the button below to complete your onboarding application:</p>
              <div style="text-align: center; margin: 30px 0;">
                <a href="${inviteUrl}" style="background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">Complete Application</a>
              </div>
              <p>Or copy and paste this link into your browser:<br/>
              <a href="${inviteUrl}">${inviteUrl}</a></p>
              <br/>
              <p>Best regards,<br/>PNP Academy Team</p>
            </div>
          `
        })
      });
      console.log(`[EMAIL DISPATCH SUCCESS] Sent to ${email}. URL: ${inviteUrl}`);
    } else {
      console.warn(`[EMAIL DISPATCH SKIPPED] BREVO_API_KEY is not set. URL: /onboarding/${invite.token}`);
    }

    revalidatePath('/admin/users');
    return { success: true, token: invite.token };
  } catch (error: any) {
    console.error('Invite error:', error);
    return { success: false, error: error?.message || 'Failed to generate invite' };
  }
}
