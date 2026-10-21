import Link from "next/link";
import { NAV, SITE } from "@/data/config";
import { CATEGORIES } from "@/data/products";
import { BrandMark } from "@/components/BrandMark";
import { btnInk } from "@/lib/ui";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-bg-2">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <BrandMark size={54} />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
            Accesorios, componentes y ropa para bicicleta. Todos nuestros pedidos se entregan
            contra entrega: recibís el producto y pagás al recibir.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href="/tienda" className={`${btnInk} px-5 py-2.5 text-xs`}>
              Ver productos
            </Link>
            <a
              href={SITE.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-xs font-bold tracking-widest text-fg uppercase transition hover:border-gold hover:bg-gold hover:text-ink btn-focus"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M14 9h3V6h-3c-2.2 0-4 1.8-4 4v2H8v3h2v7h3v-7h3l1-3h-4v-2c0-.6.4-1 1-1z" />
              </svg>
              {SITE.brand} en Facebook
            </a>
          </div>
        </div>

        <div>
          <p className="mb-4 text-xs font-bold tracking-[0.25em] text-gold-deep uppercase">Tienda</p>
          <ul className="space-y-2.5 text-sm text-muted">
            {CATEGORIES.map((c) => (
              <li key={c.slug}>
                <Link href={`/tienda?categoria=${c.slug}`} className="transition hover:text-gold-deep">
                  {c.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/tienda" className="transition hover:text-gold-deep">
                Ver todo
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="mb-4 text-xs font-bold tracking-[0.25em] text-gold-deep uppercase">Información</p>
          <ul className="space-y-2.5 text-sm text-muted">
            {NAV.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="transition hover:text-gold-deep">
                  {n.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/envios-y-cambios" className="transition hover:text-gold-deep">
                Envíos y cambios
              </Link>
            </li>
            <li>
              <Link href="/privacidad" className="transition hover:text-gold-deep">
                Privacidad
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-5 text-[11px] tracking-widest text-muted uppercase sm:flex-row">
          <p>
            © {year} {SITE.name} · {SITE.country}
          </p>
          <p className="flex items-center gap-3">
            <span className="rounded-full bg-gold px-3 py-1 font-bold text-ink">Solo contra entrega</span>
            <span className="hidden sm:inline">Pagás al recibir</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
