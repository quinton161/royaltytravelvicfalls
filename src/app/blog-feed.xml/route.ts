import { posts, plainText } from "@/lib/site";

export const dynamic = "force-static";

const escapeXml = (value: string) => value.replace(/[<>&"']/g, (char) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", '"': "&quot;", "'": "&apos;" })[char]!);

export function GET() {
  const base = "https://www.royaltytravelvicfalls.com";
  const items = posts.map((post) => {
    const url = `${base}/${post.slug}`;
    const description = post.blocks.map(plainText).join(" ").slice(0, 400);
    return `<item><title>${escapeXml(post.title)}</title><link>${url}</link><guid>${url}</guid><description>${escapeXml(description)}</description></item>`;
  }).join("");
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>Royalty Travel Victoria Falls</title><link>${base}/blog</link><description>Travel stories from Royalty Travel</description>${items}</channel></rss>`, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
