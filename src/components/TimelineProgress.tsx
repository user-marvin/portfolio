"use client";

import { useEffect, useRef, type ReactNode } from "react";

// Wraps the experience list: fills an accent rail as the visitor scrolls through it and
// marks each job marker [data-passed] once the fill reaches it.
export default function TimelineProgress({ children }: { children: ReactNode }) {
  const listRef = useRef<HTMLOListElement>(null);
  const fillRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const list = listRef.current;
    const fill = fillRef.current;
    if (!list || !fill) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const markers = list.querySelectorAll<HTMLElement>("[data-marker]");
      if (markers.length === 0) return;

      const listTop = list.getBoundingClientRect().top;
      const firstTop = markers[0].getBoundingClientRect().top - listTop;
      const lastTop = markers[markers.length - 1].getBoundingClientRect().top - listTop;
      // The fill's leading edge tracks a line 60% down the viewport.
      const reach = window.innerHeight * 0.6 - listTop;
      const length = Math.min(Math.max(reach - firstTop, 0), lastTop - firstTop);

      fill.style.top = `${firstTop + 6}px`;
      fill.style.height = `${length}px`;
      markers.forEach((m) => m.toggleAttribute("data-passed", m.getBoundingClientRect().top - listTop <= reach));
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  return (
    <ol ref={listRef} className="relative">
      <span
        ref={fillRef}
        aria-hidden
        className="absolute left-[5px] z-[1] w-px bg-accent shadow-[0_0_8px_rgb(var(--accent)/0.6)] sm:left-[calc(200px+2.5rem+5px)]"
        style={{ height: 0 }}
      />
      {children}
    </ol>
  );
}
