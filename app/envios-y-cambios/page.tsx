import type { Metadata } from "next";
import { eyebrow } from "@/lib/ui";
import { PageTransition } from "@/components/motion/PageTransition";

export const metadata: Metadata = {
  title: "Envíos y cambios",
  description: "Política de envíos, entregas contraentrega, cambios y devoluciones de VEXNA SHOP.",
};

const SECTIONS = [
  {
    title: "Entrega contraentrega",
    items: [
      "Los pedidos realizados desde el carrito se envían con pago contraentrega: recibís el producto y pagás en efectivo o transferencia al momento de la entrega.",
      "Coordinamos la entrega por WhatsApp al número que dejaste en el formulario de checkout.",
      "El tiempo de entrega habitual es de 1 a 3 días hábiles en ciudades principales y de 2 a 6 días hábiles en resto del país.",
    ],
  },
  {
    title: "Pagos con Mercado Pago",
    items: [
      "Desde la ficha de cada producto podés pagar directo con Mercado Pago (tarjeta, PSE, billeteras virtuales y más).",
      "Antes de redirigirte al pago registramos tus datos de envío para preparar el despacho apenas se acredite el pago.",
      "Una vez confirmado el pago, coordinamos el envío por WhatsApp.",
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
      <section data-reveal className="bg-ink text-white">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <p className={eyebrow}>Información</p>
          <h1 className="mt-3 text-4xl sm:text-5xl text-gold">Envíos y cambios</h1>
        </div>
      </section>

      <section data-reveal className="mx-auto max-w-4xl px-4 py-12">
        <div className="space-y-8">
          {SECTIONS.map((s) => (
            <article key={s.title} className="rounded-sm border border-ink/10 bg-white p-6 sm:p-8">
              <h2 className="text-2xl text-ink">{s.title}</h2>
              <ul className="mt-4 space-y-3 text-sm leading-relaxed text-ink/75">
                {s.items.map((i) => (
                  <li key={i} className="flex gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-gold" aria-hidden />
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
