import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: '',
        pathname: '/**'
      },
      {
        protocol: "https",
        hostname: "quick-book-reservations.s3.amazonaws.com",
        port: '',
        pathname: "/**"
      }
    ]
  }
};

export default nextConfig;
