'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function submitPreInvite(formData: FormData) {
  try {
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const aboutYou = formData.get('aboutYou') as string;
    const linkedinUrl = formData.get('linkedinUrl') as string;

    if (!name || !email || !phone || !aboutYou || !linkedinUrl) {
      return { success: false, error: 'All fields are required.' };
    }

    const application = await prisma.preInviteApplication.create({
      data: {
        name,
        email,
        phone,
        aboutYou,
        linkedinUrl,
      },
    });

    revalidatePath('/admin/pre-invites');
    
    return { success: true, application };
  } catch (error: any) {
    console.error('Failed to submit pre-invite', error);
    return { success: false, error: error.message || 'Failed to submit.' };
  }
}
