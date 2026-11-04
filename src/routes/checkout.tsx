import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { CARD_FEE, findBouquet } from "@/data/bouquets";
import { SiteHeader } from "@/components/flora/header";
import { CartDrawer } from "@/components/flora/cart-drawer";
import { euro, quote } from "@/lib/money";
import { saveOrder, type SavedOrder } from "@/lib/orders";
import { useCart } from "@/store/cart";

export const Route = createFileRoute("/checkout")({ component: CheckoutPage });

function CheckoutPage() {
  const lines = useCart((s) => s.lines);
  const note = useCart((s) => s.note);
  const setNote = useCart((s) => s.setNote);
  const card = useCart((s) => s.card);
  const setCard = useCart((s) => s.setCard);
  const clear = useCart((s) => s.clear);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [date, setDate] = useState("");
  const [error, setError] = useState("");
  const [placed, setPlaced] = useState<SavedOrder | null>(null);
  const q = quote(lines, card);

  function submit(e: FormEvent) {
    e.preventDefault();
    if (lines.length === 0) return;
    if (!name.trim() || !phone.trim() || !address.trim() || !date) {
      setError("Заполните имя, телефон, адрес и дату.");
      return;
    }
    const order: SavedOrder = {
      id: `F-${Date.now().toString().slice(-6)}`,
      name: name.trim(),
      phone: phone.trim(),
      address: address.trim(),
      date,
      note,
      card,
      lines,
      total: q.total,
      pay: "delivery",
      createdAt: new Date().toISOString(),
    };
    saveOrder(order);
    setPlaced(order);
    clear();
  }

  return (
    <div className="min-h-screen bg-paper text-ink">
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-5 py-10">
        {placed ? (
          <section className="max-w-xl">
            <p className="text-xs tracking-widest text-leaf uppercase">Заказ принят</p>
            <h1 className="mt-3 font-display text-5xl tracking-tight">Спасибо.</h1>
            <p className="mt-4 text-stone">
              Номер <span className="text-ink">{placed.id}</span>. Оплата при получении, {euro(placed.total)}. Перезвоним, чтобы подтвердить состав.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/orders" className="inline-flex h-12 items-center rounded-full bg-ink px-6 text-sm text-paper">
                К списку заказов
              </Link>
              <Link to="/" className="inline-flex h-12 items-center rounded-full px-6 text-sm ring-1 ring-line">
                В каталог
              </Link>
            </div>
          </section>
        ) : lines.length === 0 ? (
          <section className="max-w-xl">
            <h1 className="font-display text-4xl tracking-tight">Корзина пуста</h1>
            <Link to="/" className="mt-6 inline-flex h-12 items-center rounded-full bg-leaf px-6 text-sm text-paper">
              Выбрать букет
            </Link>
          </section>
        ) : (
          <div className="grid gap-10 md:grid-cols-5">
            <form onSubmit={submit} className="md:col-span-3">
              <h1 className="font-display text-4xl tracking-tight">Оформление</h1>
              <p className="mt-2 text-sm text-stone">Оплата при получении. Карту подключим отдельно — сейчас заказ только фиксируется у вас в браузере.</p>
              <label className="mt-6 block text-sm">
                Имя
                <input required value={name} onChange={(e) => setName(e.target.value)} className="mt-1 h-11 w-full rounded-xl border border-line bg-card px-3" />
              </label>
              <label className="mt-4 block text-sm">
                Телефон
                <input required type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className="mt-1 h-11 w-full rounded-xl border border-line bg-card px-3" />
              </label>
              <label className="mt-4 block text-sm">
                Адрес в Саксонии
                <input required value={address} onChange={(e) => setAddress(e.target.value)} className="mt-1 h-11 w-full rounded-xl border border-line bg-card px-3" />
              </label>
              <label className="mt-4 block text-sm">
                Дата доставки
                <input required type="date" value={date} onChange={(e) => setDate(e.target.value)} className="mt-1 h-11 w-full rounded-xl border border-line bg-card px-3" />
              </label>
              <label className="mt-4 flex items-center gap-3 text-sm">
                <input type="checkbox" checked={card} onChange={(e) => setCard(e.target.checked)} className="h-4 w-4 accent-leaf" />
                Открытка, {euro(CARD_FEE)}
              </label>
              <label className="mt-4 block text-sm">
                Текст открытки
                <textarea value={note} onChange={(e) => setNote(e.target.value)} rows={3} className="mt-1 w-full rounded-xl border border-line bg-card p-3" />
              </label>
              {error ? <p className="mt-3 text-sm text-blush">{error}</p> : null}
              <button type="submit" className="mt-6 inline-flex h-12 items-center rounded-full bg-leaf px-6 text-sm font-medium text-paper">
                Подтвердить заказ
              </button>
            </form>
            <aside className="h-fit rounded-card bg-card p-5 ring-1 ring-line md:col-span-2">
              <h2 className="font-display text-2xl">Состав</h2>
              <ul className="mt-4 space-y-3">
                {lines.map((l) => {
                  const b = findBouquet(l.id);
                  if (!b) return null;
                  return (
                    <li key={l.id} className="flex justify-between gap-3 text-sm">
                      <span>
                        {b.name} × {l.qty}
                      </span>
                      <span>{euro(b.price * l.qty)}</span>
                    </li>
                  );
                })}
              </ul>
              <div className="mt-4 flex justify-between text-sm text-stone">
                <span>Доставка</span>
                <span>{q.delivery === 0 ? "бесплатно" : euro(q.delivery)}</span>
              </div>
              <div className="mt-1 flex justify-between">
                <span>Итого</span>
                <span>{euro(q.total)}</span>
              </div>
            </aside>
          </div>
        )}
      </main>
      <CartDrawer />
    </div>
  );
}
