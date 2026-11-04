import type { CartLine } from "@/store/cart";

export type SavedOrder = {
  id: string;
  name: string;
  phone: string;
  address: string;
  date: string;
  note: string;
  card: boolean;
  lines: CartLine[];
  total: number;
  pay: "delivery";
  createdAt: string;
};

const KEY = "flora-orders";

export function loadOrders(): SavedOrder[] {
  if (typeof localStorage === "undefined") return [];
  try {
    const raw = JSON.parse(localStorage.getItem(KEY) || "[]") as unknown;
    return Array.isArray(raw) ? (raw as SavedOrder[]) : [];
  } catch {
    return [];
  }
}

export function saveOrder(order: SavedOrder) {
  localStorage.setItem(KEY, JSON.stringify([order, ...loadOrders()].slice(0, 20)));
}
