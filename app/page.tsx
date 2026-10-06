import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { SITE } from "@/data/config";
import { PRODUCTS, getCategoryLabel, getProduct } from "@/data/products";
import { formatPrice } from "@/lib/format";
import { BrandMark } from "@/components/BrandMark";
import { GALLERY } from "@/data/gallery";
import { ProductCard } from "@/components/product/ProductCard";
import { FacebookPagePlugin } from "@/components/FacebookPagePlugin";
import { PageTransition } from "@/components/motion/PageTransition";
import { HeroCanvas } from "@/components/motion/HeroCanvas";
import { Parallax } from "@/components/motion/Parallax";
import { btnGold, btnOutlineGold, btnOutlineLight, btnPrimary, eyebrow } from "@/lib/ui";

export const metadata: Metadata = {
  description:
    "VEXNA SHOP — accesorios, componentes y ropa para bicicleta en Colombia. Pedí contraentrega o pagá directo con Mercado Pago.",
};

const CHIPS = [
  { tone: "gold", label: "Pedidos contraentrega", note: "Pagás al recibir" },
  { tone: "blue", label: "Mercado Pago", note: "Pago directo y seguro" },
  { tone: "gold", label: "Envíos nacionales", note: "A toda Colombia" },
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
    text: "Contraentrega desde el carrito, o pago directo con Mercado Pago desde la ficha.",
  },
  {
    n: "03",
    title: "Recibí en tu puerta",
    text: "Coordinamos la entrega por WhatsApp y pagás al recibir (o ya abonado online).",
  },
];

const REFERENCE_SLUGS = [
  "casco-urbano-vx-aero",
  "luz-delantera-1200lm",
  "candado-u-reforzado",
];

