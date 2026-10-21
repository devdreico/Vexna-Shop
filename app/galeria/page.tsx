import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/data/config";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { btnOutlineGold } from "@/lib/ui";
import { PageHero } from "@/components/layout/PageHero";
import { PageTransition } from "@/components/motion/PageTransition";

export const metadata: Metadata = {
  title: "Galería",
  description: "Fotos de bicicletas, rutas, eventos y entregas de la comunidad VEXNA BIKE.",
};

export default function GaleriaPage() {
  return (
    <PageTransition>
      <PageHero
        eyebrowText="Comunidad en imágenes"
        title="Galería"
        description="Builds, rutas, eventos y entregas. El contenido completo vive también en nuestra página de Facebook."
      >
        <div className="mt-7 flex flex-wrap gap-3">
          <Link
            href={SITE.facebookUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={btnOutlineGold}
          >
            Ver más en Facebook
          </Link>
        </div>
      </PageHero>

      <section data-reveal className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
        <GalleryGrid />
      </section>
    </PageTransition>
  );
}
