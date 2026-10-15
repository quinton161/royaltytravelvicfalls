import data from "@/content/site.json";

export type ContentNode = string | {
  tag: string;
  href?: string;
  children: ContentNode[];
};

export type SitePage = {
  slug: string;
  title: string;
  description: string;
  blocks: ContentNode[];
  images: { src: string; alt: string }[];
};

export const pages: SitePage[] = data.pages;
export const logo = data.logo;
export const posts = pages.filter((page) => page.slug.startsWith("post/"));
export const navigation = [
  { href: "/", label: "Home" },
  { href: "/pricelist-2024", label: "Pricelist 2026" },
  { href: "/transfers", label: "Transfers" },
  { href: "/safari-activities", label: "Safari Activities" },
  { href: "/bike-tours", label: "Bike Tours" },
  { href: "/adrenalin-activites", label: "White Water Rafting" },
  { href: "/bridge-activities", label: "Bridge Activities" },
  { href: "/activities-and-tours", label: "Village Tour" },
  { href: "/accommodation", label: "Accommodation" },
  { href: "/contact-us", label: "Contact Us" },
  { href: "/about-us", label: "About Us" },
  { href: "/blog", label: "Blog" },
];

export function getPage(slug: string) {
  return pages.find((page) => page.slug === slug);
}

export function plainText(node: ContentNode): string {
  return typeof node === "string" ? node : node.children.map(plainText).join("");
}
