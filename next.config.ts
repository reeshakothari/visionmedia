import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "geajhjiceaocsljqffkh.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
  experimental: {
    serverActions: {
      // Default is 1MB, which silently rejects most real phone photos (event
      // photography easily runs 3-10MB). Image uploads in the admin editor
      // go through a Server Action, so this limit applies to them directly.
      bodySizeLimit: "20mb",
    },
  },
};

export default nextConfig;
