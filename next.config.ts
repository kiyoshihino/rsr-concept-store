import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        // Hostinger — servidor de imagens de produtos
        protocol: "https",
        hostname: "rsrconceptstore.aartdigital.site",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
