/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ['vm-7bww7jdp5myoxefgzc3tpa0i.vusercontent.net'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn-icons-png.flaticon.com',
      },
    ],
  },
};

module.exports = nextConfig;
