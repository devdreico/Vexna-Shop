import type { Metadata } from "next";
import { ContraentregaForm } from "@/components/checkout/ContraentregaForm";
import { PageHero } from "@/components/layout/PageHero";
import { PageTransition } from "@/components/motion/PageTransition";

export const metadata: Metadata = {
  title: "Checkout contra entrega",
  description: "Completá tu pedido con entrega contra pago en Colombia. No se paga nada por adelantado.",
};

export default function CheckoutPage() {
  return (
    <PageTransition>
      <PageHero
        eyebrowText="Paso final"
        title="Pedido contra entrega"
        description="Registrá tus datos de entrega. Te contactamos por WhatsApp para confirmar y no pagás nada hasta recibir tu pedido."
      />
      <section data-reveal className="mx-auto max-w-6xl px-4 py-12">
        <ContraentregaForm />
      </section>
    </PageTransition>
  );
}
