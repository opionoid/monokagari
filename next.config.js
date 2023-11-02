/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  poweredByHeader: false,
  experimental: {
    typedRoutes: true,
  },
}

module.exports = nextConfig
