import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/index.html", destination: "/", permanent: true },
      { source: "/:page.html", destination: "/:page", permanent: true },
      { source: "/post/:slug.html", destination: "/post/:slug", permanent: true },
    ];
  },
};

export default nextConfig;
