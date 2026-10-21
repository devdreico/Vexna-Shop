import { Suspense } from "react";
import type { Metadata } from "next";
import { ShopGrid } from "@/components/tienda/ShopGrid";
import { PageHero } from "@/components/layout/PageHero";
import { PageTransition } from "@/components/motion/PageTransition";

export const metadata: Metadata = {
  title: "Tienda",
  description:
    "Catálogo completo de accesorios, componentes y ropa para bicicleta en Colombia. Todo con entrega contra pago al recibir.",
};

export default function TiendaPage() {
  return (
    <PageTransition>
      <PageHero
        eyebrowText="Catálogo"
        title="Tienda VEXNA"
        description="Productos seleccionados para mejorar tu experiencia en bici. Todo el catálogo se entrega contra entrega: pedís desde el carrito y pagás al recibir."
      />

      <section data-reveal className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
        <Suspense
          fallback={
            <p className="glass-light rounded-3xl px-6 py-12 text-center text-sm text-muted">
              Cargando catálogo…
            </p>
          }
        >
          <ShopGrid />
        </Suspense>
      </section>
    </PageTransition>
  );
}
