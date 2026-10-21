import type { Metadata } from "next";
import { SITE } from "@/data/config";
import { PROXIMAS_RUTAS, RUTAS_REALIZADAS } from "@/data/rutas";
import { PageHero } from "@/components/layout/PageHero";
import { RutaCard } from "@/components/rutas/RutaCard";
import { btnGold, btnOutlineInk } from "@/lib/ui";

export const metadata: Metadata = {
  title: "Rutas",
  description: `Rutas VEXNA por la Sabana Occidental: próximas salidas, rutas realizadas e información de llegada (punto de encuentro, destino y cómo llegar). ${SITE.name}.`,
};

export default function RutasPage() {
  return (
    <div className="page-pad">
      <PageHero
        eyebrowText="Rutas VEXNA"
        title="Rutas"
        description="Salidas por la Sabana Occidental: consultá las próximas, revisá las ya realizadas y encontrá toda la información de llegada para sumarte."
      />

      <div className="mx-auto max-w-6xl space-y-20 pb-12">
        {PROXIMAS_RUTAS.length > 0 && (
          <section aria-labelledby="proximas">
            <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="text-[11px] font-black tracking-[0.24em] text-gold-deep uppercase">
                  Próximas salidas
                </p>
                <h2 id="proximas" className="mt-1 text-2xl sm:text-3xl">
                  Salidas por venir
                </h2>
              </div>
              <p className="max-w-sm text-sm text-muted">
                Confirmá tu cupo en Facebook o WhatsApp y revisá el punto de encuentro antes de salir.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {PROXIMAS_RUTAS.map((ruta, i) => (
                <RutaCard key={ruta.slug} ruta={ruta} index={i} />
              ))}
            </div>
          </section>
        )}

        {RUTAS_REALIZADAS.length > 0 && (
          <section aria-labelledby="realizadas">
            <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="text-[11px] font-black tracking-[0.24em] text-gold-deep uppercase">
                  Archivo VEXNA
                </p>
                <h2 id="realizadas" className="mt-1 text-2xl sm:text-3xl">
                  Rutas realizadas
                </h2>
              </div>
              <p className="max-w-sm text-sm text-muted">
                Rides ya completados con su información de llegada para replicarlos por tu cuenta.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {RUTAS_REALIZADAS.map((ruta, i) => (
                <RutaCard key={ruta.slug} ruta={ruta} index={i} />
              ))}
            </div>
          </section>
        )}

        <section className="grass-yellow relative overflow-hidden rounded-3xl p-7 sm:p-10">
          <div className="relative z-10 flex flex-col items-start gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-xl">
              <p className="text-[11px] font-black tracking-[0.24em] text-ink/60 uppercase">
                Próxima salida
              </p>
              <h2 className="mt-2 text-2xl text-ink sm:text-3xl">
                ¿Querés sumarte a la próxima ruta?
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-ink/80">
                Publicamos fecha, punto de encuentro e información de llegada en Facebook. También
                podés escribirnos directo por WhatsApp para confirmar tu cupo.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href={SITE.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={btnOutlineInk}
              >
                Seguir en Facebook
              </a>
              <a
                href={SITE.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className={btnGold}
              >
                Escribir por WhatsApp
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
