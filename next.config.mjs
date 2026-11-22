/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  experimental: {
    serverComponentsExternalPackages: ['node:sqlite'],
  },
  async redirects() {
    return [
      {
        source: '/:locale(ar|en)/preview/dental/booking',
        destination: '/:locale/preview/dental/request-appointment',
        permanent: false,
      },
      {
        source: '/:locale(ar|en)/preview/ecommerce/shop',
        destination: '/:locale/preview/ecommerce/collections',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;

