import Image from "next/image";
import { SITE } from "@/data/config";
import { diasPara, formatFechaRuta, rutaEstado, type Ruta } from "@/data/rutas";
import { RutaStatus } from "@/components/rutas/RutaStatus";
import { btnOutlineGoldSm, btnOutlineSm, btnPrimarySm } from "@/lib/ui";

function IconMap() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

function IconWhatsApp() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18a8 8 0 0 1-4.1-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8 8 0 1 1 12 20zm4.4-5.8c-.2-.1-1.4-.7-1.6-.8s-.4-.1-.6.1-.6.8-.8 1-.3.2-.5.1a6.5 6.5 0 0 1-3.2-2.8c-.2-.4.2-.4.6-1.2.1-.2 0-.4 0-.5s-.6-1.5-.9-2-.5-.5-.6-.5h-.5a1 1 0 0 0-.7.3A2.8 2.8 0 0 0 6.6 12a8.4 8.4 0 0 0 3.5 4 8.6 8.6 0 0 0 3.3 1.1 3.9 3.9 0 0 0 2.6-1.8 3.2 3.2 0 0 0 .2-1.8c-.1-.1-.3-.2-.5-.3z" />
    </svg>
  );
}

function IconFacebook() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M14 9h3V6h-3c-2.2 0-4 1.8-4 4v2H8v3h2v7h3v-7h3l1-3h-4v-2c0-.6.4-1 1-1z" />
    </svg>
  );
}

interface Props {
  ruta: Ruta;
  index?: number;
}

export function RutaCard({ ruta, index = 0 }: Props) {
  const estado = rutaEstado(ruta);
  const esProxima = estado === "proxima";
  const fecha = formatFechaRuta(ruta.date);
  const whatsapp = ruta.whatsappUrl ?? SITE.whatsapp;

  return (
    <article
      data-reveal
      style={{ "--reveal-delay": `${index * 80}ms` } as React.CSSProperties}
      className={`group glass-light flex flex-col overflow-hidden rounded-3xl transition duration-300 hover:-translate-y-1 ${
        esProxima ? "border-gold/60 shadow-[0_24px_60px_-30px_rgba(255,214,10,0.55)]" : "hover:border-gold/70"
      }`}
    >
      <div className="relative aspect-[16/9] overflow-hidden bg-ink">
        <Image
          src={ruta.photos[0]}
          alt={`Ruta ${ruta.title}`}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-x-0 top-3 flex flex-wrap items-center justify-between gap-2 px-3">
          <RutaStatus ruta={ruta} initial={`${estado}:${diasPara(ruta)}`} />
          <span className="rounded-full bg-ink/85 px-3 py-1 text-[10px] font-bold tracking-widest text-white uppercase backdrop-blur-sm">
            {fecha}
          </span>
        </div>
        {ruta.photos.length > 1 && (
          <div className="absolute right-3 bottom-3 flex gap-1.5">
            {ruta.photos.slice(1).map((p) => (
              <span
                key={p}
                className="relative block h-9 w-9 overflow-hidden rounded-lg border border-white/40 bg-ink/70"
              >
                <Image src={p} alt="" fill sizes="36px" className="object-cover" />
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-4 p-5 sm:p-6">
        <div>
          <h3 className="text-xl leading-tight sm:text-2xl">{ruta.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">{ruta.description}</p>
        </div>

        <div className="rounded-2xl border border-line bg-bg-2/70 p-4">
          <p className="text-[10px] font-black tracking-[0.24em] text-gold-deep uppercase">
            Info de llegada
          </p>
          <dl className="mt-3 space-y-2 text-xs leading-relaxed">
            <div className="flex gap-2">
              <dt className="shrink-0 font-black text-fg uppercase">Encuentro:</dt>
              <dd className="text-muted">{ruta.llegada.encuentro}</dd>
            </div>
            <div className="flex gap-2">
              <dt className="shrink-0 font-black text-fg uppercase">Destino:</dt>
              <dd className="text-muted">{ruta.llegada.destino}</dd>
            </div>
            <div className="flex gap-2">
              <dt className="shrink-0 font-black text-fg uppercase">Cómo llegar:</dt>
              <dd className="text-muted">{ruta.llegada.comoLlegar}</dd>
            </div>
          </dl>
        </div>

        <div className="mt-auto flex flex-wrap gap-2">
          <a
            href={ruta.llegada.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={btnPrimarySm}
          >
            <IconMap /> Abrir en Maps
          </a>
          <a
            href={whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className={btnOutlineSm}
          >
            <IconWhatsApp /> WhatsApp
          </a>
          {esProxima && (
            <a
              href={SITE.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={btnOutlineGoldSm}
            >
              <IconFacebook /> Confirmar en Facebook
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
