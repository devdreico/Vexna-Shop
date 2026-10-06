"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { GALLERY, GALLERY_CATEGORIES } from "@/data/gallery";

export function GalleryGrid() {
  const [active, setActive] = useState("todos");
  const [current, setCurrent] = useState<number | null>(null);

  const items =
    active === "todos" ? GALLERY : GALLERY.filter((g) => g.category === active);

  useEffect(() => {
    if (current === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setCurrent(null);
      if (e.key === "ArrowRight") setCurrent((i) => (i === null ? i : (i + 1) % items.length));
      if (e.key === "ArrowLeft") setCurrent((i) => (i === null ? i : (i - 1 + items.length) % items.length));
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [current, items.length]);

  return (
    <div>
      <div className="mb-8 flex flex-wrap justify-center gap-2">
        {GALLERY_CATEGORIES.map((c) => (
          <button
            key={c.slug}
            type="button"
            onClick={() => setActive(c.slug)}
            className={`rounded-sm border px-4 py-2 text-xs font-bold tracking-widest uppercase transition duration-300 btn-focus ${
              active === c.slug
                ? "border-gold bg-gold text-ink"
                : "border-ink/15 text-ink/70 hover:border-blue hover:text-blue"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {items.map((item, i) => (
          <button
            key={item.src}
            type="button"
            onClick={() => setCurrent(i)}
            className={`group relative block overflow-hidden rounded-sm border border-ink/10 bg-ink duration-300 hover:-translate-y-1 hover:border-gold/50 btn-focus ${
              i % 5 === 0 ? "col-span-2 row-span-2 aspect-square" : "aspect-[4/3]"
            }`}
            aria-label={`Ampliar: ${item.title}`}
          >
            <Image
              src={item.src}
              alt={item.title}
              fill
              sizes="(max-width: 640px) 50vw, 25vw"
              className="object-cover transition duration-500 group-hover:scale-105"
            />
            <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink to-transparent p-3 text-left text-xs font-semibold text-white opacity-0 transition group-hover:opacity-100">
              {item.title}
            </span>
          </button>
        ))}
      </div>

      {current !== null && items[current] && (
        <div
          className="animate-backdrop-in fixed inset-0 z-[70] flex items-center justify-center bg-ink/90 p-4 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          aria-label={items[current].title}
          onMouseDown={(e) => e.target === e.currentTarget && setCurrent(null)}
        >
          <button
            type="button"
            onClick={() => setCurrent(null)}
            className="absolute top-5 right-5 text-white/70 transition hover:text-gold"
            aria-label="Cerrar visor"
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>

          <button
            type="button"
            onClick={() => setCurrent((i) => (i === null ? i : (i - 1 + items.length) % items.length))}
            className="absolute left-3 hidden rounded-full border border-white/30 p-3 text-white transition hover:border-gold hover:text-gold sm:block"
            aria-label="Anterior"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <path d="M15 6l-6 6 6 6" />
            </svg>
          </button>

          <figure className="animate-dialog-in max-h-full w-full max-w-4xl">
            <div className="relative aspect-[9/7] w-full overflow-hidden rounded-sm border border-gold/50">
              <Image
                src={items[current].src}
                alt={items[current].title}
                fill
                sizes="90vw"
                className="object-contain"
                priority
              />
            </div>
            <figcaption className="mt-3 text-center text-sm tracking-widest text-gold uppercase">
              {items[current].title}
            </figcaption>
          </figure>

          <button
            type="button"
            onClick={() => setCurrent((i) => (i === null ? i : (i + 1) % items.length))}
            className="absolute right-3 hidden rounded-full border border-white/30 p-3 text-white transition hover:border-gold hover:text-gold sm:block"
            aria-label="Siguiente"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <path d="M9 6l6 6-6 6" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
