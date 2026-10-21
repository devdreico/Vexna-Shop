"use client";

import { useState } from "react";
import { AddToCartButton } from "@/components/product/AddToCartButton";
import { formatPrice } from "@/lib/format";
import type { Product } from "@/lib/types";

export function ProductPurchase({ product }: { product: Product }) {
  const [qty, setQty] = useState(1);

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center rounded-full border border-line bg-card">
          <button
            type="button"
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="px-4 py-3 text-muted transition hover:text-gold-deep"
            aria-label="Disminuir cantidad"
          >
            −
          </button>
          <span className="w-10 text-center text-sm font-bold tabular-nums" aria-live="polite">
            {qty}
          </span>
          <button
            type="button"
            onClick={() => setQty((q) => Math.min(99, q + 1))}
            className="px-4 py-3 text-muted transition hover:text-gold-deep"
            aria-label="Aumentar cantidad"
          >
            +
          </button>
        </div>
        <p className="text-xs tracking-widest text-muted uppercase">
          Subtotal:{" "}
          <span className="font-bold text-gold-deep">{formatPrice(product.price * qty)}</span>
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <AddToCartButton slug={product.slug} qty={qty} className="flex-1" />
      </div>

      <div className="rounded-3xl border border-gold/45 bg-gold/12 px-5 py-4">
        <p className="text-xs font-black tracking-[0.2em] text-gold-deep uppercase">
          Pago contra entrega
        </p>
        <p className="mt-1.5 text-xs leading-relaxed text-muted">
          Agregá al carrito y recibí en tu puerta. Pagás en efectivo o transferencia al recibir el
          producto: no se paga nada por adelantado.
        </p>
        <ul className="mt-3 flex flex-wrap gap-2">
          {["Envío nacional", "Garantía 30 días", "Cambios en 48 h"].map((t) => (
            <li
              key={t}
              className="rounded-full border border-gold/50 bg-gold/20 px-3 py-1 text-[10px] font-bold tracking-widest text-gold-deep uppercase"
            >
              {t}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
