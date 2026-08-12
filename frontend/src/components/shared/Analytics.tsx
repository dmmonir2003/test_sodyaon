"use client";

import { useEffect, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Script from "next/script";
import { useGetPublicMarketingSettingsQuery } from "@/store/admin/settingsApi";

// Internal logic component that handles route change triggers
function AnalyticsTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { data: response } = useGetPublicMarketingSettingsQuery();
  const publicSettings = response?.data;

  useEffect(() => {
    if (!publicSettings) return;

    const fullUrl = `${pathname}${searchParams.toString() ? `?${searchParams.toString()}` : ""}`;
    console.log(`[Analytics Router View]: ${fullUrl}`);

    // Trigger dynamic page views when standard SPA routing updates
    if (publicSettings.ga4MeasurementId && typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("config", publicSettings.ga4MeasurementId, {
        page_path: fullUrl,
      });
    }

    if (publicSettings.metaPixelId && typeof window !== "undefined" && (window as any).fbq) {
      (window as any).fbq("track", "PageView");
    }

    if (publicSettings.tiktokPixelId && typeof window !== "undefined" && (window as any).ttq) {
      (window as any).ttq.page();
    }
  }, [pathname, searchParams, publicSettings]);

  return null;
}

// Parent safe component that loads scripts and triggers trackers
export default function Analytics() {
  const { data: response } = useGetPublicMarketingSettingsQuery();
  const publicSettings = response?.data;

  return (
    <>
      <Suspense fallback={null}>
        <AnalyticsTracker />
      </Suspense>

      {/* 1. Google Tag Manager (GTM) Container */}
      {publicSettings?.gtmContainerId && (
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${publicSettings.gtmContainerId}');
            `,
          }}
        />
      )}

      {/* 2. Google Analytics 4 (GA4) Tag */}
      {publicSettings?.ga4MeasurementId && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${publicSettings.ga4MeasurementId}`}
            strategy="afterInteractive"
          />
          <Script
            id="ga4-script"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${publicSettings.ga4MeasurementId}', {
                  page_path: window.location.pathname,
                });
              `,
            }}
          />
        </>
      )}

      {/* 3. Meta (Facebook) Browser Pixel */}
      {publicSettings?.metaPixelId && (
        <Script
          id="meta-pixel-script"
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
              fbq('init', '${publicSettings.metaPixelId}');
              fbq('track', 'PageView');
            `,
          }}
        />
      )}

      {/* 4. TikTok Pixel */}
      {publicSettings?.tiktokPixelId && (
        <Script
          id="tiktok-pixel-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function (w, d, t) {
                w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var e=0;e<ttq.methods.length;e++)ttq.setAndDefer(ttq,ttq.methods[e]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e};ttq.load=function(e,n){var o="https://analytics.tiktok.com/i18n/pixel/events.js";ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=o,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};var a=document.createElement("script");a.type="text/javascript",a.async=!0,a.src=o;var i=document.getElementsByTagName("script")[0];i.parentNode.insertBefore(a,i)};
                ttq.load('${publicSettings.tiktokPixelId}');
                ttq.page();
              }(window, document, 'ttq');
            `,
          }}
        />
      )}
    </>
  );
}
