import { Providers } from '../providers';

import 'styles/globals.scss';

import { APP_INFO } from 'constants/vars';
import { AppHooks } from 'lib/app-hooks';
import { Header } from 'components/Header';
import { fonts } from '../fonts';

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  // themeColor: 'black',
};

export const metadata = {
  metadataBase: APP_INFO.APP_BASE_URL,
  title: {
    default: APP_INFO.APP_DEFAULT_TITLE,
    template: APP_INFO.APP_TITLE_TEMPLATE,
  },
  description: APP_INFO.APP_DESCRIPTION,
  alternates: {
    canonical: '/',
    /* IF YOU NEED */
    // languages: {
    //   'en-US': '/en-US',
    //   'de-DE': '/de-DE',
    // },
  },
  // applicationName: APP_INFO.APP_NAME,
  keywords: APP_INFO.APP_KEYWORDS,
  authors: APP_INFO.APP_AUTHORS,
  openGraph: {
    images: [
      {
        url: '/og-image-200.jpg',
        width: 200,
        height: 200,
      },
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
      },
    ],
  },
  // openGraph: {
  //   type: 'website',
  //   siteName: APP_INFO.APP_NAME,
  //   title: {
  //     default: APP_INFO.APP_DEFAULT_TITLE,
  //     template: APP_INFO.APP_TITLE_TEMPLATE,
  //   },
  //   description: APP_INFO.APP_DESCRIPTION,
  //   url: APP_INFO.APP_BASE_URL,
  // },
  twitter: {
    // card: 'summary_large_image',
    title: {
      default: APP_INFO.APP_DEFAULT_TITLE,
      template: APP_INFO.APP_DEFAULT_TITLE,
    },
    description: APP_INFO.APP_DESCRIPTION,
  },
  icons: [
    {
      rel: 'apple-touch-icon',
      url: '/favicon/apple-touch-icon.png',
    },
    {
      rel: 'icon',
      url: '/favicon/favicon.ico',
      sizes: 'any',
    },
    {
      rel: 'icon',
      sizes: '192x192',
      url: '/favicon/android-chrome-192x192.png',
    },
    {
      rel: 'icon',
      sizes: '512x512',
      url: '/favicon/android-chrome-512x512.png',
    },
  ],
  manifest: '/manifest.webmanifest',
  verification: {
    // google: 'google',
    // yandex: 'yandex',
    // yahoo: 'yahoo',
    // other: {
    //   me: ['my-email', 'my-link'],
    // },
  },
};

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'ru' }];
}

export default function RootLayout({ children, params }) {
  return (
    <html
      lang={params.lang}
      className={fonts?.className}
    >
      <body>
        <Providers>
          <Header lang={params.lang} />
          {children}
          <AppHooks />
        </Providers>
      </body>
    </html>
  );
}
