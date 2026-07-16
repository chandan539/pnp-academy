import QRCode from 'qrcode';
import { PDFDocument, rgb } from 'pdf-lib';
import prisma from './prisma';

export async function generateAuthorQR(authorId: string): Promise<string> {
  try {
    const url = `https://pnpacademy.com/verify/${authorId}`;
    const qrDataUrl = await QRCode.toDataURL(url);
    // In production, this base64 string should be uploaded to S3/R2 and a URL returned.
    return qrDataUrl;
  } catch (err) {
    console.error('Failed to generate QR', err);
    return '';
  }
}

export async function generateAuthorPDF(author: any): Promise<string> {
  try {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 800]);
    const { width, height } = page.getSize();
    
    page.drawText('PnP Academy - Author Application Summary', {
      x: 50,
      y: height - 50,
      size: 20,
      color: rgb(0, 0.4, 1),
    });

    page.drawText(`Author ID: ${author.authorId}`, { x: 50, y: height - 100, size: 12 });
    page.drawText(`Name: ${author.fullName}`, { x: 50, y: height - 120, size: 12 });
    page.drawText(`Email: ${author.emailId}`, { x: 50, y: height - 140, size: 12 });
    page.drawText(`Book Title: ${author.bookTitle || 'N/A'}`, { x: 50, y: height - 160, size: 12 });

    const pdfBytes = await pdfDoc.save();
    // In production, upload pdfBytes to S3/R2 and return URL
    // Here we return a mock URL
    return `/uploads/author_summary_${author.authorId}.pdf`;
  } catch (err) {
    console.error('Failed to generate PDF', err);
    return '';
  }
}

import { sendTransactionalEmail } from '@/app/actions/email';

export async function sendEmails(author: any) {
  console.log(`[EMAIL WORKFLOW] Sending Welcome Email to ${author.emailId}`);
  
  const emailHtml = `
    <h2>Welcome to PnP Academy, ${author.fullName}!</h2>
    <p>We have successfully received your details. Your application is now confirmed.</p>
    <p>Your Author ID is: <strong>${author.authorId}</strong></p>
    <p>Our team is setting up your author profile and will send you the login credentials within 24 hours.</p>
    <br/>
    <p>Best Regards,</p>
    <p>The PnP Academy Team</p>
  `;

  const emailResult = await sendTransactionalEmail({
    to: author.emailId,
    subject: "Welcome to PnP Academy! Details Confirmed",
    htmlBody: emailHtml
  });

  await prisma.integrationLog.create({
    data: {
      service: 'Welcome Email',
      status: emailResult.success ? 'SUCCESS' : 'FAILED',
      requestPayload: JSON.stringify({ to: author.emailId, subject: 'Welcome' }),
      responsePayload: emailResult.error || 'Sent',
      authorId: author.id
    }
  });
}

export async function triggerWebhooks(author: any) {
  // Fetch the webhook URL from AppSettings
  const setting = await prisma.appSetting.findUnique({
    where: { key: 'sheet_webhook_url' }
  });

  const webhookUrl = setting?.value;

  if (webhookUrl && webhookUrl.trim() !== '') {
    console.log(`[WEBHOOK WORKFLOW] Sending data to Webhook/AppSheet`);
    try {
      // Exclude potentially massive fields (like file URLs) if not needed,
      // or just send the full object. We will send the full object to ensure
      // Google Sheets captures everything.
      const payload = {
        AuthorID: author.authorId,
        FullName: author.fullName,
        Email: author.emailId,
        Mobile: author.mobileNumber,
        Status: author.status,
        BookTitle: author.bookTitle || '',
        City: author.city || '',
        State: author.state || '',
        Country: author.country || '',
        CreatedAt: author.createdAt ? new Date(author.createdAt).toISOString() : new Date().toISOString()
      };

      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const responseText = await response.text();

      await prisma.integrationLog.create({
        data: {
          service: 'Google Sheets Webhook',
          status: response.ok ? 'SUCCESS' : 'FAILED',
          requestPayload: JSON.stringify(payload),
          responsePayload: responseText,
          authorId: author.id
        }
      });
    } catch (error: any) {
      console.error(`[WEBHOOK WORKFLOW] Failed:`, error);
      await prisma.integrationLog.create({
        data: {
          service: 'Google Sheets Webhook',
          status: 'ERROR',
          requestPayload: JSON.stringify({ authorId: author.authorId }),
          responsePayload: error.message,
          authorId: author.id
        }
      });
    }
  } else {
    console.log(`[WEBHOOK WORKFLOW] No sheet_webhook_url configured, skipping.`);
  }
}
