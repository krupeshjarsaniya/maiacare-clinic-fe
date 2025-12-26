// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "143.244.130.152",
        port: "3000",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "practo.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "*.practo.com", // ✅ for subdomains
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "zycruit.lon1.digitaloceanspaces.com",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "s3-ap-southeast-1.amazonaws.com", // ✅ Added S3 domain
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;