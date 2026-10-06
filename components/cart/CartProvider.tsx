"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { PRODUCTS } from "@/data/products";
import type { CartLine } from "@/lib/types";

const STORAGE_KEY = "vexna:cart";
const MAX_QTY = 99;
const EMPTY: StoredItem[] = [];

interface StoredItem {
  slug: string;
  qty: number;
}

interface CartContextValue {
  lines: CartLine[];
  count: number;
  subtotal: number;
  add: (slug: string, qty?: number) => void;
  setQty: (slug: string, qty: number) => void;
  remove: (slug: string) => void;
  clear: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

let cache: StoredItem[] = EMPTY;
let initialized = false;
const listeners = new Set<() => void>();

function readStored(): StoredItem[] {
  if (typeof window === "undefined") return EMPTY;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY;
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return EMPTY;
    const next = parsed
      .filter((i): i is StoredItem => !!i && typeof i.slug === "string")
      .map((i) => ({
        slug: i.slug,
        qty: Math.min(MAX_QTY, Math.max(1, Number(i.qty) || 1)),
      }))
      .filter((i) => PRODUCTS.some((p) => p.slug === i.slug));
    return next;
  } catch {
    return EMPTY;
  }
}

function getSnapshot(): StoredItem[] {
  if (!initialized) {
    cache = readStored();
    initialized = true;
  }
  return cache;
}

function getServerSnapshot(): StoredItem[] {
  return EMPTY;
}

function subscribe(onStoreChange: () => void): () => void {
  listeners.add(onStoreChange);
  const onStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY || e.key === null) {
      cache = readStored();
      listeners.forEach((l) => l());
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(onStoreChange);
    window.removeEventListener("storage", onStorage);
  };
}

function commit(next: StoredItem[]) {
  cache = next;
  initialized = true;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    /* almacenamiento no disponible */
  }
  listeners.forEach((l) => l());
}

export function CartProvider({ children }: { children: ReactNode }) {
  const items = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const add = useCallback((slug: string, qty = 1) => {
    const current = getSnapshot();
    const found = current.find((i) => i.slug === slug);
    if (found) {
      commit(
        current.map((i) =>
          i.slug === slug ? { ...i, qty: Math.min(MAX_QTY, i.qty + qty) } : i,
        ),
      );
      return;
    }
    commit([...current, { slug, qty: Math.min(MAX_QTY, Math.max(1, qty)) }]);
  }, []);

  const setQty = useCallback((slug: string, qty: number) => {
    const current = getSnapshot();
    commit(
      qty <= 0
        ? current.filter((i) => i.slug !== slug)
        : current.map((i) => (i.slug === slug ? { ...i, qty: Math.min(MAX_QTY, qty) } : i)),
    );
  }, []);

  const remove = useCallback((slug: string) => {
    commit(getSnapshot().filter((i) => i.slug !== slug));
  }, []);

  const clear = useCallback(() => commit(EMPTY), []);

  const value = useMemo<CartContextValue>(() => {
    const lines = items
      .map((i) => {
        const product = PRODUCTS.find((p) => p.slug === i.slug);
        if (!product) return null;
        return { product, qty: i.qty, subtotal: product.price * i.qty };
      })
      .filter((l): l is CartLine => l !== null);

    return {
      lines,
      count: lines.reduce((n, l) => n + l.qty, 0),
      subtotal: lines.reduce((n, l) => n + l.subtotal, 0),
      add,
      setQty,
      remove,
      clear,
    };
  }, [items, add, setQty, remove, clear]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart debe usarse dentro de CartProvider");
  return ctx;
}
