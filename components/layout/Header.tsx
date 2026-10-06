"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { NAV, SITE } from "@/data/config";
import { useCart } from "@/components/cart/CartProvider";

export function Header() {
  const { count } = useCart();
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header className="sticky top-0 z-50">
      <div className="bg-gold-gradient text-ink">
        <div className="mx-auto flex max-w-6xl items-center justify-center gap-3 px-4 py-1.5 text-[11px] font-bold tracking-[0.2em] uppercase">
          <span>Pedidos contraentrega en Colombia</span>
          <span className="hidden text-blue sm:inline">·</span>
          <span className="hidden text-blue sm:inline">Pago directo con Mercado Pago</span>
        </div>
      </div>

      <div className="border-b border-gold/30 bg-ink/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
          <Link href="/" onClick={close} className="group flex items-center gap-3 btn-focus" aria-label={SITE.name}>
            <span className="relative block h-10 w-10 overflow-hidden rounded-full border border-gold/60">
              <Image src="/logo.png" alt={`${SITE.name} logo`} fill sizes="40px" className="object-cover" />
            </span>
            <span className="leading-none">
              <span className="block font-display text-2xl tracking-widest text-gold-gradient">
                VEXNA
              </span>
              <span className="block text-[10px] font-bold tracking-[0.4em] text-white/70 uppercase">
                Shop
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-7 lg:flex" aria-label="Principal">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-xs font-semibold tracking-[0.18em] text-white/85 uppercase transition hover:text-gold btn-focus"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/carrito"
              onClick={close}
              className="relative inline-flex items-center gap-2 rounded-sm border border-gold/60 px-3 py-2 text-xs font-semibold tracking-widest text-gold uppercase transition hover:bg-gold hover:text-ink btn-focus"
              aria-label={`Carrito, ${count} productos`}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                <path d="M6 6h15l-1.5 9h-12z" />
                <path d="M6 6 5 2H2" />
                <circle cx="9" cy="20" r="1.5" />
                <circle cx="18" cy="20" r="1.5" />
              </svg>
              <span className="hidden sm:inline">Carrito</span>
              {count > 0 && (
                <span className="absolute -top-2 -right-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-blue px-1 text-[11px] font-bold text-white">
                  {count}
                </span>
              )}
            </Link>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-sm border border-white/25 text-white lg:hidden btn-focus"
              aria-expanded={open}
              aria-label="Abrir menú"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M3 6h18M3 12h18M3 18h18" />}
              </svg>
            </button>
          </div>
        </div>

        {open && (
          <nav className="border-t border-white/10 bg-ink px-4 py-3 lg:hidden" aria-label="Móvil">
            <ul className="flex flex-col gap-1">
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={close}
                    className="block rounded-sm px-3 py-2.5 text-sm font-semibold tracking-widest text-white/85 uppercase hover:bg-white/5 hover:text-gold"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}
