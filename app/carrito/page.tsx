import type { Metadata } from "next";
import { CartView } from "@/components/cart/CartView";
import { eyebrow } from "@/lib/ui";

export const metadata: Metadata = {
  title: "Carrito",
  description: "Revisá tu pedido y pedí contraentrega en Colombia.",
};

export default function CarritoPage() {
  return (
    <>
      <section className="bg-ink text-white">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <p className={eyebrow}>Tu pedido</p>
          <h1 className="mt-3 text-4xl text-gold-gradient">Carrito</h1>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-4 py-12">
        <CartView />
      </section>
    </>
  );
}
