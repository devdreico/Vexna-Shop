"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/components/cart/CartProvider";
import { formatPrice } from "@/lib/format";
import { btnGold, btnOutlineGold, btnPrimary } from "@/lib/ui";

export function CartView() {
  const { lines, subtotal, count, setQty, remove, clear } = useCart();

  if (count === 0) {
    return (
      <div className="rounded-sm border border-gold/50 bg-cloud px-6 py-16 text-center">
        <h2 className="text-3xl text-gold-deep">Tu carrito está vacío</h2>
        <p className="mt-2 text-sm text-muted">Explorá el catálogo y armá tu pedido.</p>
        <Link href="/tienda" className={`${btnPrimary} mt-6`}>
          Ir a la tienda
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr]">
      <div className="space-y-4">
        {lines.map((l) => (
          <article key={l.product.slug} className="flex gap-4 rounded-sm border border-ink/10 bg-white p-4">
            <Link href={`/producto/${l.product.slug}`} className="relative block h-24 w-24 shrink-0 overflow-hidden bg-ink">
              <Image src={l.product.image} alt={l.product.name} fill sizes="96px" className="object-cover" />
            </Link>
            <div className="flex flex-1 flex-col gap-2">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-base leading-tight">
                    <Link href={`/producto/${l.product.slug}`} className="hover:text-blue">
                      {l.product.name}
                    </Link>
                  </h3>
                  <p className="mt-1 text-xs text-muted">{formatPrice(l.product.price)} c/u</p>
                </div>
                <button
                  type="button"
                  onClick={() => remove(l.product.slug)}
                  className="text-xs font-semibold tracking-wider text-muted uppercase transition hover:text-danger"
                >
                  Quitar
                </button>
              </div>
              <div className="mt-auto flex items-center justify-between gap-3">
                <div className="flex items-center rounded-sm border border-ink/15">
                  <button
                    type="button"
                    onClick={() => setQty(l.product.slug, l.qty - 1)}
                    className="px-3 py-1.5 text-ink/70 hover:text-blue"
                    aria-label={`Disminuir ${l.product.name}`}
                  >
                    −
                  </button>
                  <span className="w-8 text-center text-sm font-bold tabular-nums">{l.qty}</span>
                  <button
                    type="button"
                    onClick={() => setQty(l.product.slug, l.qty + 1)}
                    className="px-3 py-1.5 text-ink/70 hover:text-blue"
                    aria-label={`Aumentar ${l.product.name}`}
                  >
                    +
                  </button>
                </div>
                <p className="font-display text-xl text-gold-deep">{formatPrice(l.subtotal)}</p>
              </div>
            </div>
          </article>
        ))}

        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link href="/tienda" className="text-sm font-bold tracking-widest text-blue uppercase hover:text-gold-deep">
            ← Seguir comprando
          </Link>
          <button
            type="button"
            onClick={clear}
            className="text-xs font-semibold tracking-wider text-muted uppercase hover:text-danger"
          >
            Vaciar carrito
          </button>
        </div>
      </div>

      <aside className="h-fit rounded-sm border border-gold/50 bg-ink p-6 text-white lg:sticky lg:top-32">
        <h2 className="text-xl text-gold">Resumen</h2>
        <dl className="mt-5 space-y-3 text-sm">
          <div className="flex justify-between">
            <dt className="text-white/60">Productos ({count})</dt>
            <dd className="tabular-nums">{formatPrice(subtotal)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-white/60">Envío</dt>
            <dd className="text-white/80">Se coordina por WhatsApp</dd>
          </div>
        </dl>
        <div className="mt-4 flex items-center justify-between border-t border-gold/40 pt-4">
          <span className="text-xs font-bold tracking-widest text-white/60 uppercase">Total</span>
          <span className="font-display text-3xl text-gold-gradient">{formatPrice(subtotal)}</span>
        </div>

        <Link href="/checkout" className={`${btnGold} mt-6 w-full`}>
          Pedir contraentrega
        </Link>
        <p className="mt-3 text-xs leading-relaxed text-white/60">
          El carrito se paga únicamente contraentrega. ¿Querés pagar ya con Mercado Pago? Comprá
          desde la ficha del producto.
        </p>
        <Link
          href="/tienda"
          className={`${btnOutlineGold} mt-3 w-full`}
        >
          Ver más productos
        </Link>
      </aside>
    </div>
  );
}
