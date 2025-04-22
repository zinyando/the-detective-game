import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["@mastra/*"],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.pravatar.cc',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
