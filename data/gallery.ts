import type { GalleryItem } from "@/lib/types";

export const GALLERY: GalleryItem[] = [
  {
    src: "/gallery/ride-nocturna.svg",
    title: "Ride nocturna por la ciudad",
    category: "eventos",
  },
  {
    src: "/gallery/bicicleta-dorada.svg",
    title: "Build personal en oro y negro",
    category: "bicicletas",
  },
  {
    src: "/gallery/taller-ajustes.svg",
    title: "Ajustes en el taller",
    category: "taller",
  },
  {
    src: "/gallery/cliente-feliz.svg",
    title: "Entrega a nuestro rider",
    category: "clientes",
  },
  {
    src: "/gallery/grupal-ciclovia.svg",
    title: "Salida grupal de domingo",
    category: "eventos",
  },
  {
    src: "/gallery/ruta-de-montana.svg",
    title: "Ruta de montaña al amanecer",
    category: "bicicletas",
  },
  {
    src: "/gallery/armado-rueda.svg",
    title: "Centrado de rueda",
    category: "taller",
  },
  {
    src: "/gallery/unboxing-accesorios.svg",
    title: "Unboxing de accesorios VX",
    category: "clientes",
  },
];

export const GALLERY_CATEGORIES = [
  { slug: "todos", label: "Todo" },
  { slug: "bicicletas", label: "Bicicletas" },
  { slug: "eventos", label: "Eventos" },
  { slug: "clientes", label: "Clientes" },
  { slug: "taller", label: "Taller" },
];
