import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/index.html", destination: "/", permanent: true },
      { source: "/:page.html", destination: "/:page", permanent: true },
      { source: "/post/:slug.html", destination: "/post/:slug", permanent: true },
      // Wix Pay Links only open on the bare (Wix-served) domain; forward any copied www links there.
      { source: "/_paylink/:id", destination: "https://royaltytravelvicfalls.com/_paylink/:id", permanent: false },
    ];
  },
};

export default nextConfig;
