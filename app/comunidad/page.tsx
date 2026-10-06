import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/data/config";
import { FacebookPagePlugin } from "@/components/FacebookPagePlugin";
import { btnPrimary, btnOutlineGold, eyebrow } from "@/lib/ui";
import { PageTransition } from "@/components/motion/PageTransition";

export const metadata: Metadata = {
  title: `Comunidad ${SITE.brand}`,
  description: `Sumate a la comunidad de ${SITE.brand}: rutas, novedades y contenido de ciclismo en Facebook.`,
};

export default function ComunidadPage() {
  return (
    <PageTransition>
      <section data-reveal className="bg-matte text-white">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <p className={eyebrow}>Redes</p>
          <h1 className="mt-3 text-4xl sm:text-5xl text-gold">
            Comunidad {SITE.brand}
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/75">
            {SITE.name} nace junto a {SITE.brand}: contenido de ciclismo, rutas, novedades y
            promociones se publican a diario en Facebook. Seguinos para enterarte primero.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href={SITE.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={btnPrimary}
            >
              Seguir en Facebook
            </Link>
            <Link href="/tienda" className={btnOutlineGold}>
              Ir a la tienda
            </Link>
          </div>
        </div>
      </section>

      <section data-reveal className="mx-auto max-w-6xl px-4 py-14">
        <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-start">
          <div>
            <h2 className="text-3xl">Lo que vas a encontrar</h2>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2">
              {[
                { t: "Rutas y salidas", d: "Resúmenes de ride, puntos de encuentro y fotos de la salida." },
                { t: "Novedades de producto", d: "Lanzamientos y stock nuevo avisado primero en la página." },
                { t: "Promociones", d: "Descuentos y combos exclusivos para la comunidad." },
                { t: "Contenido técnico", d: "Tips de mantenimiento, ajustes y seguridad." },
              ].map((c) => (
                <li key={c.t} className="glass-light rounded-sm p-5 shadow-[0_2px_14px_rgba(10,10,12,0.06)] transition duration-300 hover:-translate-y-1 hover:border-gold/60">
                  <p className="text-sm font-bold tracking-widest text-blue uppercase">{c.t}</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{c.d}</p>
                </li>
              ))}
            </ul>
            <div className="panel-dark mt-8 rounded-sm p-6 text-white">
              <p className="text-xs font-bold tracking-[0.25em] text-gold uppercase">Conexión directa</p>
              <a
                href={SITE.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 block break-all font-display font-extrabold text-xl text-gold hover:text-blue-bright"
              >
                {SITE.facebookUrl}
              </a>
            </div>
          </div>

          <div className="mx-auto w-full max-w-[500px]">
            <p className="mb-3 text-xs font-bold tracking-[0.25em] text-blue uppercase">
              Publicaciones recientes
            </p>
            <FacebookPagePlugin width={500} height={640} />
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
