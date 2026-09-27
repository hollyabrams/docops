import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  output: "export",

  basePath: isProd ? "/docops" : "",
  assetPrefix: isProd ? "/docops/" : "",

  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],

  images: {
    unoptimized: true,
  },
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
