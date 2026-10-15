import Image from "next/image";
import Link from "next/link";
import { logo, navigation } from "@/lib/site";
import { SiteNavigation } from "./site-navigation";

export function SiteHeader() {
  return <header className="site-header">
    <div className="site-announcement"><a href="tel:+263774489958">For Inquiries, Contact Us at +263774489958</a></div>
    <div className="container site-header-row"><Link href="/" className="site-logo" aria-label="Royalty Travel home"><Image src={logo} alt="Royalty Travel Victoria Falls" width={100} height={102} priority /></Link><SiteNavigation items={navigation} /></div>
  </header>;
}
