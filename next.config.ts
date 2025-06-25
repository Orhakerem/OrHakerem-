import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Enable strict mode for better development experience
  reactStrictMode: true,
  
  // Configure images to allow external sources
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      },
    ],
    // Optimize image loading
    formats: ['image/webp', 'image/avif'],
  },

  // Configure external packages
  serverExternalPackages: ['resend'],

  // Configure experimental features for better performance
  experimental: {
    // Enable optimized package imports
    optimizePackageImports: ['lucide-react', 'react-hot-toast'],
  },

  // Configure TypeScript for build
  typescript: {
    // Don't fail build on TypeScript errors in development
    ignoreBuildErrors: false,
  },

  // Configure ESLint for build
  eslint: {
    // Don't fail build on ESLint errors in development
    ignoreDuringBuilds: false,
  },

  // Configure headers for better performance
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ];
  },

  // Configure output for Vercel deployment
  output: 'standalone',

  // Vercel-specific optimizations
  poweredByHeader: false,
  compress: true,
};

export default nextConfig;