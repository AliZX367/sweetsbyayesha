import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
    // Avoid stale optimized images while iterating locally (Simple Browser / devtools cache).
    ...(process.env.NODE_ENV === "development" ? { minimumCacheTTL: 0 } : {}),
  },
};

export default nextConfig;
