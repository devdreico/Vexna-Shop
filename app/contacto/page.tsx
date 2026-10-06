import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/data/config";
import { ContactForm } from "@/components/contacto/ContactForm";
import { btnOutlineGold, eyebrow } from "@/lib/ui";
import { PageTransition } from "@/components/motion/PageTransition";
import { BrandMark } from "@/components/BrandMark";

export const metadata: Metadata = {
  title: "Contacto",
  description: "Contactá a VEXNA SHOP por Facebook o enviá tu consulta.",
};

export default function ContactoPage() {
  return (
    <PageTransition>
      <section data-reveal className="bg-ink text-white">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <p className={eyebrow}>Hablemos</p>
          <h1 className="mt-3 text-4xl sm:text-5xl text-gold">Contacto</h1>
          <p className="mt-3 max-w-2xl text-sm text-white/70">
            Consultas sobre productos, envíos o pedidos: respondemos por Facebook y por email.
          </p>
        </div>
      </section>

      <section data-reveal className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
          <div className="space-y-4">
            <div className="panel-dark rounded-sm p-6 text-white">
              <div className="mb-4 flex items-center gap-3">
                <BrandMark size={36} />
                <p className="text-xs font-bold tracking-[0.25em] text-gold uppercase">Facebook</p>
              </div>
              <p className="mt-2 text-sm text-white/70">{SITE.brand} — página oficial de contenido.</p>
              <a
                href={SITE.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 rounded-sm bg-blue px-5 py-3 text-xs font-bold tracking-widest uppercase transition hover:bg-blue-bright"
              >
                Abrir página
              </a>
            </div>

            <div className="glass-light rounded-sm p-6 shadow-[0_2px_14px_rgba(10,10,12,0.06)]">
              <p className="text-xs font-bold tracking-[0.25em] text-blue uppercase">Email</p>
              {SITE.email.startsWith("TU_") ? (
                <p className="mt-2 text-sm text-ink/80">
                  Muy pronto por aquí. Mientras tanto, escribinos por{" "}
                  <a
                    href={SITE.facebookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-blue hover:text-gold-deep"
                  >
                    Facebook
                  </a>
                  .
                </p>
              ) : (
                <p className="mt-2 text-sm text-ink/80">{SITE.email}</p>
              )}
              <p className="mt-4 text-xs leading-relaxed text-muted">
                Para pedidos, el canal más rápido es el checkout contraentrega o la ficha de cada
                producto con pago Mercado Pago.
              </p>
            </div>

            <div className="glass-light rounded-sm p-6 shadow-[0_2px_14px_rgba(10,10,12,0.06)]">
              <p className="text-xs font-bold tracking-[0.25em] text-blue uppercase">Pedidos</p>
              <ul className="mt-3 space-y-2 text-sm text-ink/80">
                <li>
                  <Link href="/tienda" className="font-semibold text-blue hover:text-gold-deep">
                    Catálogo →
                  </Link>
                </li>
                <li>
                  <Link href="/envios-y-cambios" className="font-semibold text-blue hover:text-gold-deep">
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
