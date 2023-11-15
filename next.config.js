/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        pathname: '**',
        hostname: '**',
      },
    ],
  },
  publicRuntimeConfig: {
    locale: 'en',
    currentLocale: 'en',
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '20mb',
      allowedForwardedHosts: [process.env.NEXT_PUBLIC_FORWARDED],
      allowedOrigins: [process.env.NEXT_PUBLIC_ORIGIN],
    },
  },
}

module.exports = nextConfig
