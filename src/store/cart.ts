import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartLine = { id: string; qty: number };

type CartState = {
  lines: CartLine[];
  open: boolean;
  note: string;
  card: boolean;
  setOpen: (open: boolean) => void;
  add: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  setNote: (note: string) => void;
  setCard: (card: boolean) => void;
  clear: () => void;
};

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      lines: [],
      open: false,
      note: "",
      card: false,
      setOpen: (open) => set({ open }),
      add: (id) =>
        set((s) => {
          const found = s.lines.find((l) => l.id === id);
          const lines = found
            ? s.lines.map((l) => (l.id === id ? { ...l, qty: l.qty + 1 } : l))
            : [...s.lines, { id, qty: 1 }];
          return { lines, open: true };
        }),
      setQty: (id, qty) =>
        set((s) => ({
          lines:
            qty <= 0
              ? s.lines.filter((l) => l.id !== id)
              : s.lines.map((l) => (l.id === id ? { ...l, qty } : l)),
        })),
      setNote: (note) => set({ note }),
      setCard: (card) => set({ card }),
      clear: () => set({ lines: [], note: "", card: false, open: false }),
    }),
    {
      name: "flora-cart",
      partialize: (s) => ({ lines: s.lines, note: s.note, card: s.card }),
    },
  ),
);
