import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { SITE } from "@/data/config";
import { PRODUCTS, getCategoryLabel } from "@/data/products";
import { formatPrice } from "@/lib/format";
import { GALLERY } from "@/data/gallery";
import { ProductCard } from "@/components/product/ProductCard";
import { FacebookPagePlugin } from "@/components/FacebookPagePlugin";
import { PageTransition } from "@/components/motion/PageTransition";
import { HeroCanvas } from "@/components/motion/HeroCanvas";
import { Parallax } from "@/components/motion/Parallax";
import { btnGold, btnInk, btnOutlineGold, btnOutlineInk, btnPrimary, eyebrow } from "@/lib/ui";

export const metadata: Metadata = {
  description:
    "VEXNA SHOP — accesorios, componentes y ropa para bicicleta en Colombia. Todos los pedidos son contra entrega: recibís y pagás al recibir.",
};

const TRUST = [
  {
    title: "Solo contra entrega",
    note: "Pagás al recibir, nunca por adelantado",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
        <rect x="2" y="6" width="20" height="12" rx="3" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
  },
  {
    title: "Envíos a toda Colombia",
    note: "De 1 a 6 días hábiles según tu ciudad",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
        <path d="M3 7h11v9H3z" />
        <path d="M14 10h4l3 3v3h-7" />
        <circle cx="7" cy="18" r="2" />
        <circle cx="17.5" cy="18" r="2" />
      </svg>
    ),
  },
  {
    title: "Garantía de 30 días",
    note: "Por defectos de fabricación",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
        <path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" />
        <path d="M8.5 12l2.5 2.5L16 9.5" />
      </svg>
    ),
  },
  {
    title: "Cambios fáciles",
    note: "Avisás dentro de 48 horas y lo resolvemos",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
        <path d="M4 9a8 8 0 0 1 14-4l2 2" />
        <path d="M20 15a8 8 0 0 1-14 4l-2-2" />
        <path d="M20 3v4h-4M4 21v-4h4" />
      </svg>
    ),
  },
];

const STEPS = [
  {
    n: "01",
    title: "Elegí tu producto",
    text: "Recorré el catálogo y agregá lo que necesitás para tu ride.",
  },
  {
    n: "02",
    title: "Registra tu pedido",
    text: "Completá el checkout con tus datos de entrega. No pedimos ningún pago previo.",
  },
  {
    n: "03",
    title: "Recibí y pagá",
    text: "Coordinamos por WhatsApp, entregamos en tu puerta y pagás en efectivo o transferencia al recibir.",
  },
];

