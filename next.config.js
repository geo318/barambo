/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: process.env.NEXT_PUBLIC_PROTOCOL,
        pathname: '**',
        hostname: '**',
      },
    ],
  },
  publicRuntimeConfig: {
    locale: 'en',
    currentLocale: 'en',
  },
}

module.exports = nextConfig
