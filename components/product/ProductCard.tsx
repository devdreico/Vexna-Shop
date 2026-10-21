"use client";

import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/format";
import { getCategoryLabel } from "@/data/products";
import type { Product } from "@/lib/types";
import { AddToCartButton } from "@/components/product/AddToCartButton";
import { card } from "@/lib/ui";

interface Props {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 0 }: Props) {
  return (
    <article
      data-reveal
      style={{ "--reveal-delay": `${index * 70}ms` } as React.CSSProperties}
      className={`group flex flex-col overflow-hidden ${card}`}
    >
      <Link href={`/producto/${product.slug}`} className="relative block aspect-[4/3] overflow-hidden bg-ink btn-focus">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
        {product.badge && (
          <span className="absolute top-3 left-3 rounded-full bg-gold px-3 py-1 text-[10px] font-black tracking-widest text-ink uppercase">
            {product.badge}
          </span>
        )}
        <span className="absolute right-3 bottom-3 rounded-full bg-ink/85 px-3 py-1 text-[10px] font-bold tracking-widest text-gold uppercase backdrop-blur-sm">
          Contra entrega
        </span>
      </Link>

      <div className="flex flex-1 flex-col gap-2 p-5">
        <p className="text-[10px] font-bold tracking-[0.2em] text-gold-deep uppercase">
          {getCategoryLabel(product.category)}
        </p>
        <h3 className="text-lg leading-tight">
          <Link href={`/producto/${product.slug}`} className="transition hover:text-gold-deep btn-focus">
            {product.name}
          </Link>
        </h3>
        <p className="line-clamp-2 text-sm leading-relaxed text-muted">{product.short}</p>
        <p className="mt-auto pt-2 font-display font-extrabold text-2xl text-gold-deep">
          {formatPrice(product.price)}
        </p>
        <AddToCartButton slug={product.slug} className="mt-1" />
      </div>
    </article>
  );
}
