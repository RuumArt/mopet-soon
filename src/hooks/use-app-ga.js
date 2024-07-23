import { useRouter } from 'next/router';
import Script from 'next/script';
import * as React from 'react';

import { gaTrackingId } from 'constants/vars';

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = url => {
  if (!window.gtag) {
    console.warn('window.gtag is not defined');
    return;
  }
  window.gtag('config', gaTrackingId, {
    page_path: url,
  });
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label, value }) => {
  if (!window.gtag) {
    console.warn('window.gtag is not defined');
    return;
  }
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value,
  });
};

export const GAScripts = () => {
  return (
    <>
      <Script
        strategy="afterInteractive"
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${gaTrackingId}`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gaTrackingId}', {
              page_path: window.location.pathname,
            });
            // you can add more gtags here like:
            // gtag('config', '<another-tracking-code>', {
            //   page_path: window.location.pathname,
            // });
          `,
        }}
      />
    </>
  );
};

export const useAppGA = () => {
  const router = useRouter();

  React.useEffect(() => {
    const handleRouteChange = url => {
      pageview(url);
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);
};
