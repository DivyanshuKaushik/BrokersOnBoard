/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env:{
    BOB_API_URI: process.env.BOB_API_URI,
    IMAGE_DOMAIN: process.env.IMAGE_DOMAIN,
  },
  images:{
    domains:["stateflix-bucket.s3.ap-south-1.amazonaws.com","localhost","brokersonboard.com","www.brokersonboard.com"]
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig
