"use client";

import { useEffect, useRef, type ReactNode } from "react";

export function ScrollReveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = root.current;
    if (!element || !window.IntersectionObserver) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) { entry.target.classList.add("is-visible"); observer.unobserve(entry.target); }
      });
    }, { threshold: 0.06 });
    function syncMotion() {
      element!.classList.toggle("motion-ready", !motion.matches);
      observer.disconnect();
      if (!motion.matches) element!.querySelectorAll("[data-reveal]").forEach((item) => observer.observe(item));
    }
    syncMotion();
    motion.addEventListener("change", syncMotion);
    return () => { observer.disconnect(); motion.removeEventListener("change", syncMotion); };
  }, []);
  return <div ref={root} className={className}>{children}</div>;
}
