import Link from "next/link";

export default function NotFound() {
  return <main id="main-content" className="container page-content"><h1>Page not found</h1><p>We couldn’t find that page.</p><Link href="/">Return to Royalty Travel →</Link></main>;
}
