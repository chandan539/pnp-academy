import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// Server-Side Conversion API handler
export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { eventName, eventData, sourceUrl } = data;

    // Fetch DB settings
    const settings = await prisma.appSetting.findMany({
      where: {
        key: { in: ['fb_capi_token', 'fb_pixel_id'] }
      }
    });
    const fbCapiToken = settings.find(s => s.key === 'fb_capi_token')?.value;
    const fbPixelId = settings.find(s => s.key === 'fb_pixel_id')?.value;


    // Log the conversion event for analytics
    console.log(`[CONVERSION API] Processing event: ${eventName}`, {
      sourceUrl,
      timestamp: new Date().toISOString(),
      ...eventData
    });

    if (fbCapiToken && fbPixelId) {
      await fetch(`https://graph.facebook.com/v19.0/${fbPixelId}/events`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          data: [{
            event_name: eventName,
            event_time: Math.floor(Date.now() / 1000),
            action_source: "website",
            event_source_url: sourceUrl,
            user_data: {
              em: eventData.hashedEmail ? [eventData.hashedEmail] : undefined
            }
          }],
          access_token: fbCapiToken
        })
      });
    }

    return NextResponse.json({ success: true, message: 'Conversion logged successfully' });
  } catch (error) {
    console.error('[CONVERSION API ERROR]', error);
    return NextResponse.json({ success: false, error: 'Failed to process conversion' }, { status: 500 });
  }
}
