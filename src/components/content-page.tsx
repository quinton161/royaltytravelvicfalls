import { createElement, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { posts, plainText, type ContentNode, type SitePage } from "@/lib/site";
import { ContactForm } from "./contact-form";
import { ScrollReveal } from "./scroll-reveal";
import { heroImageFor, pricePhotos, photoFocus } from "@/lib/visuals";

const allowedTags = new Set(["p", "h2", "h3", "ul", "ol", "li", "strong", "em", "b", "i", "u", "span"]);
const normalize = (text: string) => text.replace(/\s+/g, " ").trim().toLowerCase();

function renderNode(node: ContentNode, key: number, id?: string): ReactNode {
  if (typeof node === "string") return node;
  if (node.tag === "br") return <br key={key} />;
  const children = node.children.map((child, index) => renderNode(child, index));
  if (node.tag === "a" && node.href) {
    return node.href.startsWith("/") ? <Link href={node.href} key={key}>{children}</Link> : <a href={node.href} key={key}>{children}</a>;
  }
  // Wix sometimes stored whole paragraphs as headings. Preserve their text with readable semantics.
  const tag = /^h[23]$/.test(node.tag) && plainText(node).length > 180 ? "p" : node.tag;
  return createElement(allowedTags.has(tag) ? tag : "span", { key, id: /^h[23]$/.test(tag) ? id : undefined }, children);
}

function Blocks({ blocks, start = 0 }: { blocks: ContentNode[]; start?: number }) {
  return <div className="rich-content">{blocks.map((node, index) => renderNode(node, index, `section-${index + start}`))}</div>;
}

function lines(node: ContentNode): string[] {
  function withBreaks(part: ContentNode): string {
    return typeof part === "string" ? part : part.tag === "br" ? "\n" : part.children.map(withBreaks).join("");
  }
  return withBreaks(node).split(/\n/).map((line) => line.trim()).filter(Boolean);
}

function RateRows({ values }: { values: string[] }) {
  return <div className="rate-rows">{values.map((line, index) => {
    const match = line.match(/^(.*?)(US\$\s*[\d,]+(?:\.\d+)?|\$\s*[\d,]+(?:\.\d+)?)\s*$/);
    return match ? <dl className="rate-row" key={index}><dt>{match[1].trim()}</dt><dd>{match[2]}</dd></dl> : <h3 className="rate-subheading" key={index}>{line}</h3>;
  })}</div>;
}

function PageHero({ page }: { page: SitePage }) {
  const image = heroImageFor(page);
  const isPost = page.slug.startsWith("post/");
  return <section className={`page-hero${image ? " has-image" : ""}${isPost ? " post-hero" : ""}`} aria-labelledby="page-title">
    {!image ? <div className="page-hero-pattern" aria-hidden="true" /> : null}
    <div className="container page-hero-grid"><div className="page-hero-content"><nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">/</span>{isPost ? <><Link href="/blog">Blog</Link><span aria-hidden="true">/</span></> : null}<span aria-current="page">{page.title}</span></nav><span className="hero-rule" aria-hidden="true" /><h1 id="page-title">{page.title}</h1></div>{image ? <div className="page-hero-image"><Image src={image.src} alt={image.alt} fill priority sizes="(max-width: 800px) 100vw, 50vw" style={{objectPosition:photoFocus(image)}} /></div> : null}</div>
  </section>;
}

function Gallery({ images }: { images: SitePage["images"] }) {
  if (!images.length) return null;
  return <div className={`photo-gallery photo-count-${images.length}${images.length === 1 ? " single-photo" : ""}`} aria-label="Photo gallery">{images.map((image) => <div key={image.src} className="gallery-photo" data-reveal><Image src={image.src} alt={image.alt} fill sizes="(max-width: 650px) 100vw, 50vw" style={{objectPosition:photoFocus(image)}} /></div>)}</div>;
}

function ContactAside() {
  return <aside className="travel-aside" data-reveal><span className="section-marker" aria-hidden="true">↗</span><p>Start Planning Your Dream Trip Today</p><Link href="/contact-us" className="button">Contact Us <span aria-hidden="true">↗</span></Link><a className="aside-phone" href="tel:+263774489958">+263774489958</a><div className="aside-links"><Link href="/pricelist-2024">Pricelist 2026 <span aria-hidden="true">↗</span></Link><Link href="/transfers">Transfers <span aria-hidden="true">↗</span></Link><Link href="/accommodation">Accommodation <span aria-hidden="true">↗</span></Link></div></aside>;
}

export function ContentPage({ page }: { page: SitePage }) {
  const isPost = page.slug.startsWith("post/");
  const blocks = page.blocks.filter((block) => normalize(plainText(block)) !== normalize(page.title));
  let content: ReactNode;
  if (page.slug === "blog") content = <div className="container page-section"><BlogList /></div>;
  else if (page.slug === "pricelist-2024") content = <Prices page={page} />;
  else if (page.slug === "transfers") content = <Transfers page={page} />;
  else if (page.slug === "accommodation") content = <Accommodation page={page} />;
  else if (page.slug === "contact-us") content = <ContactPage blocks={blocks} />;
  else if (isPost) content = <Article page={page} blocks={blocks} />;
  else content = <TourPage page={page} blocks={blocks} />;
  return <ScrollReveal key={page.slug} className="interior-page"><main id="main-content"><PageHero page={page} />{content}</main></ScrollReveal>;
}

function TourPage({ page, blocks }: { page: SitePage; blocks: ContentNode[] }) {
  const remaining = page.images.filter((image) => image.src !== heroImageFor(page)?.src);
  const feature = remaining[0];
  return <div className="container page-section"><div className={`tour-intro-grid tour-${page.slug}`}><div className="tour-copy" data-reveal><Blocks blocks={blocks} /></div>{feature ? <div className="tour-feature-photo" data-reveal><Image src={feature.src} alt={feature.alt} fill sizes="(max-width: 800px) 100vw, 45vw" /><span className="photo-frame-accent" aria-hidden="true" /></div> : null}</div><Gallery images={remaining.slice(1)} /><div className="tour-enquiry-banner" data-reveal><p>Start Planning Your Dream Trip Today</p><Link href="/contact-us" className="button">Contact Us <span aria-hidden="true">↗</span></Link><a href="tel:+263774489958">+263774489958</a></div></div>;
}

function Prices({ page }: { page: SitePage }) {
  return <div className="container page-section"><div className="section-intro" data-reveal><Blocks blocks={[page.blocks[0]]} /></div><div className="price-grid">{[
    { labels: [1, 2], heading: 3, rates: 4 }, { labels: [5], heading: 6, rates: 7 }, { labels: [8], heading: 9, rates: 10 },
  ].map((group, index) => <section className="price-card" key={group.heading} data-reveal><div className="price-cover"><Image src={pricePhotos[index].src} alt={pricePhotos[index].alt} fill sizes="(max-width: 800px) 100vw, 33vw" /></div><div className="price-card-heading"><div className="price-category">{group.labels.map((index) => <span key={index}>{plainText(page.blocks[index])}</span>)}</div><h2>{plainText(page.blocks[group.heading])}</h2></div><RateRows values={lines(page.blocks[group.rates])} /></section>)}</div><section className="rate-terms" data-reveal><Blocks blocks={[page.blocks[11]]} /></section></div>;
}

function Transfers({ page }: { page: SitePage }) {
  const rows = lines(page.blocks[0]);
  return <div className="container page-section"><div className="transfers-grid"><section className="transfer-rates" data-reveal><h2>{rows[0]}</h2><RateRows values={rows.slice(1)} /></section><div><section className="briefing-card" data-reveal><Blocks blocks={page.blocks.slice(1)} /></section><ContactAside /></div></div></div>;
}

function Accommodation({ page }: { page: SitePage }) {
  return <div className="container page-section"><blockquote className="hotel-quote" data-reveal>{page.blocks.slice(0, 2).map((block, index) => <span key={index}>{plainText(block)}</span>)}</blockquote><div className="hotel-intro" data-reveal><Blocks blocks={page.blocks.slice(2, 9)} start={2} /></div><div className="hotel-list">{[[9, 12], [12, 14], [14, 16], [16, 19]].map(([start, end], index) => <section className="hotel-section" key={start} data-reveal><div className="hotel-image"><Image src={page.images[index + 1].src} alt={page.images[index + 1].alt} fill sizes="(max-width: 800px) 100vw, 50vw" /></div><div className="hotel-copy"><span className="section-number" aria-hidden="true">0{index + 1} /</span><Blocks blocks={page.blocks.slice(start, end)} start={start} /><Link href="/contact-us" className="text-link">Enquire <span aria-hidden="true">↗</span></Link></div></section>)}</div></div>;
}

function ContactPage({ blocks }: { blocks: ContentNode[] }) {
  return <div className="container page-section"><div className="contact-page-grid"><section className="contact-details-card" data-reveal><span className="section-marker" aria-hidden="true">↗</span><Blocks blocks={blocks} /><div className="contact-direct-links"><a href="tel:+263774489958">+263774489958 <span aria-hidden="true">↗</span></a><a href="mailto:ntozie85@gmail.com">ntozie85@gmail.com <span aria-hidden="true">↗</span></a><a href="mailto:vusa76@yahoo.com">vusa76@yahoo.com <span aria-hidden="true">↗</span></a></div></section><section className="contact-page-form" data-reveal><h2>Contact us</h2><ContactForm /></section></div></div>;
}

function Article({ page, blocks }: { page: SitePage; blocks: ContentNode[] }) {
  const headings = blocks.map((block, index) => ({ block, index })).filter(({ block }) => typeof block !== "string" && block.tag === "h2");
  return <div className="container page-section"><div className="article-layout"><article className="article-content" data-reveal><Blocks blocks={blocks} /><Gallery images={page.images.slice(1)} /><Link href="/blog" className="text-link back-to-blog">← All Posts</Link></article><aside className="article-sidebar"><details className="article-toc" open><summary>On this page</summary><nav aria-label="Article contents">{headings.map(({ block, index }) => <a href={`#section-${index}`} key={index}>{plainText(block)}</a>)}</nav></details></aside></div><section className="related-posts"><h2>Recent Posts</h2><BlogList exclude={page.slug} /></section></div>;
}

function BlogList({ exclude }: { exclude?: string }) {
  return <div className="blog-grid">{posts.filter((post) => post.slug !== exclude).map((post) => <article className="blog-card" key={post.slug} data-reveal><Link href={`/${post.slug}`} className="blog-card-image" tabIndex={-1} aria-hidden="true">{post.images[0] ? <Image src={post.images[0].src} alt="" fill sizes="(max-width: 650px) 100vw, 50vw" /> : null}<span className="blog-card-arrow" aria-hidden="true">↗</span></Link><div className="blog-card-copy"><h2><Link href={`/${post.slug}`}>{post.title}</Link></h2><p>{post.blocks.filter((block) => typeof block !== "string" && block.tag === "p").map(plainText).find((text) => text.length > 100)}</p><Link className="text-link" href={`/${post.slug}`}>Read more <span aria-hidden="true">↗</span></Link></div></article>)}</div>;
}