export default function HomePage() {
  const spotlight = PRODUCTS.find((p) => p.featured) ?? PRODUCTS[0];
  const rest = PRODUCTS.filter((p) => p.slug !== spotlight.slug);
  const featured = [...rest.filter((p) => p.featured), ...rest.filter((p) => !p.featured)].slice(0, 4);

  return (
    <PageTransition>
      <section className="bg-matte relative overflow-hidden">
        <HeroCanvas />
        <div className="relative mx-auto grid max-w-6xl gap-12 px-4 py-20 md:py-28 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <div>
            <span
              className="animate-hero-in glass-gold inline-flex items-center rounded-full px-4 py-1.5 text-[11px] font-bold tracking-[0.28em] text-gold-deep uppercase"
              style={{ "--hero-delay": "60ms" } as React.CSSProperties}
            >
              {SITE.brand} · Tienda oficial
            </span>

            <h1
              className="animate-hero-in mt-6 text-5xl leading-[0.98] sm:text-6xl md:text-7xl"
              style={{ "--hero-delay": "160ms" } as React.CSSProperties}
            >
              Accesorios que
              <span className="marker block w-fit">impulsan tu ride</span>
            </h1>

            <p
              className="animate-hero-in mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg"
              style={{ "--hero-delay": "260ms" } as React.CSSProperties}
            >
              Iluminación, seguridad, herramientas y ropa para bicicleta. Todos nuestros pedidos
              se entregan{" "}
              <span className="font-bold text-gold-deep">contra entrega en Colombia</span>: recibís
              el producto y pagás al recibir.
            </p>

            <div
              className="animate-hero-in mt-8 flex flex-wrap items-center gap-3"
              style={{ "--hero-delay": "360ms" } as React.CSSProperties}
            >
              <Link href="/tienda" transitionTypes={["nav-forward"]} className={btnPrimary}>
                Ver productos
              </Link>
              <Link href="/comunidad" transitionTypes={["nav-forward"]} className={btnOutlineGold}>
                Ir a la comunidad
              </Link>
              <Link
                href={SITE.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold text-muted underline-offset-4 transition hover:text-gold-deep hover:underline"
              >
                o seguilos en Facebook →
              </Link>
            </div>

            <ul
              className="animate-hero-in mt-10 grid gap-3 sm:grid-cols-3"
              style={{ "--hero-delay": "460ms" } as React.CSSProperties}
            >
              {[
                { label: "Pagás al recibir", note: "100% contra entrega" },
                { label: "Envíos nacionales", note: "A toda Colombia" },
                { label: "Garantía 30 días", note: "En todo el catálogo" },
              ].map((c) => (
                <li
                  key={c.label}
                  className="glass-light rounded-3xl px-4 py-3 transition duration-300 hover:-translate-y-1 hover:border-gold/70"
                >
                  <p className="text-xs font-bold tracking-widest text-gold-deep uppercase">
                    {c.label}
                  </p>
                  <p className="mt-1 text-xs text-muted">{c.note}</p>
                </li>
              ))}
            </ul>
          </div>

          <div
            className="animate-hero-in relative w-full min-w-0"
            style={{ "--hero-delay": "460ms" } as React.CSSProperties}
          >
            <Parallax speed={0.12}>
              <div className="panel-dark rounded-3xl p-6 text-white">
                <div className="flex items-baseline justify-between gap-3">
                  <p className="text-[10px] font-bold tracking-[0.3em] text-gold uppercase">
                    Producto destacado
                  </p>
                  <p className="text-[10px] font-bold tracking-[0.25em] text-white/55 uppercase">
                    {getCategoryLabel(spotlight.category)}
                  </p>
                </div>

                <Link
                  href={`/producto/${spotlight.slug}`}
                  transitionTypes={["nav-forward"]}
                  className="group mt-4 block"
                >
                  <span className="relative block aspect-[4/3] overflow-hidden rounded-2xl bg-ink-700">
                    <Image
                      src={spotlight.image}
                      alt={spotlight.name}
                      fill
                      sizes="(max-width: 1024px) 90vw, 40vw"
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                    {spotlight.badge && (
                      <span className="absolute top-3 left-3 rounded-full bg-gold px-3 py-1 text-[10px] font-black tracking-widest text-ink uppercase">
                        {spotlight.badge}
                      </span>
                    )}
                  </span>
                  <span className="mt-4 flex items-baseline justify-between gap-3">
                    <span className="text-lg leading-tight font-semibold transition group-hover:text-gold">
                      {spotlight.name}
                    </span>
                    <span className="shrink-0 font-display font-extrabold text-xl text-gold">
                      {formatPrice(spotlight.price)}
                    </span>
                  </span>
                </Link>

                <Link
                  href={`/producto/${spotlight.slug}`}
                  transitionTypes={["nav-forward"]}
                  className={`${btnGold} mt-5 w-full`}
                >
                  Ver producto
                </Link>
                <p className="mt-3 text-center text-xs text-white/60">
                  Se entrega contra entrega: lo ves, lo probás y pagás al recibir.
                </p>
              </div>
            </Parallax>
          </div>
        </div>
      </section>

      <section className="grass-yellow">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 py-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {TRUST.map((t) => (
            <div key={t.title} className="flex items-start gap-3">
              <span className="mt-0.5 shrink-0">{t.icon}</span>
              <div>
                <p className="text-sm font-black tracking-wide text-ink uppercase">{t.title}</p>
                <p className="mt-0.5 text-xs leading-relaxed text-ink/70">{t.note}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
        <div className="mb-9 flex flex-wrap items-end justify-between gap-4" data-reveal>
          <div>
            <p className={eyebrow}>Selección VEXNA</p>
            <h2 className="mt-3 text-3xl sm:text-4xl">Productos destacados</h2>
          </div>
          <Link
            href="/tienda"
            transitionTypes={["nav-forward"]}
            className="text-sm font-bold tracking-widest text-gold-deep uppercase hover:underline"
          >
            Ver todo el catálogo →
          </Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((p, i) => (
            <ProductCard key={p.slug} product={p} index={i} />
          ))}
        </div>
      </section>

      <section className="bg-matte border-y border-line">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
          <div data-reveal>
            <p className={eyebrow}>Cómo comprar</p>
            <h2 className="mt-3 text-3xl sm:text-4xl">Tres pasos y listo</h2>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {STEPS.map((s, i) => (
              <div
                key={s.n}
                data-reveal
                style={{ "--reveal-delay": `${i * 90}ms` } as React.CSSProperties}
                className="glass-light rounded-3xl p-6 transition duration-300 hover:-translate-y-1 hover:border-gold/70"
              >
                <p className="font-display font-extrabold text-5xl text-gold-deep">{s.n}</p>
                <h3 className="mt-4 text-xl">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{s.text}</p>
              </div>
            ))}
          </div>
          <div
            data-reveal
            className="grass-yellow mt-8 flex flex-col gap-3 rounded-3xl p-6 sm:flex-row sm:items-center sm:justify-between"
          >
            <p className="max-w-3xl text-sm leading-relaxed text-ink">
              <span className="font-black uppercase">Todos los pedidos son contra entrega. </span>
              No vendemos de otra forma: no hay pagos previos ni datos de tarjeta. Recibís el
              producto en tu puerta y pagás en efectivo o transferencia al recibir.
            </p>
            <Link href="/envios-y-cambios" className={`${btnInk} shrink-0 px-5 py-2.5 text-xs`}>
              Ver políticas
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
        <div className="mb-9 flex flex-wrap items-end justify-between gap-4" data-reveal>
          <div>
            <p className={eyebrow}>Galería</p>
            <h2 className="mt-3 text-3xl sm:text-4xl">Momentos VEXNA</h2>
          </div>
          <Link
            href="/galeria"
            transitionTypes={["nav-forward"]}
            className="text-sm font-bold tracking-widest text-gold-deep uppercase hover:underline"
          >
            Abrir galería →
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {GALLERY.slice(0, 4).map((g, i) => (
            <Link
              key={g.src}
              href="/galeria"
              transitionTypes={["nav-forward"]}
              data-reveal
              style={{ "--reveal-delay": `${i * 80}ms` } as React.CSSProperties}
              className={`group relative block overflow-hidden rounded-3xl border border-line bg-ink transition duration-300 hover:-translate-y-1 hover:border-gold/60 ${
                i === 0 ? "aspect-square lg:row-span-2 lg:aspect-auto" : "aspect-[4/3]"
              }`}
            >
              <Image
                src={g.src}
                alt={g.title}
                fill
                sizes="(max-width: 640px) 50vw, 25vw"
                className="object-cover transition duration-500 group-hover:scale-105"
              />
              <span className="absolute inset-x-0 bottom-0 bg-ink/85 p-3 text-xs font-semibold text-white">
                {g.title}
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-bg-2 border-y border-line">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:py-20 lg:grid-cols-2 lg:items-center">
          <div data-reveal>
            <p className={eyebrow}>Comunidad</p>
            <h2 className="mt-3 text-3xl sm:text-4xl">Seguí a {SITE.brand} en Facebook</h2>
            <p className="mt-4 max-w-lg text-sm leading-relaxed text-muted">
              Rutas, novedades, promociones y contenido de ciclismo se publican a diario en nuestra
              página de Facebook. Sumate a la comunidad y enterate primero de cada lanzamiento.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href={SITE.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={btnPrimary}
              >
                Ir a la página
              </Link>
              <Link href="/comunidad" transitionTypes={["nav-forward"]} className={btnOutlineGold}>
                Ver comunidad
              </Link>
            </div>
          </div>
          <div className="flex justify-center" data-reveal style={{ "--reveal-delay": "120ms" } as React.CSSProperties}>
            <FacebookPagePlugin width={500} height={560} className="w-full max-w-[500px]" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
        <div
          data-reveal
          className="grass-yellow rounded-3xl px-6 py-12 sm:px-12 sm:py-14"
        >
          <div className="flex flex-col items-start gap-6">
            <h2 className="max-w-2xl text-3xl text-ink sm:text-4xl">
              Armá tu setup con VEXNA SHOP
            </h2>
            <p className="max-w-xl text-sm leading-relaxed text-ink/75">
              Pedís hoy, recibís en tu puerta y pagás al recibir. Así de simple, en toda Colombia.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/tienda" transitionTypes={["nav-forward"]} className={btnInk}>
                Comprar ahora
              </Link>
              <Link
                href="/rutas"
                transitionTypes={["nav-forward"]}
                className={btnOutlineInk}
              >
                Ver rutas
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
