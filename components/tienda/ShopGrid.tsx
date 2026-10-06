"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CATEGORIES, PRODUCTS } from "@/data/products";
import { ProductCard } from "@/components/product/ProductCard";
import { input } from "@/lib/ui";

export function ShopGrid() {
  const params = useSearchParams();
  const initial = params.get("categoria") ?? "todos";
  const [category, setCategory] = useState(
    CATEGORIES.some((c) => c.slug === initial) ? initial : "todos",
  );
  const [query, setQuery] = useState("");

  const items = useMemo(() => {
    const q = query.trim().toLowerCase();
    return PRODUCTS.filter(
      (p) =>
        (category === "todos" || p.category === category) &&
        (q === "" || p.name.toLowerCase().includes(q) || p.short.toLowerCase().includes(q)),
    );
  }, [category, query]);

  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {[{ slug: "todos", label: "Todo" }, ...CATEGORIES].map((c) => (
            <button
              key={c.slug}
              type="button"
              onClick={() => setCategory(c.slug)}
              className={`rounded-sm border px-4 py-2 text-xs font-bold tracking-widest uppercase transition btn-focus ${
                category === c.slug
                  ? "border-blue bg-blue text-white"
                  : "border-ink/15 text-ink/70 hover:border-gold hover:text-gold-deep"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
        <div className="sm:w-64">
          <label htmlFor="shop-search" className="sr-only">
            Buscar productos
          </label>
          <input
            id="shop-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar producto…"
            className={input}
          />
        </div>
      </div>

      {items.length === 0 ? (
        <p className="rounded-sm border border-ink/10 bg-cloud px-6 py-12 text-center text-sm text-muted">
          No encontramos productos con esa búsqueda.
        </p>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
