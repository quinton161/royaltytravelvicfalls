"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

export function SiteChrome({ children, header, footer, enquiry }: { children: ReactNode; header: ReactNode; footer: ReactNode; enquiry: ReactNode }) {
  const pathname = usePathname();
  return <>{header}{children}{pathname !== "/contact-us" ? enquiry : null}{footer}</>;
}
