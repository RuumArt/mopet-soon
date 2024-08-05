/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  reactStrictMode: false,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
    prependData: `@use "styles/_helpers.scss" as *;`,
  },
  images: {
    deviceSizes: [1024, 1920],
    domains: ['cdn.shopify.com'],
  },
};

module.exports = nextConfig;
