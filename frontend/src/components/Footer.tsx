import React from 'react';
import Link from 'next/link';
import { getLegalPages } from '@/app/actions/pages';

export default async function Footer() {
  const legalPages = await getLegalPages();

  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
        <div className="text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} PnP Academy. All rights reserved.
        </div>
        <div className="flex space-x-6 mt-4 md:mt-0">
          {legalPages.map((page) => (
            <Link 
              key={page.slug} 
              href={`/${page.slug}`} 
              className="text-sm text-gray-500 hover:text-gray-900"
            >
              {page.title}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
