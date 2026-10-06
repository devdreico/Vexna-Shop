export interface OrderSnapshot {
  nombre?: string;
  total?: string;
  metodo?: string;
  lines?: { name: string; qty: number; subtotal: number }[];
}

const KEY = "vexna:last-order";
let cached: OrderSnapshot | null | undefined;

export function writeOrder(order: OrderSnapshot) {
  cached = order;
  try {
    window.sessionStorage.setItem(KEY, JSON.stringify(order));
  } catch {
    /* almacenamiento no disponible */
  }
}

export function readOrder(): OrderSnapshot | null {
  if (typeof window === "undefined") return null;
  if (cached === undefined) {
    try {
      const raw = window.sessionStorage.getItem(KEY);
      cached = raw ? (JSON.parse(raw) as OrderSnapshot) : null;
    } catch {
      cached = null;
    }
  }
  return cached;
}

export const subscribeOrderNoop = () => () => {};
export const getServerOrder = (): OrderSnapshot | null => null;
