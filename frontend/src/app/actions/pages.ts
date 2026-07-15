'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function createPage(formData: FormData) {
  try {
    const slug = formData.get('slug') as string;
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;
    const type = formData.get('type') as string;
    
    if (!slug || !title || !content || !type) {
      return { success: false, error: 'All fields are required.' };
    }

    const existingPage = await prisma.dynamicPage.findUnique({
      where: { slug }
    });

    if (existingPage) {
      return { success: false, error: 'A page with this slug already exists.' };
    }

    const page = await prisma.dynamicPage.create({
      data: {
        slug,
        title,
        content,
        type,
        status: 'PUBLISHED'
      }
    });

    revalidatePath('/admin/pages');
    revalidatePath(`/${slug}`);
    
    return { success: true, page };
  } catch (error: any) {
    console.error('Failed to create page', error);
    return { success: false, error: error.message || 'Failed to create page.' };
  }
}

export async function getLegalPages() {
  try {
    return await prisma.dynamicPage.findMany({
      where: { type: 'LEGAL', status: 'PUBLISHED' },
      select: { title: true, slug: true }
    });
  } catch (error) {
    return [];
  }
}

export async function getDynamicPage(slug: string) {
  try {
    return await prisma.dynamicPage.findUnique({
      where: { slug, status: 'PUBLISHED' }
    });
  } catch (error) {
    return null;
  }
}
