/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'cdn.pixabay.com' },
      { protocol: 'https', hostname: '**.supabase.co' },
    ],
    unoptimized: true,
  },
  experimental: {
    serverComponentsExternalPackages: ['pg', 'drizzle-orm'],
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@shared': new URL('./shared', import.meta.url).pathname,
      '@assets': new URL('./attached_assets', import.meta.url).pathname,
      '@server': new URL('./server', import.meta.url).pathname,
    };
    const clientSrcPath = new URL('./client/src/', import.meta.url).pathname;
    const origResolver = config.resolve.plugins || [];
    config.resolve.plugins = [
      ...origResolver,
      {
        apply(resolver) {
          resolver.getHook('described-resolve').tapAsync('AtSlashAlias', (request, _ctx, cb) => {
            const mod = request.request;
            if (mod && mod.startsWith('@/')) {
              const newRequest = Object.assign({}, request, {
                request: clientSrcPath + mod.slice(2),
              });
              resolver.doResolve(resolver.ensureHook('resolve'), newRequest, null, _ctx, cb);
            } else {
              cb();
            }
          });
        },
      },
    ];
    return config;
  },
};

export default nextConfig;
