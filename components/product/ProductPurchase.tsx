"use client";

import { useState } from "react";
import { AddToCartButton } from "@/components/product/AddToCartButton";
import { MpBuyButton } from "@/components/product/MpBuyButton";
import { formatPrice } from "@/lib/format";
import type { Product } from "@/lib/types";

export function ProductPurchase({ product }: { product: Product }) {
  const [qty, setQty] = useState(1);

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center rounded-sm border border-ink/15">
          <button
            type="button"
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="px-4 py-3 text-ink/70 transition hover:text-blue"
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
            className="px-4 py-3 text-ink/70 transition hover:text-blue"
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
        <MpBuyButton product={product} qty={qty} className="flex-1" />
      </div>

      <p className="text-xs leading-relaxed text-muted">
        <span className="font-semibold text-blue">Carrito:</span> se paga únicamente contraentrega
        (efectivo o transferencia al recibir).{" "}
        <span className="font-semibold text-gold-deep">Mercado Pago:</span> pago inmediato desde esta
        ficha; antes registramos tus datos de envío.
      </p>
    </div>
  );
}
