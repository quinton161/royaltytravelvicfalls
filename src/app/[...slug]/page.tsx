import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContentPage } from "@/components/content-page";
import { getPage, pages } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return pages.filter((page) => page.slug).map((page) => ({ slug: page.slug.split("/") }));
}

type Props = { params: Promise<{ slug: string[] }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = getPage(slug.join("/"));
  if (!page) notFound();
  return {
    title: page.title,
    description: page.description || undefined,
    alternates: { canonical: `/${page.slug}` },
    openGraph: { title: page.title, description: page.description, url: `/${page.slug}`, images: page.images[0] ? [page.images[0].src] : [] },
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const page = getPage(slug.join("/"));
  if (!page) notFound();
  return <ContentPage page={page} />;
}
