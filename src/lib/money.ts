import { CARD_FEE, DELIVERY_FEE, FREE_DELIVERY_FROM, findBouquet } from "@/data/bouquets";
import type { CartLine } from "@/store/cart";

export function euro(n: number) {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(n);
}

export function quote(lines: CartLine[], card: boolean) {
  const goods = lines.reduce((sum, l) => sum + (findBouquet(l.id)?.price ?? 0) * l.qty, 0);
  const extras = card && goods > 0 ? CARD_FEE : 0;
  const subtotal = goods + extras;
  const delivery = subtotal === 0 ? 0 : subtotal >= FREE_DELIVERY_FROM ? 0 : DELIVERY_FEE;
  return { goods, extras, delivery, total: subtotal + delivery };
}
