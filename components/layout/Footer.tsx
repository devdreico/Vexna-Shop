import Link from "next/link";
import { NAV, SITE } from "@/data/config";
import { CATEGORIES } from "@/data/products";
import { BrandMark } from "@/components/BrandMark";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t-2 border-gold/50 bg-ink text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3">
            <BrandMark size={44} />
            <p className="font-display font-extrabold text-3xl tracking-widest text-gold">VEXNA SHOP</p>
          </div>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/75">
            Accesorios, componentes y ropa para bicicleta. Pedí contraentrega en Colombia o pagá
            directo con Mercado Pago.
          </p>
          <a
            href={SITE.facebookUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 rounded-sm bg-blue px-5 py-2.5 text-xs font-bold tracking-widest text-white uppercase transition hover:bg-blue-bright"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M14 9h3V6h-3c-2.2 0-4 1.8-4 4v2H8v3h2v7h3v-7h3l1-3h-4v-2c0-.6.4-1 1-1z" />
            </svg>
            {SITE.brand} en Facebook
          </a>
        </div>

        <div>
          <p className="mb-4 text-xs font-bold tracking-[0.25em] text-gold uppercase">Tienda</p>
          <ul className="space-y-2.5 text-sm text-white/75">
            {CATEGORIES.map((c) => (
              <li key={c.slug}>
                <Link href={`/tienda?categoria=${c.slug}`} className="transition hover:text-gold">
                  {c.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/tienda" className="transition hover:text-gold">
                Ver todo
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="mb-4 text-xs font-bold tracking-[0.25em] text-gold uppercase">Información</p>
          <ul className="space-y-2.5 text-sm text-white/75">
            {NAV.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="transition hover:text-gold">
                  {n.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/envios-y-cambios" className="transition hover:text-gold">
                Envíos y cambios
              </Link>
            </li>
            <li>
              <Link href="/privacidad" className="transition hover:text-gold">
                Privacidad
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-5 text-[11px] tracking-widest text-white/50 uppercase sm:flex-row">
          <p>© {year} {SITE.name} · {SITE.country}</p>
          <p className="flex items-center gap-3">
            <span className="text-gold">Contraentrega</span>
            <span className="text-white/30">|</span>
            <span className="text-blue-bright">Mercado Pago</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
