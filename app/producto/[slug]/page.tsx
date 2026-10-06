import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PRODUCTS, getCategoryLabel, getProduct } from "@/data/products";
import { ProductPurchase } from "@/components/product/ProductPurchase";
import { ProductCard } from "@/components/product/ProductCard";
import { formatPrice } from "@/lib/format";
import { eyebrow } from "@/lib/ui";

interface Props {
  params: Promise<{ slug: string }>;
}
import { PageTransition } from "@/components/motion/PageTransition";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "Producto no encontrado" };
  return {
    title: product.name,
    description: product.short,
    openGraph: {
      title: `${product.name} | VEXNA SHOP`,
      description: product.short,
      images: [{ url: product.image }],
    },
  };
}

export default async function ProductoPage({ params }: Props) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const related = PRODUCTS.filter((p) => p.category === product.category && p.slug !== product.slug).slice(0, 3);
  const suggestions = related.length ? related : PRODUCTS.filter((p) => p.slug !== product.slug).slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.short,
    image: product.image,
    sku: product.slug,
    brand: { "@type": "Brand", name: "VEXNA" },
    offers: {
      "@type": "Offer",
      priceCurrency: "COP",
      price: product.price,
      availability: product.stock === false ? "https://schema.org/OutOfStock" : "https://schema.org/InStock",
    },
  };

  return (
    <PageTransition>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <nav className="border-b border-ink/10 bg-cloud" aria-label="Migas de pan">
        <ol className="mx-auto flex max-w-6xl flex-wrap gap-2 px-4 py-3 text-xs text-muted">
          <li>
            <Link href="/" className="hover:text-blue">Inicio</Link> /
          </li>
          <li>
            <Link href="/tienda" className="hover:text-blue">Tienda</Link> /
          </li>
          <li aria-current="page" className="text-ink">{product.name}</li>
        </ol>
      </nav>

      <section data-reveal className="mx-auto max-w-6xl px-4 py-10 sm:py-14">
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="space-y-4">
            <div className="relative aspect-[4/3] overflow-hidden rounded-sm border border-gold/40 bg-ink">
              <Image
                src={product.image}
                alt={product.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              {product.badge && (
                <span className="absolute top-4 left-4 bg-gold px-3 py-1.5 text-[11px] font-bold tracking-widest text-ink uppercase">
                  {product.badge}
                </span>
              )}
            </div>
            <div className="grid grid-cols-3 gap-3">
              {product.gallery.map((g) => (
                <div key={g} className="relative aspect-[4/3] overflow-hidden rounded-sm border border-ink/10 bg-ink">
                  <Image src={g} alt={`${product.name} vista`} fill sizes="200px" className="object-cover" />
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className={eyebrow}>{getCategoryLabel(product.category)}</p>
            <h1 className="mt-3 text-4xl sm:text-5xl">{product.name}</h1>
            <p className="mt-4 text-base leading-relaxed text-muted">{product.short}</p>
            <p className="mt-6 font-display font-extrabold text-4xl text-gold-deep">{formatPrice(product.price)}</p>

            <div className="my-6 h-px bg-ink/10" />

            <ProductPurchase product={product} />

            <div className="mt-8 space-y-3 border-t border-ink/10 pt-6">
              <h2 className="text-lg">Descripción</h2>
              <p className="text-sm leading-relaxed text-ink/75">{product.description}</p>
            </div>

            <dl className="mt-6 grid gap-2 border-t border-ink/10 pt-6 text-sm sm:grid-cols-2">
              {product.specs.map((s) => (
                <div key={s.label} className="flex justify-between gap-3 border-b border-ink/5 py-2">
                  <dt className="text-muted">{s.label}</dt>
                  <dd className="font-semibold text-ink">{s.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section data-reveal className="border-t border-ink/10 bg-cloud">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <h2 className="text-2xl">También te puede gustar</h2>
          <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {suggestions.map((p, i) => (
              <ProductCard key={p.slug} product={p} index={i} />
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
