export const SITE = {
  name: "VEXNA SHOP",
  brand: "VEXNA BIKE",
  tagline: "Accesorios que impulsan tu ride",
  description:
    "Tienda de accesorios y componentes para bicicleta en Colombia. Todos los pedidos se entregan contra entrega: pagás al recibir.",
  url: "https://vexna-shop.vercel.app",
  locale: "es_CO",
  country: "Colombia",
  currency: "COP",
  email: "TU_EMAIL",
  address: "Colombia",
  facebookUrl: "https://www.facebook.com/profile.php?id=61592077406874",
  facebookPageId: "61592077406874",
} as const;

export const FORMSPREE = {
  contraentrega: "https://formspree.io/f/xjygkkyp",
  contacto: "https://formspree.io/f/TU_FORM_ID",
} as const;

export const NAV = [
  { href: "/", label: "Inicio" },
  { href: "/tienda", label: "Tienda" },
  { href: "/galeria", label: "Galería" },
  { href: "/comunidad", label: "Comunidad" },
  { href: "/contacto", label: "Contacto" },
] as const;
