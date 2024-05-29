/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'blog.moove-it.com',
        port: '',
        pathname: 'blog.moove-it.com',
      },
    ],
  },
}

module.exports = nextConfig

