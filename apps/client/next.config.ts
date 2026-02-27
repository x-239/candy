import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["repo-types", "@repo/product-db"],
  turbopack: {
    root: "../../",
    resolveAlias: {
      "repo-types": "../../packages/types/src/index.ts",
    },
  },
};

export default nextConfig;
