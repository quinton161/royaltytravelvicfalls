import assert from "node:assert/strict";
import { readFile, access } from "node:fs/promises";

const base = process.env.SITE_URL || "http://localhost:3000";
const { pages, logo } = JSON.parse(await readFile(new URL("../src/content/site.json", import.meta.url), "utf8"));
const paths = new Set([...pages.map((page) => `/${page.slug}`), "/pay"]); // /pay is a code route, not in site.json
let checkedImages = 0;

function plainText(node) {
  return typeof node === "string" ? node : node.children.map(plainText).join("");
}

function normalize(value) {
  return value.replace(/\s+/g, "").toLowerCase();
}

function decodeHtml(value) {
  const named = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: "\u00a0" };
  return value.replace(/&(#x[\da-f]+|#\d+|amp|lt|gt|quot|apos|nbsp);/gi, (_, entity) => {
    if (entity.startsWith("#x")) return String.fromCodePoint(parseInt(entity.slice(2), 16));
    if (entity.startsWith("#")) return String.fromCodePoint(parseInt(entity.slice(1), 10));
    return named[entity.toLowerCase()];
  });
}

function checkLinks(node) {
  if (typeof node === "string") return;
  if (node.href?.startsWith("/")) {
    assert(paths.has(node.href.split("#")[0]), `Unknown internal link: ${node.href}`);
  }
  node.children.forEach(checkLinks);
}

for (const page of pages) {
  const path = `/${page.slug}`;
  const response = await fetch(base + path);
  assert.equal(response.status, 200, path);
  const html = await response.text();
  assert(html.includes('id="main-content"'), `Missing main landmark: ${path}`);
  assert(/<h1(?:\s|>)/.test(html), `Missing heading: ${path}`);
  assert(html.includes('rel="canonical"'), `Missing canonical URL: ${path}`);
  assert(!html.includes("static.parastorage.com"), `Wix runtime dependency: ${path}`);
  const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)?.[1];
  assert(main, `Missing rendered content: ${path}`);
  // Ignore the added "Pay now" buttons inside price rows when comparing original content.
  const rendered = normalize(decodeHtml(main.replace(/<a class="rate-pay"[^>]*>[\s\S]*?<\/a>/g, " ").replace(/<[^>]*>/g, " ")));
  for (const [index, block] of page.blocks.entries()) {
    assert(rendered.includes(normalize(plainText(block))), `Original content changed or missing: ${path}, block ${index}`);
  }
  assert.equal((html.match(/alt="Royalty Travel Victoria Falls"/g) || []).length, 2, `Original header/footer logos: ${path}`);
  assert(html.includes(encodeURIComponent(logo)), `Original logo asset missing: ${path}`);
  assert.equal((html.match(/<form(?:\s|>)/g) || []).length, 1, `Expected one enquiry form: ${path}`);
  const ids = [...html.matchAll(/\sid="([^\"]+)"/g)].map((match) => match[1]);
  assert.equal(new Set(ids).size, ids.length, `Duplicate anchor IDs on ${path}`);
  for (const [, href] of html.matchAll(/href="([^\"]+)"/g)) {
    if (href.startsWith("/") && !href.startsWith("/_next/") && !href.startsWith("/images/")) {
      assert(paths.has(href.split(/[?#]/)[0]), `Broken rendered link on ${path}: ${href}`);
    }
  }
  page.blocks.forEach(checkLinks);
  for (const image of page.images) {
    await access(new URL(`../public${image.src}`, import.meta.url));
    checkedImages++;
  }
  const legacy = page.slug ? `${path}.html` : "/index.html";
  const redirect = await fetch(base + legacy, { redirect: "manual" });
  assert.equal(redirect.status, 308, legacy);
  assert.equal(new URL(redirect.headers.get("location"), base).pathname, path, legacy);
}

assert.equal((await fetch(`${base}/does-not-exist`)).status, 404);
for (const path of ["/sitemap.xml", "/robots.txt", "/blog-feed.xml"]) {
  assert.equal((await fetch(base + path)).status, 200, path);
}
const image = pages.find((page) => page.images.length)?.images[0];
const optimized = await fetch(`${base}/_next/image?url=${encodeURIComponent(image.src)}&w=640&q=75`);
assert.equal(optimized.status, 200, "Image optimisation");
assert(optimized.headers.get("content-type")?.startsWith("image/"));
console.log(`Verified ${pages.length} pages, original content and logos, one enquiry form per page, rendered links, legacy redirects, ${checkedImages} image references, image optimisation, 404, sitemap, robots and RSS.`);
