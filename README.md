# VEXNA SHOP

E-commerce de accesorios para bicicleta — tienda oficial de la página **VEXNA BIKE** en Facebook.

- **Diseño:** negro, blanco, dorado y azul (dorado en acentos/títulos, azul en CTAs).
- **Moneda:** Colombia — COP (`$ 189.900`).
- **Pedidos contraentrega:** se indexan en Formspree `https://formspree.io/f/xjygkkyp`.
- **Pago directo Mercado Pago:** antes de redirigir al link de pago se piden los datos de envío y se indexan la compra en Formspree `https://formspree.io/f/xbgdllga`.
- **Carrito:** se paga **únicamente contraentrega**. El pago con Mercado Pago se hace desde la ficha de cada producto (link de pago de monto fijo).

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
data/products.ts    catálogo de 10 productos (precios, specs, mpLink)
data/gallery.ts     fotos de la galería
lib/                formato COP, tipos, clases de UI, snapshot del pedido
public/products/    imágenes de productos (SVG placeholder → reemplazar por fotos)
public/gallery/     imágenes de la galería (SVG placeholder → reemplazar por fotos)
public/logo.png     emblema VX (origen: assets/)
```

## Configuración

### 1. Formspree (ya conectado)

| Uso | Endpoint |
| --- | --- |
| Pedidos contraentrega (carrito → `/checkout`) | `https://formspree.io/f/xjygkkyp` |
| Compra con Mercado Pago (ficha de producto) | `https://formspree.io/f/xbgdllga` |
| Formulario de contacto (opcional) | `https://formspree.io/f/TU_FORM_ID` |

Los endpoints viven en `data/config.ts`. El formulario de contacto muestra un aviso hasta que
coloques su endpoint real.

### 2. Links de pago de Mercado Pago

1. En la app o el panel de Mercado Pago: **Cobrar → Link de pago**.
2. Creá un link por producto con **el monto exacto** igual al precio de `data/products.ts`.
3. Copiá el link en el campo `mpLink` del producto:

```ts
{
  slug: "casco-urbano-vx-aero",
  price: 189900,
  mpLink: "https://www.mercadopago.com.co/checkout/...",
  ...
}
```

Si un producto no tiene `mpLink`, el botón de Mercado Pago informa que el pago online aún no está
disponible y el comprador puede usar contraentrega.

### 3. Datos del sitio (`data/config.ts`)

- `SITE.url`: dominio final (Vercel) → afecta sitemap, OpenGraph y metadata.
- `SITE.email`: tu email de contacto (si queda como `TU_EMAIL`, la web muestra el enlace a Facebook).
- `SITE.facebookUrl`: página de VEXNA BIKE (ya configurada).

### 4. Fotos

Reemplazá los SVG de `public/products/` y `public/gallery/` por fotos reales manteniendo los
mismos nombres (o actualizá `image` / `gallery` en `data/products.ts` y `src` en `data/gallery.ts`).

## Flujos de compra

| Canal | Recorrido | Registro |
| --- | --- | --- |
| Contraentrega (carrito) | Carrito → `/checkout` → datos de envío → confirmar | Formspree `xjygkkyp` + resumen en `/gracias` |
| Mercado Pago (ficha de producto) | Ficha → "Pagar con Mercado Pago" → datos de envío → redirige al link de pago | Formspree `xbgdllga` con producto, cantidad, total y link |

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
- [ ] `mpLink` cargado en los 10 productos con el monto exacto.
- [ ] Fotos reales en `public/products/` y `public/gallery/`.
- [ ] `SITE.url` y `SITE.email` actualizados.
- [ ] Pedido de prueba real en ambos formularios de Formspree.
- [ ] Revisar el Page Plugin de Facebook en el dominio público (en localhost puede no renderizar).
