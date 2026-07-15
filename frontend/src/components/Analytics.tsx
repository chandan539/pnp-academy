'use client';

import Script from 'next/script';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import * as gtag from '@/lib/gtag';
import * as fbq from '@/lib/fpixel';

export default function Analytics({ gaId, fbPixelId }: { gaId?: string; fbPixelId?: string }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (pathname) {
      const isRestricted = pathname.startsWith('/admin') || pathname.startsWith('/api') || pathname === '/login';
      if (!isRestricted) {
        gtag.pageview(pathname);
        fbq.pageview();
      }
    }
  }, [pathname, searchParams]);

  // Don't inject tracking scripts on restricted pages
  if (pathname && (pathname.startsWith('/admin') || pathname.startsWith('/api') || pathname === '/login')) {
    return null;
  }

  return (
    <>
      {/* Google Analytics */}
      {gaId && (
        <>
          <Script
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
          />
          <Script
            id="gtag-init"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}', {
                  page_path: window.location.pathname,
                });
              `,
            }}
          />
        </>
      )}

      {/* Meta Pixel */}
      {fbPixelId && (
        <Script
          id="fb-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${fbPixelId}');
            `,
          }}
        />
      )}
    </>
  );
}
