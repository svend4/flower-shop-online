import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { findBouquet } from "@/data/bouquets";
import { SiteHeader } from "@/components/flora/header";
import { CartDrawer } from "@/components/flora/cart-drawer";
import { euro } from "@/lib/money";
import { loadOrders, type SavedOrder } from "@/lib/orders";

export const Route = createFileRoute("/orders")({ component: OrdersPage });

function OrdersPage() {
  const [orders, setOrders] = useState<SavedOrder[]>([]);
  useEffect(() => {
    setOrders(loadOrders());
  }, []);

  return (
    <div className="min-h-screen bg-paper text-ink">
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-5 py-10">
        <h1 className="font-display text-4xl tracking-tight">Заказы</h1>
        <p className="mt-2 text-sm text-stone">Список хранится в этом браузере. Это учёт для демо, не касса магазина.</p>
        {orders.length === 0 ? (
          <p className="mt-8 text-sm text-stone">
            Пока пусто. <Link to="/" className="text-ink underline">В каталог</Link>
          </p>
        ) : (
          <ul className="mt-8 space-y-4">
            {orders.map((o) => (
              <li key={o.id} className="rounded-card bg-card p-5 ring-1 ring-line">
                <div className="flex items-baseline justify-between gap-3">
                  <h2 className="font-display text-2xl">{o.id}</h2>
                  <span className="text-sm">{euro(o.total)}</span>
                </div>
                <p className="mt-2 text-sm text-stone">
                  {o.date} · {o.name} · {o.address}
                </p>
                <p className="mt-1 text-sm">Оплата при получении · {o.phone}</p>
                <ul className="mt-3 text-sm">
                  {o.lines.map((l) => (
                    <li key={l.id}>
                      {findBouquet(l.id)?.name ?? l.id} × {l.qty}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        )}
      </main>
      <CartDrawer />
    </div>
  );
}
