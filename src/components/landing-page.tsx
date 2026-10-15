import Image from "next/image";
import Link from "next/link";
import { ScrollReveal } from "./scroll-reveal";

type LandingContent = {
  aboutTitle: string;
  aboutText: string;
  servicesTitle: string;
  servicesText: string;
  services: { title: string; image?: { src: string; alt: string } }[];
  heroImage: { src: string; alt: string };
  aboutImage: { src: string; alt: string };
};

type Props = { content: LandingContent };

function Arrow() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="lp-arrow"><path d="M4 12h15M13 5l7 7-7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

export function LandingPage({ content }: Props) {
  return (
    <ScrollReveal className="lp">
      <main id="main-content">
        <section className="lp-hero" aria-labelledby="landing-title">
          <div className="lp-hero-picture"><Image src={content.heroImage.src} alt={content.heroImage.alt} fill priority sizes="100vw" /></div><div className="lp-hero-shade" />
          <div className="lp-hero-copy lp-container">
            <h1 className="lp-hero-enter" id="landing-title">Elevate Your<br />Travel Experience<br /><em>with Expert Consulting</em></h1>
            <div className="lp-hero-actions lp-hero-enter lp-delay-2"><Link href="/contact-us" className="lp-btn lp-btn-gold">Start Planning Your Dream Trip Today <Arrow /></Link></div>
            <div className="lp-hero-bottom"><a href="tel:+263774489958">For Inquiries, Contact Us at +263774489958</a><a href="#about-royalty" className="lp-scroll" aria-label="About Royalty Travel"><span className="lp-scroll-circle" aria-hidden="true">↓</span></a></div>
          </div>
        </section>
        <section className="lp-about lp-container lp-section" id="about-royalty" aria-labelledby="about-title">
          <div className="lp-about-visual" data-reveal><div className="lp-about-photo"><Image src={content.aboutImage.src} alt={content.aboutImage.alt} fill sizes="(max-width: 800px) 100vw, 45vw" /></div><span className="lp-photo-accent" aria-hidden="true" /></div>
          <div className="lp-about-copy" data-reveal><span className="lp-section-number" aria-hidden="true">01 /</span><h2 id="about-title">{content.aboutTitle}</h2><div className="lp-heading-line" /><p>{content.aboutText}</p></div>
        </section>
        <section className="lp-services" id="services" aria-labelledby="services-title"><div className="lp-container lp-section">
          <div className="lp-section-heading" data-reveal><div><span className="lp-section-number" aria-hidden="true">02 /</span><h2 id="services-title">{content.servicesTitle}</h2></div><p>{content.servicesText}</p></div>
          <div className="lp-service-grid">{content.services.slice(0, 6).map((service, index) => <article className="lp-service-card" key={service.title} data-reveal style={{ "--reveal-delay": `${(index % 3) * 80}ms` } as React.CSSProperties}>
            {service.image ? <div className="lp-card-image"><Image src={service.image.src} alt={service.image.alt} fill sizes="(max-width: 650px) 100vw, (max-width: 1000px) 50vw, 33vw" /><span className="lp-card-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span></div> : null}<h3>{service.title}</h3>
          </article>)}</div>
          <div className="lp-additional-services">{content.services.slice(6).map((service, index) => <article key={service.title} data-reveal><span className="lp-service-index" aria-hidden="true">{String(index + 7).padStart(2, "0")}</span><h3>{service.title}</h3><span aria-hidden="true">↗</span></article>)}</div>
        </div></section>
        <section className="lp-final" aria-label="Start Planning Your Dream Trip Today"><div className="lp-container" data-reveal><p>Start Planning Your Dream Trip Today</p><Link href="/contact-us" className="lp-btn lp-btn-gold">Contact Us <Arrow /></Link></div></section>
      </main>
    </ScrollReveal>
  );
}
