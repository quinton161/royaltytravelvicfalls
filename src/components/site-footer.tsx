import Image from "next/image";
import Link from "next/link";
import { logo, navigation } from "@/lib/site";
import { ContactForm } from "./contact-form";

export function ContactSection() {
  return <section className="enquiry-section" aria-labelledby="contact-heading" id="contact-form"><div className="container enquiry-grid"><div><span className="section-marker" aria-hidden="true">↗</span><h2 id="contact-heading">Contact us</h2><p>Start Planning Your Dream Trip Today</p><address>Shop No 25 Landela Complex<br />Livingstone Way<br />Victoria Falls , Zimbabwe</address><p><a href="tel:+263773537602">+263 773 537 602</a> / <a href="tel:+263774489958">+263 774489958</a><br /><a href="tel:+2632846055">+263 28 46055</a></p><a href="mailto:ntozie85@gmail.com">ntozie85@gmail.com</a></div><div className="enquiry-form-panel"><ContactForm /></div></div></section>;
}

export function SiteFooter() {
  return <footer className="site-footer"><div className="container"><div className="site-footer-top"><Link href="/" className="site-logo" aria-label="Royalty Travel home"><Image src={logo} alt="Royalty Travel Victoria Falls" width={100} height={102} /></Link><p>Elevate Your Travel Experience<br />with Expert Consulting</p><div className="site-footer-contact"><a href="tel:+263774489958">+263774489958 <span aria-hidden="true">↗</span></a><a href="mailto:ntozie85@gmail.com">ntozie85@gmail.com</a></div></div><nav className="site-footer-navigation" aria-label="Footer navigation">{navigation.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}</nav></div></footer>;
}
