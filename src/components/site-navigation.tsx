"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export function SiteNavigation({ items }: { items: { href: string; label: string }[] }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const primaryPaths = ["/", "/transfers", "/safari-activities", "/accommodation"];
  const more = items.filter((item) => ![...primaryPaths, "/contact-us"].includes(item.href));
  function current(href: string) { return pathname === href || (href === "/blog" && pathname.startsWith("/post/")); }
  return (
    <>
      <nav className="site-desktop-nav" aria-label="Main navigation">
        {items.filter((item) => primaryPaths.includes(item.href)).map((item) => <Link key={item.href} href={item.href} aria-current={current(item.href) ? "page" : undefined}>{item.label}</Link>)}
        <details className="site-more-nav"><summary className={more.some((item) => current(item.href)) ? "is-current" : ""}>More <span aria-hidden="true">⌄</span></summary><div>{more.map((item) => <Link key={item.href} href={item.href} aria-current={current(item.href) ? "page" : undefined} onClick={(event) => event.currentTarget.closest("details")?.removeAttribute("open")}>{item.label}</Link>)}</div></details>
      </nav>
      <Link className="site-contact-link" href="/contact-us" aria-current={current("/contact-us") ? "page" : undefined}>Contact Us <span aria-hidden="true">↗</span></Link>
      <button className="site-menu-toggle" type="button" aria-expanded={open} aria-controls="site-mobile-menu" aria-label={open ? "Close navigation" : "Open navigation"} onClick={() => setOpen(!open)}><span /><span /></button>
      {open ? <nav className="site-mobile-menu" id="site-mobile-menu" aria-label="Mobile navigation">{items.map((item) => <Link key={item.href} href={item.href} aria-current={current(item.href) ? "page" : undefined} onClick={() => setOpen(false)}>{item.label}</Link>)}</nav> : null}
    </>
  );
}
