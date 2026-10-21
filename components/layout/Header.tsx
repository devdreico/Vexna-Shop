"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { NAV, SITE } from "@/data/config";
import { useCart } from "@/components/cart/CartProvider";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

const TICKER = [
  "Pedidos contra entrega en toda Colombia",
  "Pagás al recibir el producto",
  "Envíos nacionales de 1 a 6 días hábiles",
  "Garantía de 30 días en todo el catálogo",
  "Comunidad VEXNA BIKE en Facebook",
];

export function Header() {
  const { count } = useCart();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);
  const close = () => setOpen(false);

  useEffect(() => {
    const bar = progressRef.current;
    if (!bar) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      bar.style.transform = `scaleX(${p})`;
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50">
      <div
        ref={progressRef}
        aria-hidden
        className="absolute inset-x-0 top-0 z-20 h-0.5 origin-left bg-gold"
        style={{ transform: "scaleX(0)" }}
      />

      <div className="marquee-mask grass-yellow text-ink">
        <div className="marquee-track py-1.5 text-[11px] font-bold tracking-[0.2em] uppercase">
          {[0, 1].map((half) => (
            <div key={half} className="flex shrink-0 items-center gap-10 pr-10" aria-hidden={half === 1}>
              {TICKER.map((t) => (
                <span key={t} className="flex items-center gap-10 whitespace-nowrap">
                  {t}
                  <span className="text-ink/45">◆</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="glass-header border-b border-line">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
          <Link href="/" transitionTypes={["nav-back"]} onClick={close} className="group flex items-center gap-3 btn-focus" aria-label={`Ir al inicio de ${SITE.name}`}>
            <span className="leading-none">
              <span className="block font-display text-2xl tracking-[0.16em] text-fg">
                <span className="font-black tracking-[-0.02em] text-gold-deep transition group-hover:text-gold">V</span>
                <span className="font-bold">EXNA</span>
              </span>
              <span className="mt-1 block text-[9px] font-bold tracking-[0.5em] text-muted uppercase">
                Shop
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-7 lg:flex" aria-label="Principal">
            {NAV.map((item) => {
              const active =
                item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  transitionTypes={["nav-forward"]}
                  aria-current={active ? "page" : undefined}
                  className={`nav-link text-xs font-bold tracking-[0.18em] uppercase btn-focus hover:text-gold-deep ${
                    active ? "text-gold-deep" : "text-fg"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />

            <Link
              href="/carrito"
              onClick={close}
              className="relative inline-flex items-center gap-2 rounded-full border border-gold-deep/60 px-4 py-2.5 text-xs font-bold tracking-widest text-gold-deep uppercase transition duration-200 hover:bg-gold hover:text-ink hover:border-gold btn-focus"
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
                <span
                  key={count}
                  className="animate-pop absolute -top-2 -right-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-gold px-1 text-[11px] font-black text-ink"
                >
                  {count}
                </span>
              )}
            </Link>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line text-fg lg:hidden btn-focus"
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
          <nav className="border-t border-line bg-bg/95 px-4 py-3 backdrop-blur-lg lg:hidden" aria-label="Móvil">
            <ul className="flex flex-col gap-1">
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={close}
                    transitionTypes={["nav-forward"]}
                    className="block rounded-2xl px-4 py-3 text-sm font-semibold tracking-widest text-fg uppercase transition hover:bg-gold/15 hover:text-gold-deep"
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
