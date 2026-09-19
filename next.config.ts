import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The portfolio is fully static; export to `out/` so hosting does not depend
  // on a framework preset or an output-directory setting.
  output: "export",
  turbopack: {
    root: process.cwd(),
    rules: {
      "*.svg": {
        loaders: ["@svgr/webpack"],
        as: "*.js",
      },
    },
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
