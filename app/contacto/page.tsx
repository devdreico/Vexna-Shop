import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/data/config";
import { ContactForm } from "@/components/contacto/ContactForm";
import { btnOutlineGold } from "@/lib/ui";
import { PageHero } from "@/components/layout/PageHero";
import { PageTransition } from "@/components/motion/PageTransition";

export const metadata: Metadata = {
  title: "Contacto",
  description: "Contactá a VEXNA SHOP por Facebook o enviá tu consulta.",
};

export default function ContactoPage() {
  return (
    <PageTransition>
      <PageHero
        eyebrowText="Hablemos"
        title="Contacto"
        description="Consultas sobre productos, envíos o pedidos: respondemos por Facebook y por email."
      />

      <section data-reveal className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
          <div className="space-y-4">
            <div className="panel-dark rounded-3xl p-6 text-white">
              <p className="text-xs font-bold tracking-[0.25em] text-gold uppercase">Facebook</p>
              <p className="mt-2 text-sm text-white/75">{SITE.brand} — página oficial de contenido.</p>
              <a
                href={SITE.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-gold px-5 py-3 text-xs font-bold tracking-widest text-ink uppercase transition hover:bg-gold-light"
              >
                Abrir página
              </a>
            </div>

            <div className="glass-light rounded-3xl p-6">
              <p className="text-xs font-bold tracking-[0.25em] text-gold-deep uppercase">Email</p>
              {SITE.email.startsWith("TU_") ? (
                <p className="mt-2 text-sm text-fg">
                  Muy pronto por aquí. Mientras tanto, escribinos por{" "}
                  <a
                    href={SITE.facebookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-gold-deep hover:underline"
                  >
                    Facebook
                  </a>
                  .
                </p>
              ) : (
                <p className="mt-2 text-sm text-fg">{SITE.email}</p>
              )}
              <p className="mt-4 text-xs leading-relaxed text-muted">
                Para pedidos, el canal más rápido es el checkout: todos los pedidos se registran
                contra entrega y se coordinan por WhatsApp.
              </p>
            </div>

            <div className="glass-light rounded-3xl p-6">
              <p className="text-xs font-bold tracking-[0.25em] text-gold-deep uppercase">Pedidos</p>
              <ul className="mt-3 space-y-2 text-sm text-fg">
                <li>
                  <Link href="/tienda" className="font-semibold text-gold-deep hover:underline">
                    Catálogo →
                  </Link>
                </li>
                <li>
                  <Link href="/envios-y-cambios" className="font-semibold text-gold-deep hover:underline">
                    Envíos y cambios →
                  </Link>
                </li>
              </ul>
            </div>

            <Link href="/comunidad" className={`${btnOutlineGold} w-full`}>
              Ir a la comunidad
            </Link>
          </div>

          <ContactForm />
        </div>
      </section>
    </PageTransition>
  );
}
