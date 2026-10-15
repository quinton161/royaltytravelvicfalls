import type { SitePage } from "./site";

// Use the original site's photographs. These choices only control presentation.
export const fallsPhoto = {
  src: "/images/090a0b_2e5fed25f0604c7c8636337d712b6b5f~mv2.jpg",
  alt: "Victoria Falls and the surrounding gorge",
};

const heroIndex: Record<string, number> = {
  "about-us": 1,
  "safari-activities": 1,
  accommodation: 1,
  "adrenalin-activites": 1,
  "bridge-activities": 4,
};

export function heroImageFor(page: SitePage) {
  if (["transfers", "contact-us", "pricelist-2024"].includes(page.slug)) return undefined;
  return page.images[heroIndex[page.slug] ?? 0];
}

export const servicePhotos = [
  fallsPhoto,
  { src: "/images/090a0b_d181364d97b140b6b69da031de6c1765~mv2.jpg", alt: "Guided white-water rafting on the Zambezi" },
  { src: "/images/090a0b_5c08631bfc124e6180fcd31251232b0c~mv2.jpg", alt: "Victoria Falls lodge and gardens" },
  { src: "/images/090a0b_502c92213a114663b5f4bcb7335c5d13~mv2.jpg", alt: "A guided group on the Victoria Falls Bridge" },
  { src: "/images/090a0b_51c59ec2a3ed4758afb44ea3f944a273~mv2.jpg", alt: "Visitors meeting the community at Monde Village" },
  { src: "/images/090a0b_b59bf282f81640c58a19cc553dc4bb63~mv2.jpg", alt: "Travellers on a group bicycle tour" },
];

export const pricePhotos = [
  servicePhotos[1],
  { src: "/images/090a0b_18fbc437688849c3812fb2ce11e0257a~mv2.jpg", alt: "Wildlife game drive near Victoria Falls" },
  { src: "/images/090a0b_670967a6dbcd4ce9848faa0300e9abe4~mv2.jpg", alt: "A Zambezi River cruise" },
];

export function photoFocus(image: { src: string }) {
  if (image.src.includes("619f0eb")) return "50% 25%";
  if (image.src.includes("b59bf282")) return "50% 58%";
  if (image.src.includes("f17b0468")) return "50% 55%";
  return "50% 50%";
}
