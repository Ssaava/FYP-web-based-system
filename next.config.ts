import type { NextConfig } from "next";

// let userConfig = undefined;
// try {
//   userConfig = await import("./v0-user-next.config");
// } catch (e) {
//   // ignore error
// }

const nextConfig: NextConfig = {
  /* config options here */
  // eslint: {
  //   ignoreDuringBuilds: true,
  // },
  // typescript: {
  //   ignoreBuildErrors: true,
  // },
  images: {
    unoptimized: true,
  },
  experimental: {
    webpackBuildWorker: true,
    parallelServerBuildTraces: true,
    parallelServerCompiles: true,
  },
  // async rewrites() {
  //   return [
  //     {
  //       source: "/proxy/:path*", // You call /proxy/xyz
  //       destination: "http://1581-102-134-149-100.ngrok-free.app/:path*",
  //     },
  //   ];
  // },
};

// mergeConfig(nextConfig, userConfig);

// function mergeConfig(nextConfig, userConfig) {
//   if (!userConfig) {
//     return;
//   }

//   for (const key in userConfig) {
//     if (
//       typeof nextConfig[key] === "object" &&
//       !Array.isArray(nextConfig[key])
//     ) {
//       nextConfig[key] = {
//         ...nextConfig[key],
//         ...userConfig[key],
//       };
//     } else {
//       nextConfig[key] = userConfig[key];
//     }
//   }
// }

export default nextConfig;
