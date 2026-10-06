"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FORMSPREE, SITE } from "@/data/config";
import { formatPrice } from "@/lib/format";
import { writeOrder } from "@/lib/order";
import { useCart } from "@/components/cart/CartProvider";
import { btnPrimary, input, label } from "@/lib/ui";

type Status = "idle" | "sending" | "error";

export function ContraentregaForm() {
  const router = useRouter();
  const { lines, subtotal, count, clear } = useCart();
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  if (count === 0) {
    return (
      <div className="rounded-sm border border-gold/50 bg-cloud px-6 py-12 text-center">
        <h2 className="text-2xl">Tu carrito está vacío</h2>
        <p className="mt-2 text-sm text-muted">Agregá productos para generar tu pedido contraentrega.</p>
        <Link href="/tienda" className={`${btnPrimary} mt-6`}>
          Ir a la tienda
        </Link>
      </div>
    );
  }

  const orderText = lines
    .map((l) => `${l.qty} x ${l.product.name} — ${formatPrice(l.subtotal)}`)
    .join("\n");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setMessage("");

    const data = new FormData(e.currentTarget);
    data.set("_subject", `Nuevo pedido contraentrega — ${SITE.name}`);
    data.set("_pedido", orderText);
    data.set("_total", formatPrice(subtotal));
    data.set("_items", String(count));
    data.set("_metodo_pago", String(data.get("medio_pago") ?? "Contraentrega"));
    data.set("_source", "vexna-shop-checkout");
    data.set("fecha", new Date().toISOString());

    try {
      const res = await fetch(FORMSPREE.contraentrega, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });

      if (res.ok) {
        writeOrder({
          nombre: String(data.get("nombre") ?? ""),
          total: formatPrice(subtotal),
          lines: lines.map((l) => ({ name: l.product.name, qty: l.qty, subtotal: l.subtotal })),
          metodo: String(data.get("medio_pago") ?? "Contraentrega"),
        });
        clear();
        router.push("/gracias");
      } else {
        const body = await res.json().catch(() => null);
        const detail = body?.errors?.map((err: { message: string }) => err.message).join(", ");
        setStatus("error");
        setMessage(detail || "No pudimos enviar el pedido. Intentá nuevamente o contactanos por Facebook.");
      }
    } catch {
      setStatus("error");
      setMessage("Error de conexión. Verificá tu internet e intentá de nuevo.");
    }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
      <form onSubmit={handleSubmit} className="rounded-sm glass-light p-6 shadow-[0_2px_14px_rgba(10,10,12,0.06)] sm:p-8">
        <h2 className="text-2xl">Datos de entrega</h2>
        <p className="mt-1 mb-6 text-sm text-muted">
          Completá tus datos y coordinamos la entrega. Pagás en efectivo al recibir.
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className={label} htmlFor="ce-nombre">Nombre completo *</label>
            <input id="ce-nombre" name="nombre" required className={input} autoComplete="name" />
          </div>
          <div>
            <label className={label} htmlFor="ce-cedula">Cédula</label>
            <input id="ce-cedula" name="cedula" className={input} inputMode="numeric" />
          </div>
          <div>
            <label className={label} htmlFor="ce-celular">Celular / WhatsApp *</label>
            <input id="ce-celular" name="celular" required type="tel" className={input} autoComplete="tel" placeholder="300 000 0000" />
          </div>
          <div className="sm:col-span-2">
            <label className={label} htmlFor="ce-email">Email *</label>
            <input id="ce-email" name="email" required type="email" className={input} autoComplete="email" />
          </div>
          <div>
            <label className={label} htmlFor="ce-ciudad">Ciudad *</label>
            <input id="ce-ciudad" name="ciudad" required className={input} autoComplete="address-level2" />
          </div>
          <div>
            <label className={label} htmlFor="ce-departamento">Departamento *</label>
            <input id="ce-departamento" name="departamento" required className={input} autoComplete="address-level1" />
          </div>
          <div className="sm:col-span-2">
            <label className={label} htmlFor="ce-direccion">Dirección de envío *</label>
            <input id="ce-direccion" name="direccion" required className={input} autoComplete="street-address" />
          </div>
          <div className="sm:col-span-2">
            <label className={label} htmlFor="ce-barrio">Barrio</label>
            <input id="ce-barrio" name="barrio" className={input} />
          </div>
          <div className="sm:col-span-2">
            <label className={label} htmlFor="ce-notas">Notas del pedido</label>
            <textarea id="ce-notas" name="notas" rows={3} className={input} placeholder="Referencias, horario preferido…" />
          </div>
        </div>

        <fieldset className="mt-6">
          <legend className={label}>Medio de pago contraentrega *</legend>
          <div className="flex flex-wrap gap-3">
            <label className="flex cursor-pointer items-center gap-2 rounded-sm border border-ink/15 px-4 py-3 text-sm transition hover:border-blue">
              <input type="radio" name="medio_pago" value="Efectivo" defaultChecked className="accent-blue" />
              Efectivo
            </label>
            <label className="flex cursor-pointer items-center gap-2 rounded-sm border border-ink/15 px-4 py-3 text-sm transition hover:border-blue">
              <input type="radio" name="medio_pago" value="Transferencia" className="accent-blue" />
              Transferencia al recibir
            </label>
          </div>
        </fieldset>

        <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

        {message && (
          <p role="alert" className="mt-5 rounded-sm bg-danger/10 px-3 py-2 text-sm text-danger">
            {message}
          </p>
        )}

        <button type="submit" disabled={status === "sending"} className={`${btnPrimary} mt-6 w-full`}>
          {status === "sending" ? "Enviando pedido…" : "Confirmar pedido contraentrega"}
        </button>
        <p className="mt-3 text-xs leading-relaxed text-muted">
          Tu pedido se registra y te contactamos por WhatsApp para coordinar la entrega. No se cobra
          nada por adelantado.
        </p>
      </form>

      <aside className="panel-dark h-fit rounded-sm p-6 text-white lg:sticky lg:top-32">
        <h2 className="text-xl text-gold">Resumen del pedido</h2>
        <ul className="mt-5 divide-y divide-white/10">
          {lines.map((l) => (
            <li key={l.product.slug} className="flex items-start justify-between gap-4 py-3 text-sm">
              <span>
                <span className="font-bold text-blue-bright">{l.qty}×</span> {l.product.name}
              </span>
              <span className="shrink-0 text-white/80">{formatPrice(l.subtotal)}</span>
            </li>
          ))}
        </ul>
        <div className="mt-4 flex items-center justify-between border-t border-gold/40 pt-4">
          <span className="text-xs font-bold tracking-widest text-white/60 uppercase">Total</span>
          <span className="font-display font-extrabold text-3xl text-gold">{formatPrice(subtotal)}</span>
        </div>
        <div className="mt-5 space-y-2 border-t border-white/10 pt-4 text-xs text-white/60">
          <p>· Pago contraentrega al recibir el pedido.</p>
          <p>· Envío coordinado por WhatsApp.</p>
          <p>· Pedidos desde {formatPrice(0)} sin costo de gestión.</p>
        </div>
      </aside>
    </div>
  );
}
