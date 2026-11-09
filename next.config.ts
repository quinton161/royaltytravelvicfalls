import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/index.html", destination: "/", permanent: true },
      { source: "/:page.html", destination: "/:page", permanent: true },
      { source: "/post/:slug.html", destination: "/post/:slug", permanent: true },
      // Wix Pay Links live on the Wix primary domain (pay.); forward any copied www/bare links there.
      { source: "/_paylink/:id", destination: "https://pay.royaltytravelvicfalls.com/_paylink/:id", permanent: false },
    ];
  },
};

export default nextConfig;
