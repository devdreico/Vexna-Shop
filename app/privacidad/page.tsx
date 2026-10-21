import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { PageTransition } from "@/components/motion/PageTransition";

export const metadata: Metadata = {
  title: "Privacidad",
  description: "Cómo usamos tus datos personales en VEXNA SHOP.",
};

export default function PrivacidadPage() {
  return (
    <PageTransition>
      <PageHero
        eyebrowText="Legal"
        title="Privacidad"
        description="Qué datos recopilamos, para qué los usamos y cómo podés ejercer tus derechos."
      />

      <section data-reveal className="mx-auto max-w-4xl px-4 py-12">
        <div className="space-y-7 text-sm leading-relaxed text-muted">
          <p>
            En VEXNA SHOP tratamos únicamente los datos necesarios para procesar tu pedido:
            nombre, datos de contacto, dirección de entrega y contenido de tu carrito.
          </p>

          <article>
            <h2 className="text-xl text-fg">¿Para qué usamos tus datos?</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>Preparar y entregar tu pedido contra entrega.</li>
              <li>Coordinar la entrega por WhatsApp o email.</li>
              <li>Dar seguimiento a cambios, devoluciones y garantías.</li>
            </ul>
          </article>

          <article>
            <h2 className="text-xl text-fg">¿Quién recibe tus datos?</h2>
            <p className="mt-2">
              Los formularios de esta web se envían a través de Formspree, que almacena la
              información y nos la notifica por email. El pago se realiza en efectivo o transferencia
              al momento de la entrega: en ningún momento manejamos datos de tarjetas ni
              credenciales bancarias.
            </p>
          </article>

          <article>
            <h2 className="text-xl text-fg">Cookies y almacenamiento local</h2>
            <p className="mt-2">
              Usamos almacenamiento local del navegador para recordar los productos de tu carrito y
              tu preferencia de tema (claro/oscuro). No instalamos cookies publicitarias propias.
            </p>
          </article>

          <article>
            <h2 className="text-xl text-fg">Tus derechos</h2>
            <p className="mt-2">
              Podés solicitar acceso, actualización o eliminación de tus datos escribiéndonos por
              Facebook o por WhatsApp.
            </p>
            <p className="mt-2 text-sm text-muted">
              Nuestras salidas y puntos de contacto están publicados en la página{" "}
              <Link href="/rutas" className="underline decoration-gold decoration-2 underline-offset-2 hover:text-gold-deep">
                Rutas
              </Link>
              .
            </p>
          </article>
        </div>
      </section>
    </PageTransition>
  );
}