export default function HomePage() {
  const references = REFERENCE_SLUGS.map((slug) => getProduct(slug)).filter(
    (p): p is NonNullable<typeof p> => Boolean(p),
  );
  const refSlugs = new Set(references.map((p) => p.slug));
  const rest = PRODUCTS.filter((p) => !refSlugs.has(p.slug));
  const featured = [...rest.filter((p) => p.featured), ...rest.filter((p) => !p.featured)].slice(0, 4);

  return (
    <PageTransition>
      <section className="bg-matte relative overflow-hidden text-white">
        <HeroCanvas />
        <div className="relative mx-auto grid max-w-6xl gap-12 px-4 py-20 md:py-28 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <div>
            <span
              className="animate-hero-in glass-gold inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[11px] font-bold tracking-[0.28em] text-gold uppercase"
              style={{ "--hero-delay": "60ms" } as React.CSSProperties}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-blue" />
              {SITE.brand} · Tienda oficial
            </span>

            <h1
              className="animate-hero-in mt-6 text-5xl leading-[0.98] sm:text-6xl md:text-7xl"
              style={{ "--hero-delay": "160ms" } as React.CSSProperties}
            >
              Accesorios que
              <span className="block text-gold">impulsan tu ride</span>
            </h1>

            <p
              className="animate-hero-in mt-6 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg"
              style={{ "--hero-delay": "260ms" } as React.CSSProperties}
            >
              Iluminación, seguridad, herramientas y ropa para bicicleta. Comprá con{" "}
              <span className="font-semibold text-gold">contraentrega en Colombia</span> o pagá
              directo con <span className="font-semibold text-blue-bright">Mercado Pago</span>.
            </p>

            <div
              className="animate-hero-in mt-8 flex flex-wrap gap-3"
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
                className="text-sm font-semibold text-white/70 underline-offset-4 transition hover:text-gold hover:underline"
              >
                o seguilos en Facebook →
              </Link>
            </div>

            <ul
              className="animate-hero-in mt-10 grid gap-3 sm:grid-cols-3"
              style={{ "--hero-delay": "460ms" } as React.CSSProperties}
            >
              {CHIPS.map((c) => (
                <li
                  key={c.label}
                  className="glass-dark rounded-sm px-4 py-3 transition duration-300 hover:-translate-y-1 hover:border-gold/40"
                >
                  <p className={`text-xs font-bold tracking-widest uppercase ${c.tone === "gold" ? "text-gold" : "text-blue-bright"}`}>
                    {c.label}
                  </p>
                  <p className="mt-1 text-xs text-white/70">{c.note}</p>
                </li>
              ))}
            </ul>
          </div>

          <div
            className="animate-hero-in relative w-full min-w-0"
            style={{ "--hero-delay": "460ms" } as React.CSSProperties}
          >
            <Parallax speed={0.12}>
              <div className="glass-dark rounded-sm p-5">
                <div className="flex items-baseline justify-between gap-3">
                  <p className="text-[10px] font-bold tracking-[0.3em] text-gold uppercase">
                    Referencias
                  </p>
                  <p className="text-[10px] font-bold tracking-[0.25em] text-white/60 uppercase">
                    Top del catálogo
                  </p>
                </div>

                <ul className="mt-4 space-y-3">
                  {references.map((p) => (
                    <li key={p.slug}>
                      <Link
                        href={`/producto/${p.slug}`}
                        transitionTypes={["nav-forward"]}
                        className="group flex items-center gap-4 rounded-sm border border-white/10 bg-white/[0.04] p-3 transition duration-300 hover:-translate-y-0.5 hover:border-gold/50 hover:bg-white/[0.07]"
                      >
                        <span className="relative block h-14 w-16 shrink-0 overflow-hidden rounded-sm bg-ink">
                          <Image
                            src={p.image}
                            alt=""
                            fill
                            sizes="64px"
                            className="object-cover transition duration-500 group-hover:scale-105"
                          />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-sm font-semibold text-white transition group-hover:text-gold">
                            {p.name}
                          </span>
                          <span className="mt-0.5 block text-[11px] text-white/60">
                            {getCategoryLabel(p.category)}
                          </span>
                        </span>
                        <span className="shrink-0 font-display font-extrabold text-sm text-gold">
                          {formatPrice(p.price)}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>

                <div className="mt-5 grid gap-2 sm:grid-cols-2">
                  <Link
                    href="/tienda"
                    transitionTypes={["nav-forward"]}
                    className={`${btnGold} w-full px-4 text-center`}
                  >
                    Ir a la tienda
                  </Link>
                  <Link
                    href="/comunidad"
                    transitionTypes={["nav-forward"]}
                    className={`${btnOutlineGold} w-full px-4 text-center`}
                  >
                    Ver comunidad
                  </Link>
                </div>
              </div>
            </Parallax>
          </div>
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
            className="text-sm font-bold tracking-widest text-blue uppercase hover:text-gold-deep"
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

      <section className="bg-matte text-white">
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
                className="glass-dark rounded-sm p-6 transition duration-300 hover:-translate-y-1 hover:border-gold/45"
              >
                <p className="font-display font-extrabold text-5xl text-gold">{s.n}</p>
                <h3 className="mt-4 text-xl">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/75">{s.text}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 max-w-3xl text-sm text-white/70">
            ¿Comprás más de un producto? El carrito se paga únicamente contraentrega. Para pago
            directo con Mercado Pago, comprá desde la ficha de cada producto.
          </p>
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
            className="text-sm font-bold tracking-widest text-blue uppercase hover:text-gold-deep"
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
              className={`group relative block overflow-hidden rounded-sm border border-ink/10 bg-ink transition duration-300 hover:-translate-y-1 hover:border-gold/50 ${
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

      <section className="bg-cloud">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:py-20 lg:grid-cols-2 lg:items-center">
          <div data-reveal>
            <div className="mb-5">
              <BrandMark variant="plain" size={56} />
            </div>
            <p className={eyebrow}>Comunidad</p>
            <h2 className="mt-3 text-3xl sm:text-4xl">Seguí a {SITE.brand} en Facebook</h2>
            <p className="mt-4 max-w-lg text-sm leading-relaxed text-ink/75">
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

      <section className="bg-matte text-white">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-4 py-16 sm:py-20" data-reveal>
          <h2 className="max-w-2xl text-3xl sm:text-4xl">
            Armá tu setup con <span className="text-gold">VEXNA SHOP</span>
          </h2>
          <div className="flex flex-wrap gap-3">
            <Link href="/tienda" transitionTypes={["nav-forward"]} className={btnGold}>
              Comprar ahora
            </Link>
            <Link href="/contacto" transitionTypes={["nav-forward"]} className={btnOutlineLight}>
              Contactanos
            </Link>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
