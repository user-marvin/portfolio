"use client";

import { useEffect } from "react";

// Marks every [data-reveal] element as shown once it scrolls into view; the CSS in
// globals.css handles the actual animation (and skips it for reduced motion).
export default function RevealObserver() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.setAttribute("data-shown", "");
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.1 },
    );
    document.querySelectorAll("[data-reveal]:not([data-shown])").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return null;
}
