import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const setting = await prisma.appSetting.findUnique({
      where: { key: 'website_favicon_base64' }
    });

    if (setting && setting.value) {
      // setting.value should look like "data:image/png;base64,iVBORw0KGgo..."
      const match = setting.value.match(/^data:(image\/[a-zA-Z+.-]+|image\/x-icon);base64,(.+)$/);
      if (match) {
        const contentType = match[1];
        const base64Data = match[2];
        const buffer = Buffer.from(base64Data, 'base64');
        
        return new NextResponse(buffer, {
          status: 200,
          headers: {
            'Content-Type': contentType,
            'Cache-Control': 'public, max-age=86400, stale-while-revalidate=43200',
          },
        });
      }
    }

    // Fallback to static favicon if no DB favicon is found
    // First try the app directory favicon
    let fallbackPath = path.join(process.cwd(), 'src', 'app', 'favicon.ico');
    if (!fs.existsSync(fallbackPath)) {
        fallbackPath = path.join(process.cwd(), 'public', 'favicon.ico');
    }
    
    if (fs.existsSync(fallbackPath)) {
      const buffer = fs.readFileSync(fallbackPath);
      return new NextResponse(buffer, {
        status: 200,
        headers: {
          'Content-Type': 'image/x-icon',
          'Cache-Control': 'public, max-age=86400',
        },
      });
    }

    // If fallback is also missing, return a generic 404
    return new NextResponse('Not found', { status: 404 });
  } catch (error) {
    console.error('Error fetching favicon:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
