/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['getthematic.com', 'interactive-examples.mdn.mozilla.net', 'filedn.com'],
  },
}

module.exports = nextConfig
