import { Suspense } from "react";
import type { Metadata } from "next";
import { ShopGrid } from "@/components/tienda/ShopGrid";
import { eyebrow } from "@/lib/ui";
import { PageTransition } from "@/components/motion/PageTransition";

export const metadata: Metadata = {
  title: "Tienda",
  description:
    "Catálogo completo de accesorios, componentes y ropa para bicicleta. Contraentrega en Colombia y pago con Mercado Pago.",
};

export default function TiendaPage() {
  return (
    <PageTransition>
      <section data-reveal className="bg-ink text-white">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <p className={eyebrow}>Catálogo</p>
          <h1 className="mt-3 text-4xl sm:text-5xl text-gold">Tienda VEXNA</h1>
          <p className="mt-3 max-w-2xl text-sm text-white/70">
            10 productos seleccionados para mejorar tu experiencia en bici. Comprá contraentrega
            desde el carrito o pagá directo con Mercado Pago desde cada ficha.
          </p>
        </div>
      </section>

      <section data-reveal className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
        <Suspense fallback={<p className="text-sm text-muted">Cargando catálogo…</p>}>
          <ShopGrid />
        </Suspense>
      </section>
    </PageTransition>
  );
}
