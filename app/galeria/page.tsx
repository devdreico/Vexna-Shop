import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/data/config";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { btnOutlineGold, eyebrow } from "@/lib/ui";

export const metadata: Metadata = {
  title: "Galería",
  description: "Fotos de bicicletas, rutas, eventos y entregas de la comunidad VEXNA BIKE.",
};

export default function GaleriaPage() {
  return (
    <>
      <section className="bg-ink text-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-end justify-between gap-5 px-4 py-14">
          <div>
            <p className={eyebrow}>Comunidad en imágenes</p>
            <h1 className="mt-3 text-4xl sm:text-5xl text-gold-gradient">Galería</h1>
            <p className="mt-3 max-w-xl text-sm text-white/70">
              Builds, rutas, eventos y entregas. El contenido completo vive también en nuestra
              página de Facebook.
            </p>
          </div>
          <Link
            href={SITE.facebookUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={btnOutlineGold}
          >
            Ver más en Facebook
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
        <GalleryGrid />
      </section>
    </>
  );
}
