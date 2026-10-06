import type { Product } from "@/lib/types";

export const CATEGORIES: { slug: string; label: string }[] = [
  { slug: "seguridad", label: "Seguridad" },
  { slug: "iluminacion", label: "Iluminación" },
  { slug: "accesorios", label: "Accesorios" },
  { slug: "ropa", label: "Ropa" },
  { slug: "herramientas", label: "Herramientas" },
];

export const PRODUCTS: Product[] = [
  {
    slug: "casco-urbano-vx-aero",
    name: "Casco urbano VX Aero",
    category: "seguridad",
    price: 189900,
    image: "/products/casco-urbano-vx-aero.svg",
    gallery: ["/products/casco-urbano-vx-aero.svg"],
    short: "Casco ligero con ventilación cruzada y ajuste micro-métrico.",
    description:
      "Protección para el uso diario en ciudad y rutas largas. Estructura in-mold de triple densidad, 18 canales de ventilación y ajuste micro-métrico con una sola mano. Forro desmontable y lavable, reflejantes laterales y homologación EN 1078.",
    specs: [
      { label: "Peso", value: "285 g" },
      { label: "Talla", value: "M/L (55–61 cm)" },
      { label: "Ventilación", value: "18 canales" },
      { label: "Certificación", value: "EN 1078" },
    ],
    badge: "Más vendido",
    featured: true,
    stock: true,
  },
  {
    slug: "luz-delantera-1200lm",
    name: "Luz delantera 1200 lm",
    category: "iluminacion",
    price: 95000,
    image: "/products/luz-delantera-1200lm.svg",
    gallery: ["/products/luz-delantera-1200lm.svg"],
    short: "LED de 1200 lúmenes, recargable por USB-C, impermeable IPX6.",
    description:
      "Alcance de visión nocturna con modo eco, medio, alto y estroboscópico. Batería interna de 2600 mAh con indicador de carga, montaje de liberación rápida al manillar y cuerpo de aluminio resistente al agua IPX6.",
    specs: [
      { label: "Potencia", value: "1200 lúmenes" },
      { label: "Autonomía", value: "3 h en modo alto" },
      { label: "Carga", value: "USB-C" },
      { label: "Resistencia", value: "IPX6" },
    ],
    badge: "Nuevo",
    featured: true,
    stock: true,
  },
  {
    slug: "luz-trasera-led",
    name: "Luz trasera LED 50 lm",
    category: "iluminacion",
    price: 59900,
    image: "/products/luz-trasera-led.svg",
    gallery: ["/products/luz-trasera-led.svg"],
    short: "Señal trasera recargable con 5 modos y sensor de frenado.",
    description:
      "Visibilidad trasera garantizada: 50 lúmenes con 5 modos de luz, sensor de frenado automático y aviso de batería baja. Montaje elástico universal a tija o maletín, carga por USB-C e impermeable IPX5.",
    specs: [
      { label: "Potencia", value: "50 lúmenes" },
      { label: "Autonomía", value: "6–15 h" },
      { label: "Modos", value: "5 modos" },
      { label: "Montaje", value: "Tija / maletín" },
    ],
    stock: true,
  },
  {
    slug: "candado-u-reforzado",
    name: "Candado U reforzado 120 cm",
    category: "seguridad",
    price: 149900,
    image: "/products/candado-u-reforzado.svg",
    gallery: ["/products/candado-u-reforzado.svg"],
    short: "Acero templado de 14 mm con funda protectora y 2 llaves.",
    description:
      "Candado en U de acero templado de 14 mm, resistente a cortes y palancas. Funda protectora que evita dañar la pintura, cerradura protegida contra golpes y 2 llaves ergonómicas. Ideal para anclajes públicos y parqueaderos.",
    specs: [
      { label: "Material", value: "Acero templado 14 mm" },
      { label: "Largo", value: "120 mm de luz" },
      { label: "Llaves", value: "2 llaves incluidas" },
      { label: "Peso", value: "690 g" },
    ],
    stock: true,
  },
  {
    slug: "guantes-full-finger-gel",
    name: "Guantes full finger gel",
    category: "ropa",
    price: 69000,
    image: "/products/guantes-full-finger-gel.svg",
    gallery: ["/products/guantes-full-finger-gel.svg"],
    short: "Acogollado en palma, tacto en pantalla y cierre velcro.",
    description:
      "Guantes de rider con acogollado de gel en palma, tejido transpirable en dorso y refuerzo en dedos. Compatible con pantalla táctil, cierre de velcro ajustable y banda reflectiva nocturna.",
    specs: [
      { label: "Tallas", value: "S / M / L" },
      { label: "Palma", value: "Gel antivibración" },
      { label: "Táctil", value: "Índice y pulgar" },
      { label: "Cuidado", value: "Lavable a mano" },
    ],
    stock: true,
  },
  {
    slug: "bidon-termico-750",
    name: "Bidón térmico 750 ml",
    category: "accesorios",
    price: 55000,
    image: "/products/bidon-termico-750.svg",
    gallery: ["/products/bidon-termico-750.svg"],
    short: "Doble pared de acero inoxidable, frío 24 h y calor 12 h.",
    description:
      "Botella de acero inoxidable de doble pared con vacío isotérmico: mantiene bebidas frías hasta 24 horas y calientes hasta 12. Tapa con cierre hermético y diseño compatible con porta-bidones de 74 mm.",
    specs: [
      { label: "Capacidad", value: "750 ml" },
      { label: "Material", value: "Acero inoxidable 304" },
      { label: "Térmico", value: "Frío 24 h / Calor 12 h" },
      { label: "Tapa", value: "Hermetica con asa" },
    ],
    stock: true,
  },
  {
    slug: "maletin-tubular",
    name: "Maletín tubular bajo silla",
    category: "accesorios",
    price: 85000,
    image: "/products/maletin-tubular.svg",
    gallery: ["/products/maletin-tubular.svg"],
    short: "Bolso impermeable para silla con reflejantes y cierre rápido.",
    description:
      "Maletín compacto que se monta bajo el asiento con correas ajustables. Interior con organizador para cámara, herramientas y llaves; tela impermeable, cremallera sellada y tiras reflectantes 360°.",
    specs: [
      { label: "Capacidad", value: "1,2 L" },
      { label: "Montaje", value: "Correas bajo silla" },
      { label: "Material", value: "Poliéster impermeable" },
      { label: "Reflejantes", value: "360°" },
    ],
    stock: true,
  },
  {
    slug: "bomba-manometro",
    name: "Bomba de mano con manómetro",
    category: "herramientas",
    price: 99000,
    image: "/products/bomba-manometro.svg",
    gallery: ["/products/bomba-manometro.svg"],
    short: "Hasta 160 PSI con base estable y adaptadores incluidos.",
    description:
      "Bomba de pie compacta con manómetro analógico de gran lectura, base antideslizante y válvula de doble acción. Incluye adaptadores para válvula Presta, Schrader y aguja, ideal para ruta y MTB.",
    specs: [
      { label: "Presión", value: "Hasta 160 PSI" },
      { label: "Acción", value: "Doble efecto" },
      { label: "Adaptadores", value: "Presta / Schrader / Aguja" },
      { label: "Altura", value: "46 cm" },
    ],
    stock: true,
  },
  {
    slug: "kit-camara-parches",
    name: "Kit cámara + parches 700x28/38",
    category: "herramientas",
    price: 39000,
    image: "/products/kit-camara-parches.svg",
    gallery: ["/products/kit-camara-parches.svg"],
    short: "Cámara universal, 8 parches, desmontables y grasa.",
    description:
      "Kit de emergencia completo: cámara de butilo 700x28/38 con válvula Presta/Schrader, 8 parches de vulcanización en frío, 2 desmontables de acero y tubo de grasa para válvula.",
    specs: [
      { label: "Medida", value: "700x28/38" },
      { label: "Válvula", value: "Presta / Schrader" },
      { label: "Contenido", value: "Cámara, 8 parches, 2 palancas" },
      { label: "Peso", value: "180 g" },
    ],
    stock: true,
  },
  {
    slug: "cinta-manillar",
    name: "Cinta manillar antideslizante",
    category: "accesorios",
    price: 49000,
    image: "/products/cinta-manillar.svg",
    gallery: ["/products/cinta-manillar.svg"],
    short: "EVA de doble densidad con acabado dorado y cinta de cierre.",
    description:
      "Cinta de espuma EVA de doble densidad que absorbe vibración y sudor, con acabado negro y detalles dorados. Incluye cintas de corte para el cierre y tapas finales.",
    specs: [
      { label: "Material", value: "EVA doble densidad" },
      { label: "Largo", value: "2 × 200 cm" },
      { label: "Grosor", value: "3 mm" },
      { label: "Incluye", value: "Tapas y cinta de cierre" },
    ],
    stock: true,
  },
];

export function getProduct(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getFeatured(limit = 4): Product[] {
  const featured = PRODUCTS.filter((p) => p.featured);
  return (featured.length >= limit ? featured : PRODUCTS).slice(0, limit);
}

export function getCategoryLabel(slug: string): string {
  return CATEGORIES.find((c) => c.slug === slug)?.label ?? slug;
}
