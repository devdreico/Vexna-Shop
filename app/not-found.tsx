import Link from "next/link";
import { btnPrimary, btnOutlineGold } from "@/lib/ui";

export default function NotFound() {
  return (
    <section className="bg-hero-glow text-white">
      <div className="mx-auto max-w-2xl px-4 py-28 text-center">
        <p className="font-display text-7xl text-gold-gradient">404</p>
        <h1 className="mt-4 text-3xl sm:text-4xl">Página no encontrada</h1>
        <p className="mt-3 text-sm text-white/70">
          El enlace que seguiste no existe o fue movido.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/" className={btnPrimary}>
            Volver al inicio
          </Link>
          <Link href="/tienda" className={btnOutlineGold}>
            Ir a la tienda
          </Link>
        </div>
      </div>
    </section>
  );
}
