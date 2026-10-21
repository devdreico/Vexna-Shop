import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { PageTransition } from "@/components/motion/PageTransition";

export const metadata: Metadata = {
  title: "Envíos y cambios",
  description: "Política de envíos, entregas contra entrega, cambios y devoluciones de VEXNA SHOP.",
};

const SECTIONS = [
  {
    title: "Entrega contra entrega",
    items: [
      "Todos los pedidos de este sitio se envían con pago contra entrega: recibís el producto y pagás en efectivo o transferencia al momento de la entrega.",
      "No vendemos de otra forma: no hay pagos previos, cuotas ni datos de tarjeta en ningún punto del proceso.",
      "Coordinamos la entrega por WhatsApp al número que dejaste en el formulario de checkout.",
      "El tiempo de entrega habitual es de 1 a 3 días hábiles en ciudades principales y de 2 a 6 días hábiles en resto del país.",
    ],
  },
  {
    title: "¿Cómo se paga?",
    items: [
      "Efectivo al recibir el pedido, en la dirección que indicaste.",
      "Transferencia Bancolombia al recibir, coordinada con el mensajero por WhatsApp.",
      "Verificás el producto antes de pagar: si algo no corresponde a tu pedido, no lo aceptás.",
      "Nunca te pedimos depósitos, anticipos ni pagos por links de terceros.",
    ],
  },
  {
    title: "Cambios y devoluciones",
    items: [
      "Si el producto llega dañado o no corresponde a tu pedido, escribinos dentro de las 48 horas siguientes a la entrega con fotos del producto y del empaque.",
      "Cambiamos el producto sin costo si el error es nuestro o si el artículo presenta defectos de fábrica.",
      "Por higiene no aceptamos cambios de ropa interior ni artículos personalizados, salvo defecto de fábrica.",
    ],
  },
  {
    title: "Garantía",
    items: [
      "Todos los productos cuentan con garantía por defectos de fabricación por 30 días desde la entrega.",
      "La garantía no cubre desgaste normal, mal uso o modificaciones realizadas por el cliente.",
    ],
  },
];

export default function EnviosYCambiosPage() {
  return (
    <PageTransition>
      <PageHero
        eyebrowText="Información"
        title="Envíos y cambios"
        description="Cómo entregamos, cómo se paga al recibir y qué pasa si necesitás un cambio o devolución."
      />

      <section data-reveal className="mx-auto max-w-4xl px-4 py-12">
        <div className="space-y-8">
          {SECTIONS.map((s) => (
            <article key={s.title} className="glass-light rounded-3xl p-6 sm:p-8">
              <h2 className="text-2xl">{s.title}</h2>
              <ul className="mt-4 space-y-3 text-sm leading-relaxed text-muted">
                {s.items.map((i) => (
                  <li key={i} className="flex gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" aria-hidden />
                    <span>{i}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>
    </PageTransition>
  );
}
