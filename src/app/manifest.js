import AppData from '../../package.json';

export default function manifest() {
  return {
    name: AppData.name,
    short_name: AppData.name,
    description: AppData.description,
    start_url: '/',
    display: 'standalone',
    background_color: '#000',
    theme_color: '#fff',
    icons: [
      {
        src: '/icon',
        sizes: 'any',
        type: 'image/png',
      },
      {
        src: '/icon',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/apple-icon',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
    ],
  };
}
