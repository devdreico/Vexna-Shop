"use client";

import { useSyncExternalStore } from "react";
import { diasPara, rutaEstado, type Ruta, type RutaEstado } from "@/data/rutas";

function subscribe(onChange: () => void) {
  const id = setInterval(onChange, 60_000);
  return () => clearInterval(id);
}

function snapshotOf(ruta: Ruta): string {
  return `${rutaEstado(ruta)}:${diasPara(ruta)}`;
}

interface Props {
  ruta: Ruta;
  /** Valor calculado en el servidor/build para evitar desajuste de hidratación */
  initial: string;
  size?: "sm" | "lg";
}

export function RutaStatus({ ruta, initial, size = "sm" }: Props) {
  const snap = useSyncExternalStore(subscribe, () => snapshotOf(ruta), () => initial);

  const sep = snap.indexOf(":");
  const estado = snap.slice(0, sep) as RutaEstado;
  const dias = Number(snap.slice(sep + 1));

  const base =
    size === "lg"
      ? "px-4 py-1.5 text-[11px] font-black tracking-[0.2em]"
      : "px-3 py-1 text-[10px] font-black tracking-[0.18em]";

  if (estado === "proxima") {
    return (
      <span
        className={`${base} inline-flex items-center gap-2 rounded-full bg-gold text-ink uppercase`}
      >
        <span className="relative flex h-1.5 w-1.5" aria-hidden>
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ink/60" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-ink" />
        </span>
        Próxima
        {dias > 0 && (
          <span className="font-bold tracking-normal normal-case opacity-75">
            · en {dias} {dias === 1 ? "día" : "días"}
          </span>
        )}
      </span>
    );
  }

  return (
    <span
      className={`${base} inline-flex items-center gap-1.5 rounded-full bg-ink text-gold uppercase`}
    >
      <svg
        width="11"
        height="11"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="M5 13l4 4L19 7" />
      </svg>
      Realizada
    </span>
  );
}
