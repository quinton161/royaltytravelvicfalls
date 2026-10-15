import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter, ContactSection } from "@/components/site-footer";
import { SiteChrome } from "@/components/site-chrome";
import { logo } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.royaltytravelvicfalls.com"),
  title: { default: "Royalty Travel Victoria Falls", template: "%s | Royalty Travel" },
  description: "Explore Victoria Falls with Royalty Travel. Tours, transfers, accommodation and personalised travel consulting.",
  icons: { icon: logo },
  alternates: { types: { "application/rss+xml": "/blog-feed.xml" } },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <a href="#main-content" className="skip-link">Skip to content</a>
        <SiteChrome header={<SiteHeader />} footer={<SiteFooter />} enquiry={<ContactSection />}>{children}</SiteChrome>
      </body>
    </html>
  );
}
