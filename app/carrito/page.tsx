import type { Metadata } from "next";
import { CartView } from "@/components/cart/CartView";
import { eyebrow } from "@/lib/ui";
import { PageTransition } from "@/components/motion/PageTransition";

export const metadata: Metadata = {
  title: "Carrito",
  description: "Revisá tu pedido y pedí contraentrega en Colombia.",
};

export default function CarritoPage() {
  return (
    <PageTransition>
      <section data-reveal className="bg-ink text-white">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <p className={eyebrow}>Tu pedido</p>
          <h1 className="mt-3 text-4xl text-gold">Carrito</h1>
        </div>
      </section>
      <section data-reveal className="mx-auto max-w-6xl px-4 py-12">
        <CartView />
      </section>
    </PageTransition>
  );
}
