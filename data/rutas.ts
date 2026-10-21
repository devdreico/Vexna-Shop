export interface RutaLlegada {
  /** Punto de encuentro con referencias exactas */
  encuentro: string;
  /** Sitio / destino de la salida */
  destino: string;
  /** Cómo llegar: transporte, referencias, consejos */
  comoLlegar: string;
  /** Link de Google Maps del punto de encuentro o recorrido */
  mapsUrl: string;
}

export interface Ruta {
  slug: string;
  title: string;
  /** Fecha ISO (YYYY-MM-DD). El estado se deriva: futura = próxima, pasado = realizada */
  date: string;
  description: string;
  photos: string[];
  llegada: RutaLlegada;
  /** Opcional: si falta se usa SITE.whatsapp */
  whatsappUrl?: string;
}

export type RutaEstado = "proxima" | "realizada";

export function rutaEstado(ruta: Pick<Ruta, "date">, now = new Date()): RutaEstado {
  const fecha = new Date(`${ruta.date}T12:00:00`);
  return fecha.getTime() >= now.getTime() ? "proxima" : "realizada";
}

export function diasPara(ruta: Pick<Ruta, "date">, now = new Date()): number {
  const fecha = new Date(`${ruta.date}T12:00:00`);
  return Math.max(0, Math.ceil((fecha.getTime() - now.getTime()) / 86_400_000));
}

export function formatFechaRuta(iso: string): string {
  const fecha = new Date(`${iso}T12:00:00`);
  return new Intl.DateTimeFormat("es-CO", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(fecha);
}

function maps(query: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

/**
 * EJEMPLO de contenido — reemplazá estas rutas por las reales de VEXNA
 * (nombres, fechas, puntos de encuentro y links de Maps).
 */
export const RUTAS: Ruta[] = [
  {
    slug: "cota-madrid-ronda-de-la-sabana",
    title: "Ronda de la Sabana · Cota – Madrid",
    date: "2026-11-15",
    description:
      "Salida tranquila por la vía que une Cota con Madrid, ideal para quienes se estrenan en ruta. Regreso por el mismo corredor con parada de hidratación a mitad de camino.",
    photos: ["/gallery/grupal-ciclovia.svg", "/gallery/bicicleta-dorada.svg"],
    llegada: {
      encuentro: "Parque Principal de Cota, junto a la estatua de la entrada ( Cra. 4 # 1-50)",
      destino: "Plaza principal de Madrid, Cundinamarca",
      comoLlegar:
        "Desde Bogotá toma la ruta hacia Mosquera y desciende en Cota por la vía al Carmen. El punto de encuentro queda a 2 cuadras del terminal, con parqueadero y tiendas.",
      mapsUrl: maps("Parque Principal de Cota, Cundinamarca"),
    },
  },
  {
    slug: "subida-a-bojaca",
    title: "Subida a Bojacá",
    date: "2026-12-06",
    description:
      "Ascenso por la vía principal hasta el casco urbano de Bojacá, con vista abierta a toda la Sabana. Ritmo conversacional con grupos por niveles.",
    photos: ["/gallery/ruta-de-montana.svg", "/gallery/armado-rueda.svg"],
    llegada: {
      encuentro: "Cruce vía El Rosal – Bojacá, costado paradero de buses",
      destino: "Iglesia central de Bojacá, plaza del pueblo",
      comoLlegar:
        "Por la vía al El Rosal, 10 minutos desde el cruce de Fontibón. Hay buses que dejan a 500 m del punto de encuentro y tiendas para abastecerse antes de subir.",
      mapsUrl: maps("Cruce vía El Rosal Bojacá Cundinamarca"),
    },
  },
  {
    slug: "mosquera-madrid-via-antigua",
    title: "Mosquera – Madrid por la vía antigua",
    date: "2026-09-12",
    description:
      "Recorrido de ida y vuelta por la vía antigua entre Mosquera y Madrid, el clásico de la Sabana: terreno plano, buenas visuales y parada de café a mitad de camino.",
    photos: ["/gallery/grupal-ciclovia.svg", "/gallery/cliente-feliz.svg"],
    llegada: {
      encuentro: "Parque de Mosquera, frente a la alcaldía",
      destino: "Plaza de Madrid, Cundinamarca",
      comoLlegar:
        "Acceso directo desde la Autopista Sur tomando la salida a Mosquera. El parque tiene espacio seguro para las bicis y baños.",
      mapsUrl: maps("Parque de Mosquera Cundinamarca"),
    },
  },
  {
    slug: "funza-cota-atardecer",
    title: "Funza – Cota al atardecer",
    date: "2026-08-15",
    description:
      "Salida de tarde entre Funza y Cota aprovechando la luz del atardecer sobre la Sabana. Terreno mixto con un tramo de trocha consolidada.",
    photos: ["/gallery/ride-nocturna.svg", "/gallery/grupal-ciclovia.svg"],
    llegada: {
      encuentro: "Parque de Funza, junto a la cancha principal",
      destino: "Parque de Cota, entrada principal",
      comoLlegar:
        "Funza queda a 10 minutos de la estación de Transmilenio El Tiemblito. Desde ahí se toma la vía plana hacia Cota por la vía al Carmen.",
      mapsUrl: maps("Parque de Funza Cundinamarca"),
    },
  },
  {
    slug: "bojaca-el-rosal",
    title: "Bojacá – El Rosal",
    date: "2026-07-04",
    description:
      "Ruta de fin de semana hasta El Rosal con regreso por el corredor principal. Buena ocasión para probar ritmo de grupo en terreno con micro-subidas.",
    photos: ["/gallery/ruta-de-montana.svg", "/gallery/bicicleta-dorada.svg"],
    llegada: {
      encuentro: "Parque de Bojacá, costado de la iglesia",
      destino: "El Rosal, Cundinamarca — parque central",
      comoLlegar:
        "Subida desde el cruce de Fontibón por la vía al El Rosal. En Bojacá hay parqueadero y tiendas antes de continuar.",
      mapsUrl: maps("Parque de Bojacá Cundinamarca"),
    },
  },
  {
    slug: "nocturna-fontibon",
    title: "Nocturna por Fontibón",
    date: "2026-06-20",
    description:
      "Paseo nocturno por Fontibón con luces encendidas y cierre en grupo. Salida de verano, ritmo suave y foco en seguridad y visibilidad.",
    photos: ["/gallery/ride-nocturna.svg", "/gallery/unboxing-accesorios.svg"],
    llegada: {
      encuentro: "Parque Jaime Duque – acceso Fontibón (costado occidental)",
      destino: "Fontibón, retorno por la vía de la Cantera",
      comoLlegar:
        "Acceso por la Autopista Sur, salida Fontibón. El punto de encuentro tiene iluminación, parqueadero y espacio para el armado de las bicis.",
      mapsUrl: maps("Fontibón Bogotá parque"),
    },
  },
];

export const PROXIMAS_RUTAS = RUTAS.filter((r) => rutaEstado(r) === "proxima").sort((a, b) =>
  a.date.localeCompare(b.date),
);

export const RUTAS_REALIZADAS = RUTAS.filter((r) => rutaEstado(r) === "realizada").sort((a, b) =>
  b.date.localeCompare(a.date),
);
