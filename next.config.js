const { withPlausibleProxy } = require('next-plausible');

/** @type {import('next').NextConfig} */
const nextConfig = withPlausibleProxy()({
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**'
      }
    ]
  },
  i18n: {
    locales: ['en', 'es', 'zh'],
    defaultLocale: 'zh'
  },
  experimental: {
    workerThreads: false,
    cpus: 1
  }
});

module.exports = nextConfig;
