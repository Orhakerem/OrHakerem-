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
    // Optimisation des images
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Configure external packages
  serverExternalPackages: ['resend', 'sharp'],

  // Configure experimental features for better performance
  experimental: {
    // Enable optimized package imports
    optimizePackageImports: ['lucide-react', 'react-hot-toast'],
    // Optimisation du CSS
    optimizeCss: true,
    // Optimisation des polices
    fontLoaders: [
      { loader: '@next/font/google', options: { subsets: ['latin'] } },
    ],
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
          // Cache des polices
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      // Headers spécifiques pour les polices
      {
        source: '/fonts/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      // Headers pour les images
      {
        source: '/images/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
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
  webpack: (config, { isServer, dev }) => {
    // Fix for native dependencies on client side
    if (!isServer) {
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

    // Optimisations pour la production
    if (!dev) {
      // Optimisation des chunks
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              chunks: 'all',
            },
          },
        },
      };
    }

    return config;
  },

  // Optimisation du bundle
  swcMinify: true,
  
  // Optimisation des redirections
  async redirects() {
    return [];
  },

  // Optimisation des rewrites
  async rewrites() {
    return [];
  },
};

export default nextConfig;