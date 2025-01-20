import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  logging: { fetches: { fullUrl: true } },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        port: '',
        hostname: new URL(process.env.NEXT_PUBLIC_CLOUDFRONT_DOMAIN!).hostname,
        pathname: '/**'
      }
    ]
  }
};

export default nextConfig;
