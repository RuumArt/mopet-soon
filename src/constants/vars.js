import AppData from '../../package.json';

export const isDev = process.env.NODE_ENV === 'development';
export const isProd = process.env.NODE_ENV === 'production';

export const isClient = typeof document !== 'undefined';
export const isServer = !isClient;

if (typeof process.env.NEXT_PUBLIC_SITE_URL !== 'string') {
  throw new Error(
    `Please set the NEXT_PUBLIC_SITE_URL environment variable to your site's URL.
    
1. Create .env file at the root of your project.
2. Add NEXT_PUBLIC_SITE_URL=http://localhost:3000
3. For other environments (like production), make sure you set the correct URL.
    `
  );
}

export const siteURL = new URL(process.env.NEXT_PUBLIC_SITE_URL);
export const siteOrigin = siteURL.origin;

export const gaTrackingId = process.env.NEXT_PUBLIC_GA_TRACKING_ID;

export const APP_INFO = {
  APP_NAME: AppData.name,
  APP_DEFAULT_TITLE: 'Monpet',
  APP_TITLE_TEMPLATE: '%s - Monpet',
  APP_DESCRIPTION: 'description',
  APP_KEYWORDS: ['key 1', 'key 2'],
  APP_AUTHORS: [{ name: 'SNP', url: 'https://snp.agency/' }],
  APP_DEFAULT_OG: '/og-image.png',
  APP_BASE_URL: siteURL,
};
