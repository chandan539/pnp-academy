'use server';

import prisma from '@/lib/prisma';
import { uploadFile } from '@/lib/storage';
import { generateAuthorQR, generateAuthorPDF, sendEmails, triggerWebhooks } from '@/lib/workflow';

export async function submitApplication(formData: FormData) {
  try {
    // Basic Parsing
    const fullName = formData.get('fullName') as string;
    const emailId = formData.get('emailId') as string;
    const mobileNumber = formData.get('mobileNumber') as string;

    if (!fullName || !emailId || !mobileNumber) {
      return { success: false, error: 'Required fields missing' };
    }

    // Handle File Uploads (Identity & Bank)
    const passportPhoto = formData.get('passportPhoto') as File | null;
    const panFile = formData.get('panFile') as File | null;
    const aadhaarFile = formData.get('aadhaarFile') as File | null;
    const cancelledCheque = formData.get('cancelledCheque') as File | null;
    
    // Upload files and get URLs
    const passportPhotoUrl = passportPhoto ? await uploadFile(passportPhoto) : null;
    const panUrl = panFile ? await uploadFile(panFile) : null;
    const aadhaarUrl = aadhaarFile ? await uploadFile(aadhaarFile) : null;
    const cancelledChequeUrl = cancelledCheque ? await uploadFile(cancelledCheque) : null;

    // Validate Invite Token
    const inviteToken = formData.get('inviteToken') as string;
    if (!inviteToken) {
      return { success: false, error: 'Invalid invite' };
    }

    const invite = await prisma.invite.findUnique({
      where: { token: inviteToken }
    });

    if (!invite || invite.status !== 'PENDING' || invite.email !== emailId) {
      return { success: false, error: 'Invite is invalid or has already been used.' };
    }

    // Generate custom Author ID
    const authorCount = await prisma.author.count();
    const authorId = `PNP-AUTH-${String(authorCount + 1).padStart(3, '0')}`;

    // Create record
    const author = await prisma.author.create({
      data: {
        authorId,
        status: 'SUBMITTED',
        
        // Step 1: Personal
        fullName,
        emailId,
        mobileNumber,
        whatsappNumber: formData.get('whatsappNumber') as string || null,
        address: formData.get('address') as string || '',
        city: formData.get('city') as string || null,
        state: formData.get('state') as string || null,
        country: formData.get('country') as string || null,
        pinCode: formData.get('pinCode') as string || null,
        occupation: formData.get('occupation') as string || null,
        companyName: formData.get('companyName') as string || null,

        // Step 2: Nominee
        nomineeName: formData.get('nomineeName') as string || null,
        relation: formData.get('relation') as string || null,
        nomineeMobile: formData.get('nomineeMobile') as string || null,
        nomineeEmail: formData.get('nomineeEmail') as string || null,

        // Step 3: Bank
        holderName: formData.get('holderName') as string || null,
        accountNumber: formData.get('accountNumber') as string || null,
        ifscCode: formData.get('ifscCode') as string || null,
        bankName: formData.get('bankName') as string || null,
        branch: formData.get('branch') as string || null,
        cancelledChequeUrl,

        // Step 4: Identity
        passportPhotoUrl,
        panUrl,
        aadhaarUrl,
        
        // Step 5: Book
        bookTitle: formData.get('bookTitle') as string || null,
        subtitle: formData.get('subtitle') as string || null,
        category: formData.get('category') as string || null,
        language: formData.get('language') as string || null,
        expectedTimeline: formData.get('expectedTimeline') as string || null,
        bookDescription: formData.get('bookDescription') as string || null,

        // Step 6: Agreement
        termsAccepted: formData.get('termsAccepted') === 'true',
        privacyAccepted: formData.get('privacyAccepted') === 'true',
        
        // Tracking
        ipAddress: formData.get('ipAddress') as string || null,
        currentUrl: formData.get('currentUrl') as string || null,
      }
    });

    // Run workflows asynchronously (don't block response)
    Promise.resolve().then(async () => {
      try {
        await generateAuthorQR(authorId);
        await generateAuthorPDF(author);
        await sendEmails(author);
        await triggerWebhooks(author);
      } catch (err) {
        console.error('Workflow error:', err);
      }
    });

    // Activity Log
    await prisma.activityLog.create({
      data: {
        action: 'Application Submitted',
        details: 'Author completed the 6-step onboarding process.',
        authorId: author.id
      }
    });

    // Mark Invite as USED
    await prisma.invite.update({
      where: { token: inviteToken },
      data: { status: 'USED' }
    });

    return { success: true, authorId: author.id };
  } catch (error: any) {
    console.error('Save error:', error);
    return { success: false, error: error?.message || 'Failed to submit application' };
  }
}
