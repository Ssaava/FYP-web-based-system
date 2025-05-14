import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  experimental: {
    webpackBuildWorker: true,
    parallelServerBuildTraces: true,
    parallelServerCompiles: true,
  },
  async rewrites() {
    return [
      {
        source: "/proxy/:path*", // You call /proxy/xyz
        destination: "http://127.0.0.1:5000/:path*",
      },
    ];
  },
};

export default nextConfig;
