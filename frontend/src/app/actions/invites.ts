'use server';

import { revalidatePath } from 'next/cache';
import { headers } from 'next/headers';

import prisma from '@/lib/prisma';
import { sendTransactionalEmail } from './email';

export async function createAndSendInvite(email: string) {
  try {
    if (!email) {
      return { success: false, error: 'Email is required' };
    }

    // Check if email already has an invite
    let invite = await prisma.invite.findUnique({
      where: { email }
    });

    if (!invite) {
      invite = await prisma.invite.create({
        data: {
          email
        }
      });
    }

    const headersList = headers();
    // Support Next.js 15 async headers if needed (fallback)
    const resolvedHeaders = headersList instanceof Promise ? await headersList : headersList;
    const host = resolvedHeaders.get('host') || 'localhost:3000';
    const protocol = process.env.NODE_ENV === 'development' || host.includes('localhost') ? 'http' : 'https';
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || `${protocol}://${host}`;

    const inviteUrl = `${appUrl}/onboarding/${invite.token}`;

    const htmlBody = `
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
    `;

    const emailResult = await sendTransactionalEmail({
      to: email,
      subject: "You're Invited to PNP Academy Premium Author Program",
      htmlBody
    });

    if (!emailResult.success) {
      let errorMsg = emailResult.error || 'Failed to send invite email';
      if (errorMsg.includes('unrecognised IP address')) {
        errorMsg = "Brevo Security Block: Please go to https://app.brevo.com/security/authorised_ips and authorize this server's IP address to send emails via Brevo.";
      }
      console.warn(`[EMAIL DISPATCH FAILED] ${errorMsg}`);
      return { success: false, error: errorMsg };
    } else {
      console.log(`[EMAIL DISPATCH SUCCESS] Sent to ${email}. URL: ${inviteUrl}`);
    }

    revalidatePath('/admin/users');
    return { success: true, token: invite.token, inviteUrl };
  } catch (error: any) {
    console.error('Invite error:', error);
    return { success: false, error: error?.message || 'Failed to generate invite' };
  }
}
