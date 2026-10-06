"use client";

import { useEffect, useRef, useState } from "react";
import { useCart } from "@/components/cart/CartProvider";
import { btnPrimary } from "@/lib/ui";

interface Props {
  slug: string;
  qty?: number;
  className?: string;
}

export function AddToCartButton({ slug, qty = 1, className = "" }: Props) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  function handleAdd() {
    add(slug, qty);
    setAdded(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setAdded(false), 1800);
  }

  return (
    <button
      type="button"
      onClick={handleAdd}
      className={`${btnPrimary} ${added ? "!bg-gold !text-ink" : ""} ${className}`}
    >
      {added ? "✓ Agregado al carrito" : "Agregar al carrito"}
    </button>
  );
}
