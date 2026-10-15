import type { Metadata } from "next";
import { LandingPage } from "@/components/landing-page";
import { getPage, plainText } from "@/lib/site";
import { fallsPhoto, servicePhotos } from "@/lib/visuals";
import "./landing.css";

const page = getPage("")!;
export const metadata: Metadata = {
  title: { absolute: page.title },
  description: page.description,
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return <LandingPage content={{
    aboutTitle: plainText(page.blocks[0]),
    aboutText: plainText(page.blocks[1]),
    servicesTitle: plainText(page.blocks[2]),
    servicesText: plainText(page.blocks[3]),
    services: page.blocks.slice(4).map((block, index) => ({ title: plainText(block), image: servicePhotos[index] })),
    heroImage: fallsPhoto,
    aboutImage: page.images[1],
  }} />;
}
