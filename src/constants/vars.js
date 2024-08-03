import AppData from '../../package.json';

export const isDev = process.env.NODE_ENV === 'development';
export const isProd = process.env.NODE_ENV === 'production';

export const isClient = typeof document !== 'undefined';
export const isServer = !isClient;

// if (typeof process.env.NEXT_PUBLIC_SITE_URL !== 'string') {
//   throw new Error(
//     `Please set the NEXT_PUBLIC_SITE_URL environment variable to your site's URL.
//
// 1. Create .env file at the root of your project.
// 2. Add NEXT_PUBLIC_SITE_URL=http://localhost:3000
// 3. For other environments (like production), make sure you set the correct URL.
//     `
//   );
// }

export const siteUrlEnv = 'https://monpet.com/';

export const siteURL = new URL(siteUrlEnv);
export const siteOrigin = siteURL.origin;

export const roomLog = `

██████╗  ██████╗  ██████╗ ███╗   ███╗
██╔══██╗██╔═══██╗██╔═══██╗████╗ ████║
██████╔╝██║   ██║██║   ██║██╔████╔██║
██╔══██╗██║   ██║██║   ██║██║╚██╔╝██║
██║  ██║╚██████╔╝╚██████╔╝██║ ╚═╝ ██║
╚═╝  ╚═╝ ╚═════╝  ╚═════╝ ╚═╝     ╚═╝

Всегда готовы к новым проектам: https://t.me/room_dev
`;

export const gaTrackingId = process.env.NEXT_PUBLIC_GA_TRACKING_ID;

export const APP_INFO = {
  APP_NAME: AppData.name,
  APP_DEFAULT_TITLE:
    'Инновационная платформа 8в1 для содержания и помощи животным | Monpet',
  APP_TITLE_TEMPLATE: '%s | Monpet',
  APP_DESCRIPTION:
    'Поддержите разработку первого в мире приложения, которое с помощью технологии MonAI персонализирует 8 ключевых сервисов для правильного и безопасного ухода за питомцами и включает в себя крупнейшую платформу Monifico для спасения животных.',
  APP_KEYWORDS: [],
  APP_AUTHORS: [{ name: 'Room', url: 'https://t.me/room_dev' }],
  APP_DEFAULT_OG: '/og-image.png',
  APP_BASE_URL: siteURL,
};
