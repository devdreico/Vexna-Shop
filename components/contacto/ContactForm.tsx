"use client";

import { useState, type FormEvent } from "react";
import { FORMSPREE, SITE } from "@/data/config";
import { btnPrimary, input, label } from "@/lib/ui";

type Status = "idle" | "sending" | "ok" | "error";

const CONFIGURED = !FORMSPREE.contacto.includes("TU_FORM_ID");

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!CONFIGURED) {
      setStatus("error");
      setMessage(
        `Formulario aún sin configurar. Escribinos por Facebook: ${SITE.facebookUrl}`,
      );
      return;
    }

    setStatus("sending");
    setMessage("");
    const data = new FormData(e.currentTarget);
    data.set("_subject", "Consulta desde VEXNA SHOP");

    try {
      const res = await fetch(FORMSPREE.contacto, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setStatus("ok");
        setMessage("¡Gracias! Te respondemos a la brevedad.");
        e.currentTarget.reset();
      } else {
        const body = await res.json().catch(() => null);
        const detail = body?.errors?.map((err: { message: string }) => err.message).join(", ");
        setStatus("error");
        setMessage(detail || "No pudimos enviar el mensaje. Intentá nuevamente.");
      }
    } catch {
      setStatus("error");
      setMessage("Error de conexión. Intentá nuevamente.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-sm glass-light p-6 shadow-[0_2px_14px_rgba(10,10,12,0.06)] sm:p-8">
      <h2 className="text-2xl">Escribinos</h2>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={label} htmlFor="ct-nombre">Nombre *</label>
          <input id="ct-nombre" name="nombre" required className={input} autoComplete="name" />
        </div>
        <div>
          <label className={label} htmlFor="ct-email">Email *</label>
          <input id="ct-email" name="email" required type="email" className={input} autoComplete="email" />
        </div>
        <div className="sm:col-span-2">
          <label className={label} htmlFor="ct-asunto">Asunto</label>
          <input id="ct-asunto" name="asunto" className={input} />
        </div>
        <div className="sm:col-span-2">
          <label className={label} htmlFor="ct-mensaje">Mensaje *</label>
          <textarea id="ct-mensaje" name="mensaje" required rows={5} className={input} />
        </div>
      </div>

      <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      {!CONFIGURED && (
        <p className="rounded-sm border border-gold/50 bg-gold/10 px-3 py-2 text-xs leading-relaxed text-ink/80">
          Formulario pendiente de configurar: creá un formulario en formspree.io y colocá su
          endpoint en <code className="font-mono">data/config.ts</code>. Mientras tanto, contactanos
          por Facebook.
        </p>
      )}

      {message && (
        <p
          role="alert"
          className={`rounded-sm px-3 py-2 text-sm ${
            status === "ok" ? "bg-blue/10 text-blue-deep" : "bg-danger/10 text-danger"
          }`}
        >
          {message}
        </p>
      )}

      <button type="submit" disabled={status === "sending"} className={`${btnPrimary} w-full`}>
        {status === "sending" ? "Enviando…" : "Enviar mensaje"}
      </button>
    </form>
  );
}
