import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Limit parallel build workers to avoid OOM on memory-constrained machines
    cpus: 2,
  },
};

export default nextConfig;
