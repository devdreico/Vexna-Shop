import type { Metadata } from "next";
import { CartView } from "@/components/cart/CartView";
import { PageHero } from "@/components/layout/PageHero";
import { PageTransition } from "@/components/motion/PageTransition";

export const metadata: Metadata = {
  title: "Carrito",
  description: "Revisá tu pedido y pedí contra entrega en Colombia. Pagás al recibir.",
};

export default function CarritoPage() {
  return (
    <PageTransition>
      <PageHero
        eyebrowText="Tu pedido"
        title="Carrito"
        description="Revisá tus productos. El pedido se confirma sin pagar nada: llega a tu puerta y pagás al recibir."
      />
      <section data-reveal className="mx-auto max-w-6xl px-4 py-12">
        <CartView />
      </section>
    </PageTransition>
  );
}
