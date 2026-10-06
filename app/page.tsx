import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { SITE } from "@/data/config";
import { getFeatured } from "@/data/products";
import { GALLERY } from "@/data/gallery";
import { ProductCard } from "@/components/product/ProductCard";
import { FacebookPagePlugin } from "@/components/FacebookPagePlugin";
import { btnGold, btnOutlineGold, btnOutlineLight, btnPrimary, eyebrow } from "@/lib/ui";

export const metadata: Metadata = {
  description:
    "VEXNA SHOP — accesorios, componentes y ropa para bicicleta en Colombia. Pedí contraentrega o pagá directo con Mercado Pago.",
};

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

export default function HomePage() {
  const featured = getFeatured(4);

  return (
    <>
      <section className="bg-hero-glow relative overflow-hidden text-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-20 md:py-28 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <div>
            <p className={eyebrow}>
              <span className="h-px w-8 bg-gold" />
              {SITE.brand} · Tienda oficial
            </p>
            <h1 className="mt-5 text-5xl leading-[0.95] sm:text-6xl md:text-7xl">
              Accesorios que
              <span className="block text-gold-gradient">impulsan tu ride</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">
              Iluminación, seguridad, herramientas y ropa para bicicleta. Comprá con{" "}
              <span className="font-semibold text-gold">contraentrega en Colombia</span> o pagá
              directo con <span className="font-semibold text-blue-bright">Mercado Pago</span>.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/tienda" className={btnPrimary}>
                Ver tienda
              </Link>
              <Link
                href={SITE.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={btnOutlineGold}
              >
                Seguir a {SITE.brand}
              </Link>
            </div>
          </div>

          <div className="relative mx-auto hidden w-full max-w-md lg:block">
            <div className="absolute -inset-4 rounded-full bg-blue/20 blur-3xl" aria-hidden />
            <div className="relative overflow-hidden rounded-sm border-2 border-gold/70">
              <Image
                src="/logo.png"
                alt={SITE.name}
                width={520}
                height={520}
                priority
                className="h-auto w-full"
              />
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 bg-ink/70 backdrop-blur">
          <ul className="mx-auto grid max-w-6xl divide-y divide-white/10 px-4 text-sm sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            <li className="flex items-center gap-3 py-4 sm:justify-center">
              <span className="text-gold" aria-hidden>◆</span> Pedidos contraentrega
            </li>
            <li className="flex items-center gap-3 py-4 sm:justify-center">
              <span className="text-blue-bright" aria-hidden>◆</span> Pago seguro Mercado Pago
            </li>
            <li className="flex items-center gap-3 py-4 sm:justify-center">
              <span className="text-gold" aria-hidden>◆</span> Envíos a toda Colombia
            </li>
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
        <div className="mb-9 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className={eyebrow}>Selección VEXNA</p>
            <h2 className="mt-3 text-3xl sm:text-4xl">Productos destacados</h2>
          </div>
          <Link href="/tienda" className="text-sm font-bold tracking-widest text-blue uppercase hover:text-gold-deep">
            Ver todo el catálogo →
          </Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>

      <section className="bg-ink text-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
          <p className={eyebrow}>Cómo comprar</p>
          <h2 className="mt-3 text-3xl sm:text-4xl">Tres pasos y listo</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {STEPS.map((s) => (
              <div key={s.n} className="border border-white/10 bg-white/[0.03] p-6 transition hover:border-gold/50">
                <p className="font-display text-5xl text-gold-gradient">{s.n}</p>
                <h3 className="mt-4 text-xl">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/65">{s.text}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-sm text-white/60">
            ¿Comprás más de un producto? El carrito se paga únicamente contraentrega. Para pago
            directo con Mercado Pago, comprá desde la ficha de cada producto.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
        <div className="mb-9 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className={eyebrow}>Galería</p>
            <h2 className="mt-3 text-3xl sm:text-4xl">Momentos VEXNA</h2>
          </div>
          <Link href="/galeria" className="text-sm font-bold tracking-widest text-blue uppercase hover:text-gold-deep">
            Abrir galería →
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {GALLERY.slice(0, 4).map((g, i) => (
            <Link
              key={g.src}
              href="/galeria"
              className={`group relative block overflow-hidden rounded-sm border border-ink/10 bg-ink ${
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
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink to-transparent p-3 text-xs font-semibold text-white opacity-80">
                {g.title}
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-cloud">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:py-20 lg:grid-cols-2 lg:items-center">
          <div>
            <p className={eyebrow}>Comunidad</p>
            <h2 className="mt-3 text-3xl sm:text-4xl">
              Seguí a {SITE.brand} en Facebook
            </h2>
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
              <Link href="/comunidad" className={btnOutlineGold}>
                Ver comunidad
              </Link>
            </div>
          </div>
          <div className="flex justify-center">
            <FacebookPagePlugin width={500} height={560} className="w-full max-w-[500px]" />
          </div>
        </div>
      </section>

      <section className="bg-hero-glow text-white">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-4 py-16 sm:py-20">
          <h2 className="max-w-2xl text-3xl sm:text-4xl">
            Armá tu setup con <span className="text-gold-gradient">VEXNA SHOP</span>
          </h2>
          <div className="flex flex-wrap gap-3">
            <Link href="/tienda" className={btnGold}>
              Comprar ahora
            </Link>
            <Link href="/contacto" className={btnOutlineLight}>
              Contactanos
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
