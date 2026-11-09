import type { Metadata } from "next";
import Link from "next/link";
import { payLinks, payUrl, whatsappUrl, type PayLink } from "@/content/pay-links";
import "./pay.css";

export const metadata: Metadata = {
  title: "Book & Pay Online",
  description: "Book your Victoria Falls activity and pay securely online by card.",
  alternates: { canonical: "/pay" },
};

const categories: { key: PayLink["category"]; title: string }[] = [
  { key: "Explore", title: "Safari & Explore" },
  { key: "Adventure", title: "Adventure" },
  { key: "Experience", title: "Scenic Experiences" },
];

export default function PayPage() {
  return (
    <main id="main-content" className="interior-page">
      <section className="page-hero" aria-labelledby="page-title">
        <div className="page-hero-pattern" aria-hidden="true" />
        <div className="container page-hero-grid">
          <div className="page-hero-content">
            <nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">/</span><span aria-current="page">Book &amp; Pay Online</span></nav>
            <span className="hero-rule" aria-hidden="true" />
            <h1 id="page-title">Book &amp; Pay Online</h1>
            <p className="pay-hero-lead">Pay for your Victoria Falls activities securely by card.</p>
          </div>
        </div>
      </section>

      <div className="container page-section">
        <ol className="pay-steps" aria-label="How to book">
          <li><span className="pay-step-number" aria-hidden="true">01</span><h2>Check your date</h2><p>Message us on WhatsApp with your activity, date and number of people, and we&apos;ll confirm it&apos;s available.</p></li>
          <li><span className="pay-step-number" aria-hidden="true">02</span><h2>Pay by card</h2><p>Click <strong>Pay now</strong> below. Prices are per person, so pay once for each person, or ask us for one invoice for your group.</p></li>
          <li><span className="pay-step-number" aria-hidden="true">03</span><h2>Get your confirmation</h2><p>You&apos;ll get a payment receipt by email, and we&apos;ll send your booking details and pick-up time on WhatsApp.</p></li>
        </ol>

        {categories.map((c) => (
          <section className="pay-category-section" key={c.key} aria-labelledby={`pay-${c.key}`}>
            <h2 id={`pay-${c.key}`}>{c.title}</h2>
            <div className="pay-grid">
              {payLinks.filter((p) => p.category === c.key).map((p) => (
                <article key={p.id} className="pay-card">
                  <h3>{p.name}</h3>
                  <p className="pay-price">US${p.price} <span>per person</span></p>
                  <div className="pay-card-actions">
                    <a className="button" href={payUrl(p.id)} target="_blank" rel="noopener noreferrer">Pay now <span aria-hidden="true">↗</span></a>
                    <a className="pay-check-link" href={whatsappUrl(p.name)} target="_blank" rel="noopener noreferrer">Check availability first</a>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ))}

        <section className="rate-terms pay-other">
          <h2>Deposits, groups, transfers and other activities</h2>
          <p>Want to pay a deposit, one total for your group, a transfer, or an activity not listed here? <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer">Message us on WhatsApp</a> and we&apos;ll send you a secure invoice to pay by card. See all our prices on the <Link href="/pricelist-2024">2026 price list</Link>.</p>
          <p className="pay-small">All activities are subject to availability. National park fees and visa fees are not included and are paid on the day. Card payments are processed by DPO, and Royalty Travel never sees your card details.</p>
        </section>
      </div>
    </main>
  );
}
