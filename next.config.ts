import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Pas de fichiers d'instructions pour agents dans un projet client.
  agentRules: false,
  poweredByHeader: false,
  images: {
    // L'AVIF pèse ~25 % de moins que le WebP, mais il est long à encoder. En
    // production chaque image n'est encodée qu'une fois puis mise en cache :
    // le coût est payé une seule fois pour un gain permanent. En développement
    // il n'y a pas de cache durable, et chaque photo se ferait attendre à
    // chaque redémarrage — d'où le WebP seul pendant le travail.
    formats:
      process.env.NODE_ENV === 'development'
        ? ['image/webp']
        : ['image/avif', 'image/webp'],
    deviceSizes: [400, 640, 800, 1080, 1200, 1600, 2000],
    imageSizes: [200, 300, 400, 600],
  },
};

export default nextConfig;
