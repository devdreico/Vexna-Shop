# VEXNA SHOP

E-commerce de accesorios para bicicleta — tienda oficial de la página **VEXNA BIKE** en Facebook.

- **Diseño:** grassmorphism redondeado (vidrio + grano) en amarillo dominante sobre blanco/negro, con temas claro y oscuro conmutable desde el header.
- **Marca:** logotipo tipográfico "VEXNA" (V en bold) y favicon `app/icon.svg` con la V.
- **Moneda:** Colombia — COP (`$ 189.900`).
- **Venta exclusiva contra entrega:** todos los productos se entregan y se pagan al recibir (efectivo o transferencia). No hay pagos online.
- **Pedidos:** se indexan en Formspree `https://formspree.io/f/xjygkkyp`.

## Stack

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · Vercel.
Sin backend propio: el carrito vive en `localStorage` y los pedidos se envían a Formspree.

## Estructura

```
app/                páginas (home, tienda, producto/[slug], carrito, checkout,
                    gracias, galeria, comunidad, contacto, envios-y-cambios,
                    privacidad, sitemap, robots)
components/         header, footer, carrito, productos, checkout, galería, contacto
data/config.ts      sitio, Facebook, endpoints de Formspree
data/products.ts    catálogo de 10 productos (precios, specs)
data/gallery.ts     fotos de la galería
lib/                formato COP, tipos, clases de UI, snapshot del pedido
public/products/    imágenes de productos (SVG placeholder → reemplazar por fotos)
public/gallery/     imágenes de la galería (SVG placeholder → reemplazar por fotos)
app/icon.svg        favicon (V bold amarilla sobre negro)
app/opengraph-image.tsx  imagen social generada con next/og (Montserrat en assets/fonts/)
```

## Configuración

### 1. Formspree (ya conectado)

| Uso | Endpoint |
| --- | --- |
| Pedidos contra entrega (carrito → `/checkout`) | `https://formspree.io/f/xjygkkyp` |
| Formulario de contacto (opcional) | `https://formspree.io/f/TU_FORM_ID` |

Los endpoints viven en `data/config.ts`. El formulario de contacto muestra un aviso hasta que
coloques su endpoint real.

### 2. Datos del sitio (`data/config.ts`)

- `SITE.url`: dominio final (Vercel) → afecta sitemap, OpenGraph y metadata.
- `SITE.email`: tu email de contacto (si queda como `TU_EMAIL`, la web muestra el enlace a Facebook).
- `SITE.facebookUrl`: página de VEXNA BIKE (ya configurada).

### 3. Fotos

Reemplazá los SVG de `public/products/` y `public/gallery/` por fotos reales manteniendo los
mismos nombres (o actualizá `image` / `gallery` en `data/products.ts` y `src` en `data/gallery.ts`).

## Flujos de compra

| Canal | Recorrido | Registro |
| --- | --- | --- |
| Contra entrega (único canal) | Ficha/carrito → `/carrito` → `/checkout` → datos de envío → confirmar | Formspree `xjygkkyp` + resumen en `/gracias`; entrega y pago coordinados por WhatsApp |

## Comandos

```bash
npm install
npm run dev        # desarrollo en http://localhost:3000
npm run build      # build de producción
npm start          # servir el build
npm run lint       # ESLint
npm run typecheck  # TypeScript
```

## Despliegue en Vercel

1. Subí el repo a GitHub (ya está vinculado: `devdreico/Vexna-Shop`).
2. En Vercel: **Add New Project → Import** con framework *Next.js* (sin variables de entorno).
3. Al publicar, actualizá `SITE.url` en `data/config.ts` con el dominio final.

## Checklist antes de publicar

- [ ] Endpoint de Formspree de contacto configurado (opcional).
- [ ] Fotos reales en `public/products/` y `public/gallery/`.
- [ ] `SITE.url` y `SITE.email` actualizados.
- [ ] Pedido de prueba real en ambos formularios de Formspree.
- [ ] Revisar el Page Plugin de Facebook en el dominio público (en localhost puede no renderizar).
