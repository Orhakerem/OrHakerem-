import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Enable strict mode for better development experience
  reactStrictMode: true,
  // Configure build output
  output: 'standalone',
  // Remove experimental.serverActions as it's no longer needed in Next.js 15
  // Remove i18n configuration as it's not supported in App Router
};

export default nextConfig;