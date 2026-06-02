import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/:locale(en|ar)/blogs/:slug",
        destination: "/:locale/blog/:slug",
        permanent: true,
      },
    ];
  },
  transpilePackages: ['swiper', 'swiper/react'],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "klmedwkmxkdycsrskirq.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
  experimental: {
    turbopackFileSystemCacheForDev: true,
  },
};

export default withNextIntl(nextConfig);
