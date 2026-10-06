import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Product photos in /public/images are served as AVIF/WebP at responsive sizes.
    formats: ["image/avif", "image/webp"],
    qualities: [75],
  },
};

export default nextConfig;
