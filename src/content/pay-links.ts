// Wix Pay Links (Wix dashboard → Getting Paid → Pay Links).
// Payments are processed by the DPO gateway connected in Wix and paid out to the DPO account.
// Pay Links open on pay.royaltytravelvicfalls.com, the Wix primary domain.
// www and the bare domain are served by Vercel, so links on them never reach Wix.
export const PAY_BASE_URL =
  process.env.NEXT_PUBLIC_WIX_PAY_BASE_URL ?? "https://pay.royaltytravelvicfalls.com";

export const WHATSAPP_NUMBER = "263774489958";

export type PayLink = {
  id: string;
  name: string;
  price: number;
  category: "Explore" | "Adventure" | "Experience";
  /** Matches the activity's row label on the price list. */
  match: RegExp;
  /** Activity pages (site.json slugs) that show a Pay button for this link. */
  pages: string[];
};

export const payLinks: PayLink[] = [
  { id: "sqHf2ULEEDEo", name: "Devil's Pool (AM)", price: 190, category: "Explore", match: /devil/i, pages: ["safari-activities"] },
  { id: "yRvI8jiUF6oc", name: "Full Day Chobe", price: 180, category: "Explore", match: /full day chobe/i, pages: ["safari-activities"] },
  { id: "eIiwOVwcg1hn", name: "Game Drive (AM/PM)", price: 153, category: "Explore", match: /^game drive/i, pages: ["safari-activities"] },
  { id: "Z2ilu7NljYNB", name: "White Water Rafting (High Water)", price: 161, category: "Adventure", match: /rafting.*high/i, pages: ["adrenalin-activites"] },
  { id: "mS6hiV4rFjzZ", name: "White Water Rafting (Low Water)", price: 173, category: "Adventure", match: /rafting.*low/i, pages: ["adrenalin-activites"] },
  { id: "wDDnuD2g3qBj", name: "Bungee Jump", price: 174, category: "Adventure", match: /^bun(g|j)/i, pages: ["bridge-activities"] },
  { id: "btzjFzp1yHyQ", name: "Zip-line", price: 105, category: "Adventure", match: /^zip-?\s?line/i, pages: ["bridge-activities"] },
  { id: "qz2fUVJkfRw5", name: "15 Min Helicopter Flight", price: 175, category: "Experience", match: /15 ?mins? helicopter/i, pages: [] },
  { id: "SB-PPbSc_DUX", name: "Sunset Cruise", price: 50, category: "Experience", match: /^sunset cruise/i, pages: ["safari-activities"] },
];

export const payUrl = (id: string) => `${PAY_BASE_URL}/_paylink/${id}`;

export const payLinkFor = (label: string) => payLinks.find((p) => p.match.test(label.trim()));

export const payLinksForPage = (slug: string) => payLinks.filter((p) => p.pages.includes(slug));

export const whatsappUrl = (activity?: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=` +
  encodeURIComponent(
    activity
      ? `Hello Royalty Travel, I would like to book ${activity}. Is my date available? Date: , Number of people: `
      : "Hello Royalty Travel, I would like to book and pay online. Activity: , Date: , Number of people: ",
  );
