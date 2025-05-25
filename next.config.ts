import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Enable strict mode for better development experience
  reactStrictMode: true,
  // Ensure proper encoding for API routes
  experimental: {
    serverActions: true
  },
  // Configure build output
  output: 'standalone',
  // Ensure proper character encoding
  i18n: {
    locales: ['en'],
    defaultLocale: 'en'
  }
};

export default nextConfig;