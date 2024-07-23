/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  reactStrictMode: false,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
    prependData: `@use "styles/_helpers.scss" as *;`,
  },
  redirects: async () => {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
    ];
  },
  rewrites: async () => {
    return [
      {
        source: '/',
        destination: '/home',
      },
    ];
  },
};

module.exports = nextConfig;
