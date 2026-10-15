import type { MetadataRoute } from "next";
import { pages } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.map((page) => ({ url: `https://www.royaltytravelvicfalls.com/${page.slug}` }));
}
