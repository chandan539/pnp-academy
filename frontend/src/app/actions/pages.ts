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

export async function updatePage(id: string, formData: FormData) {
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

    if (existingPage && existingPage.id !== id) {
      return { success: false, error: 'A page with this slug already exists.' };
    }

    const page = await prisma.dynamicPage.update({
      where: { id },
      data: { slug, title, content, type }
    });

    revalidatePath('/admin/pages');
    revalidatePath(`/${slug}`);
    
    return { success: true, page };
  } catch (error: any) {
    console.error('Failed to update page', error);
    return { success: false, error: error.message || 'Failed to update page.' };
  }
}

export async function deletePage(id: string) {
  try {
    const page = await prisma.dynamicPage.findUnique({ where: { id } });
    if (!page) {
      return { success: false, error: 'Page not found.' };
    }
    
    // Prevent deletion of protected pages
    const protectedPages = ['home', 'onboarding', 'thank-you'];
    if (protectedPages.includes(page.slug)) {
      return { success: false, error: 'This page cannot be deleted.' };
    }

    await prisma.dynamicPage.delete({ where: { id } });
    revalidatePath('/admin/pages');
    revalidatePath(`/${page.slug}`);
    
    return { success: true };
  } catch (error: any) {
    console.error('Failed to delete page', error);
    return { success: false, error: error.message || 'Failed to delete page.' };
  }
}
