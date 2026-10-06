import Link from "next/link";
import { btnPrimary, btnOutlineGold } from "@/lib/ui";
import { PageTransition } from "@/components/motion/PageTransition";
import { BrandMark } from "@/components/BrandMark";

export default function NotFound() {
  return (
    <PageTransition>
        <section data-reveal className="bg-matte text-white">
          <div className="mx-auto max-w-2xl px-4 py-28 text-center">
            <BrandMark size={64} className="mx-auto" />
            <p className="mt-8 font-display font-extrabold text-7xl text-gold">404</p>
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
    </PageTransition>
  );
}
