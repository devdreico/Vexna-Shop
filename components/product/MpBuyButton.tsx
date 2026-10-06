"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { FORMSPREE } from "@/data/config";
import { formatPrice } from "@/lib/format";
import type { Product } from "@/lib/types";
import { btnGold, input, label } from "@/lib/ui";

interface Props {
  product: Product;
  qty: number;
  className?: string;
}

type Status = "idle" | "sending" | "success" | "error";

export function MpBuyButton({ product, qty, className = "" }: Props) {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const firstField = useRef<HTMLInputElement>(null);

  const total = product.price * qty;
  const hasLink = Boolean(product.mpLink);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => firstField.current?.focus(), 60);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      clearTimeout(t);
    };
  }, [open]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!hasLink) {
      setStatus("error");
      setMessage("Este producto aún no tiene link de pago configurado.");
      return;
    }
    setStatus("sending");
    setMessage("");

    const form = e.currentTarget;
    const data = new FormData(form);
    data.set("producto", product.name);
    data.set("slug", product.slug);
    data.set("precio_unitario", String(product.price));
    data.set("cantidad", String(qty));
    data.set("total", String(total));
    data.set("total_formateado", formatPrice(total));
    data.set("link_pago", product.mpLink ?? "");
    data.set("url_producto", `/producto/${product.slug}`);
    data.set("fecha", new Date().toISOString());

    try {
      const res = await fetch(FORMSPREE.mercadoPago, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });

      if (res.ok) {
        setStatus("success");
        setMessage("¡Pedido registrado! Redirigiendo a Mercado Pago…");
        window.setTimeout(() => {
          window.location.href = product.mpLink as string;
        }, 900);
      } else {
        const body = await res.json().catch(() => null);
        const detail = body?.errors?.map((err: { message: string }) => err.message).join(", ");
        setStatus("error");
        setMessage(detail || "No pudimos registrar el pedido. Intentá nuevamente.");
      }
    } catch {
      setStatus("error");
      setMessage("Error de conexión. Verificá tu internet e intentá de nuevo.");
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setStatus("idle");
          setMessage("");
          setOpen(true);
        }}
        className={`${btnGold} ${className}`}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
          <rect x="2" y="5" width="20" height="14" rx="2" />
          <path d="M2 10h20" />
        </svg>
        Pagar con Mercado Pago
      </button>

      {!hasLink && (
        <p className="mt-2 text-xs text-muted">
          Pago online pendiente de configurar (link de Mercado Pago del producto).
        </p>
      )}

      {open && (
        <div
          className="fixed inset-0 z-[60] flex items-start justify-center overflow-y-auto bg-ink/80 p-4 backdrop-blur-sm sm:items-center"
          role="dialog"
          aria-modal="true"
          aria-labelledby="mp-dialog-title"
          onMouseDown={(e) => e.target === e.currentTarget && setOpen(false)}
        >
          <div className="my-8 w-full max-w-lg rounded-sm border border-gold/50 bg-white shadow-2xl">
            <div className="flex items-start justify-between gap-4 border-b border-ink/10 bg-ink px-6 py-4">
              <div>
                <p className="text-[10px] font-bold tracking-[0.25em] text-blue uppercase">
                  Pago directo Mercado Pago
                </p>
                <h2 id="mp-dialog-title" className="mt-1 text-xl text-white">
                  Datos de envío
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="text-white/60 transition hover:text-gold"
                aria-label="Cerrar"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 px-6 py-5">
              <div className="rounded-sm border border-blue/30 bg-blue/5 px-4 py-3 text-sm">
                <p className="font-semibold text-ink">
                  {product.name} <span className="text-muted">× {qty}</span>
                </p>
                <p className="mt-1 font-display text-xl text-gold-deep">{formatPrice(total)}</p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className={label} htmlFor="mp-nombre">Nombre completo *</label>
                  <input ref={firstField} id="mp-nombre" name="nombre" required className={input} autoComplete="name" />
                </div>
                <div>
                  <label className={label} htmlFor="mp-celular">Celular / WhatsApp *</label>
                  <input id="mp-celular" name="celular" required type="tel" className={input} autoComplete="tel" placeholder="300 000 0000" />
                </div>
                <div>
                  <label className={label} htmlFor="mp-email">Email *</label>
                  <input id="mp-email" name="email" required type="email" className={input} autoComplete="email" />
                </div>
                <div>
                  <label className={label} htmlFor="mp-ciudad">Ciudad *</label>
                  <input id="mp-ciudad" name="ciudad" required className={input} autoComplete="address-level2" />
                </div>
                <div>
                  <label className={label} htmlFor="mp-departamento">Departamento *</label>
                  <input id="mp-departamento" name="departamento" required className={input} autoComplete="address-level1" />
                </div>
                <div className="sm:col-span-2">
                  <label className={label} htmlFor="mp-direccion">Dirección de envío *</label>
                  <input id="mp-direccion" name="direccion" required className={input} autoComplete="street-address" />
                </div>
                <div className="sm:col-span-2">
                  <label className={label} htmlFor="mp-barrio">Barrio</label>
                  <input id="mp-barrio" name="barrio" className={input} />
                </div>
                <div className="sm:col-span-2">
                  <label className={label} htmlFor="mp-notas">Notas del pedido</label>
                  <textarea id="mp-notas" name="notas" rows={2} className={input} placeholder="Referencias, horario de entrega…" />
                </div>
              </div>

              <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

              {message && (
                <p
                  role="alert"
                  className={`rounded-sm px-3 py-2 text-sm ${
                    status === "success" ? "bg-blue/10 text-blue-deep" : "bg-danger/10 text-danger"
                  }`}
                >
                  {message}
                </p>
              )}

              <div className="flex flex-col gap-2 border-t border-ink/10 pt-4 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="px-5 py-3 text-sm font-semibold tracking-widest text-ink/60 uppercase transition hover:text-ink"
                >
                  Cancelar
                </button>
                <button type="submit" disabled={status === "sending" || status === "success"} className={btnGold}>
                  {status === "sending" ? "Enviando…" : status === "success" ? "Redirigiendo…" : "Continuar al pago"}
                </button>
              </div>

              <p className="text-xs leading-relaxed text-muted">
                Al continuar, tus datos de envío y la compra quedan registrados y luego te llevamos a
                Mercado Pago para abonar {formatPrice(total)}.
              </p>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
