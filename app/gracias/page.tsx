"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { SITE } from "@/data/config";
import { getServerOrder, readOrder, subscribeOrderNoop } from "@/lib/order";
import { btnGold, btnPrimary } from "@/lib/ui";

const formatCOP = (n: number) =>
  new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(n);
import { PageTransition } from "@/components/motion/PageTransition";

export default function GraciasPage() {
  const order = useSyncExternalStore(subscribeOrderNoop, readOrder, getServerOrder);

  return (
    <PageTransition>
        <section data-reveal className="bg-matte text-white">
          <div className="mx-auto max-w-2xl px-4 py-20 text-center">
            <p className="text-xs font-bold tracking-[0.3em] text-blue-bright uppercase">VEXNA SHOP</p>
            <h1 className="mt-4 text-4xl sm:text-5xl text-gold">¡Pedido recibido!</h1>
            <p className="mt-5 text-sm leading-relaxed text-white/75">
              Gracias por comprar con nosotros. Registramos tu pedido y te contactaremos por WhatsApp
              para coordinar la entrega.
            </p>

            {order && (
              <div className="mt-8 rounded-sm border border-gold/50 bg-white/[0.04] p-6 text-left">
                {order.nombre && (
                  <p className="text-sm text-white/70">
                    Para: <span className="font-semibold text-white">{order.nombre}</span>
                  </p>
                )}
                <ul className="mt-4 divide-y divide-white/10 text-sm">
                  {order.lines?.map((l, i) => (
                    <li key={i} className="flex justify-between gap-4 py-2">
                      <span>
                        {l.qty}× {l.name}
                      </span>
                      <span className="text-white/70">{formatCOP(l.subtotal)}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 flex items-center justify-between border-t border-gold/40 pt-4">
                  <span className="text-xs font-bold tracking-widest text-white/60 uppercase">Total</span>
                  <span className="font-display font-extrabold text-2xl text-gold">{order.total}</span>
                </div>
                <p className="mt-3 text-xs text-white/60">
                  Medio de pago: {order.metodo ?? "Contraentrega"}
                </p>
              </div>
            )}

            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <Link href="/tienda" className={btnGold}>
                Seguir comprando
              </Link>
              <Link
                href={SITE.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={btnPrimary}
              >
                {SITE.brand} en Facebook
              </Link>
            </div>
          </div>
        </section>
    </PageTransition>
  );
}
