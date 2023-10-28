/** @type {import('next').NextConfig} */

const nextConfig = {
  webpack: (config) => {
    config.module.rules.push({
      test: /sharp/,
      use: 'raw-loader',
    })

    return config
  },
  images: {
    domains: [
      process.env.NEXT_PUBLIC_URL,
      process.env.NEXT_PUBLIC_IMAGE_URL,
      '*',
    ],
    remotePatterns: [
      {
        protocol: process.env.NEXT_PUBLIC_PROTOCOL,
        hostname: '**',
      },
    ],
  },
}

module.exports = nextConfig
