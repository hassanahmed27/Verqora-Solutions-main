/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'mahadhussaini.netlify.app',
      },
    ],
  },
};
module.exports = nextConfig;
