import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // Pin Turbopack's workspace root to this project so the inferred-root warning
  // (caused by a stray package-lock.json elsewhere on disk) goes away.
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
