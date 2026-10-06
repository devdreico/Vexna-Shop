import type { Metadata } from "next";
import { eyebrow } from "@/lib/ui";

export const metadata: Metadata = {
  title: "Privacidad",
  description: "Cómo usamos tus datos personales en VEXNA SHOP.",
};

export default function PrivacidadPage() {
  return (
    <>
      <section className="bg-ink text-white">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <p className={eyebrow}>Legal</p>
          <h1 className="mt-3 text-4xl sm:text-5xl text-gold-gradient">Privacidad</h1>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-12">
        <div className="space-y-7 text-sm leading-relaxed text-ink/80">
          <p>
            En {`VEXNA SHOP`} tratamos únicamente los datos necesarios para procesar tu pedido:
            nombre, datos de contacto, dirección de entrega y contenido de tu carrito.
          </p>

          <article>
            <h2 className="text-xl">¿Para qué usamos tus datos?</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>Preparar y entregar tu pedido (incluidos los enviados contraentrega).</li>
              <li>Coordinar la entrega por WhatsApp o email.</li>
              <li>Registrar compras pagadas con Mercado Pago para dar seguimiento.</li>
            </ul>
          </article>

          <article>
            <h2 className="text-xl">¿Quién recibe tus datos?</h2>
            <p className="mt-2">
              Los formularios de esta web se envían a través de Formspree, que almacena la
              información y nos la notifica por email. El pago con Mercado Pago se procesa en la
              infraestructura de Mercado Libre, no almacenamos datos de tarjetas ni credenciales.
            </p>
          </article>

          <article>
            <h2 className="text-xl">Cookies y almacenamiento local</h2>
            <p className="mt-2">
              Usamos almacenamiento local del navegador para recordar los productos de tu carrito.
              No instalamos cookies publicitarias propias.
            </p>
          </article>

          <article>
            <h2 className="text-xl">Tus derechos</h2>
            <p className="mt-2">
              Podés solicitar acceso, actualización o eliminación de tus datos escribiéndonos por
              Facebook o al email de contacto indicado en la página Contacto.
            </p>
          </article>
        </div>
      </section>
    </>
  );
}
