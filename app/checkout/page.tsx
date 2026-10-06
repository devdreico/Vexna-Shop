import type { Metadata } from "next";
import { ContraentregaForm } from "@/components/checkout/ContraentregaForm";
import { eyebrow } from "@/lib/ui";

export const metadata: Metadata = {
  title: "Checkout contraentrega",
  description: "Completá tu pedido con pago contraentrega en Colombia.",
};

export default function CheckoutPage() {
  return (
    <>
      <section className="bg-ink text-white">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <p className={eyebrow}>Paso final</p>
          <h1 className="mt-3 text-4xl text-gold-gradient">Pedido contraentrega</h1>
          <p className="mt-3 max-w-2xl text-sm text-white/70">
            Registrá tus datos de entrega. Te contactamos por WhatsApp para confirmar y no pagás
            nada hasta recibir tu pedido.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <ContraentregaForm />
      </section>
    </>
  );
}
