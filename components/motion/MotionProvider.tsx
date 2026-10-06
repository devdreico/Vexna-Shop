"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

function observeReveals(io: IntersectionObserver, root: ParentNode) {
  const nodes = root.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-in)");
  nodes.forEach((n) => io.observe(n));
}

export function MotionProvider() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (typeof IntersectionObserver === "undefined") return;

    document.documentElement.classList.add("motion-ready");

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -6% 0px", threshold: 0.06 },
    );

    observeReveals(io, document.body);

    const mo = new MutationObserver((mutations) => {
      mutations.forEach((m) => {
        m.addedNodes.forEach((node) => {
          if (node.nodeType !== 1) return;
          const el = node as Element;
          if (el.matches?.("[data-reveal]:not(.is-in)")) io.observe(el);
          el.querySelectorAll?.("[data-reveal]:not(.is-in)").forEach((n) => io.observe(n));
        });
      });
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, [pathname]);

  return null;
}
