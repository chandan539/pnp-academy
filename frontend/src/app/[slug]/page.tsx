import React from 'react';
import { notFound } from 'next/navigation';
import { getDynamicPage } from '@/app/actions/pages';
import Footer from '@/components/Footer';

export default async function DynamicPageRoute({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = await getDynamicPage(slug);

  if (!page) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <main className="flex-grow max-w-4xl mx-auto py-12 px-6 sm:px-12 w-full">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-8">{page.title}</h1>
        <div 
          className="prose prose-blue max-w-none text-gray-700"
          dangerouslySetInnerHTML={{ __html: page.content }}
        />
      </main>
      <Footer />
    </div>
  );
}
