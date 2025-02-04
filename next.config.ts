import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https", // Specify protocol (e.g., 'https' or 'http')
        hostname: "sapphire-tragic-echidna-193.mypinata.cloud", // Allowed domain
        port: "", // Optional port (leave empty for default)
        pathname: "/files/**", // Match specific paths using wildcards
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "15mb",
    },
  },
};

export default nextConfig;
