export type CategorySlug =
  | "seguridad"
  | "iluminacion"
  | "accesorios"
  | "ropa"
  | "herramientas";

export interface ProductSpec {
  label: string;
  value: string;
}

export interface Product {
  slug: string;
  name: string;
  category: CategorySlug;
  price: number;
  image: string;
  gallery: string[];
  short: string;
  description: string;
  specs: ProductSpec[];
  badge?: string;
  featured?: boolean;
  mpLink?: string;
  stock?: boolean;
}

export interface CartLine {
  product: Product;
  qty: number;
  subtotal: number;
}

export type GalleryCategory =
  | "bicicletas"
  | "eventos"
  | "clientes"
  | "taller";

export interface GalleryItem {
  src: string;
  title: string;
  category: GalleryCategory;
}
