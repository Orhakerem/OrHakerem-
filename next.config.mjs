import { fileURLToPath } from 'url';

// Empty stand-in used to strip Next.js's unconditional client polyfill bundle.
const emptyModulePath = fileURLToPath(
  new URL('./scripts/empty-module.js', import.meta.url),
);

/** @type {import('next').NextConfig} */
const nextConfig = {
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
    // Enable image optimization for Vercel
    unoptimized: false,
  },

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

  async redirects() {
    return [
      {
        source: '/concierge-services',
        destination: '/services',
        permanent: true,
      },
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'orhakerem.com',
          },
        ],
        destination: 'https://www.orhakerem.com/:path*',
        permanent: true,
      },
    ];
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

  // Webpack configuration to resolve dependency issues
  webpack: (config, { isServer, webpack }) => {
    // Fix for native dependencies on client side
    if (!isServer) {
      // Strip Next.js's unconditional client polyfill bundle (polyfill-module),
      // which Next requires into the client runtime for every browser. It
      // polyfills Array.prototype.at/flat/flatMap, Object.fromEntries/hasOwn and
      // String.prototype.trimStart/trimEnd — all natively supported by our
      // browserslist target — so shipping it is dead weight that PageSpeed flags
      // as unnecessary "legacy JavaScript". It is required via a relative path
      // inside Next, so resolve.alias can't catch it; replace the module instead.
      config.plugins.push(
        new webpack.NormalModuleReplacementPlugin(
          /[\\/]polyfills[\\/]polyfill-module(\.js)?$/,
          emptyModulePath,
        ),
      );
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        crypto: false,
        stream: false,
        url: false,
        zlib: false,
        http: false,
        https: false,
        assert: false,
        os: false,
        path: false,
        'tunnel-agent': false,
      };
    }

    // Only externalize canvas as it's not handled by serverExternalPackages
    config.externals = config.externals || [];
    config.externals.push({
      'canvas': 'commonjs canvas',
    });

    return config;
  },
};

export default nextConfig;
