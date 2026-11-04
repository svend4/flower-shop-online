import { Link } from "@tanstack/react-router";
import { Minus, Plus, X } from "lucide-react";
import { CARD_FEE, findBouquet } from "@/data/bouquets";
import { euro, quote } from "@/lib/money";
import { useCart } from "@/store/cart";

export function CartDrawer() {
  const open = useCart((s) => s.open);
  const setOpen = useCart((s) => s.setOpen);
  const lines = useCart((s) => s.lines);
  const setQty = useCart((s) => s.setQty);
  const note = useCart((s) => s.note);
  const setNote = useCart((s) => s.setNote);
  const card = useCart((s) => s.card);
  const setCard = useCart((s) => s.setCard);
  const q = quote(lines, card);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-ink/40" role="presentation" onClick={() => setOpen(false)}>
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Корзина"
        className="flex h-full w-full max-w-md flex-col bg-paper"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex h-16 items-center justify-between border-b border-line px-5">
          <h2 className="font-display text-2xl">Корзина</h2>
          <button type="button" aria-label="Закрыть" onClick={() => setOpen(false)} className="grid h-11 w-11 place-items-center rounded-full ring-1 ring-line">
            <X size={16} />
          </button>
        </div>
        <div className="flex flex-1 flex-col overflow-auto">
          {lines.length === 0 ? (
            <p className="px-5 py-8 text-sm text-stone">Пока пусто. Выберите букет в каталоге.</p>
          ) : (
            <ul className="divide-y divide-line">
              {lines.map((l) => {
                const b = findBouquet(l.id);
                if (!b) return null;
                return (
                  <li key={l.id} className="flex gap-3 px-5 py-4">
                    <img src={b.image} alt="" className="h-20 w-16 rounded-lg object-cover" />
                    <div className="flex flex-1 flex-col">
                      <div className="flex justify-between gap-2">
                        <p className="font-medium">{b.name}</p>
                        <p className="text-sm">{euro(b.price * l.qty)}</p>
                      </div>
                      <div className="mt-auto flex items-center gap-2">
                        <button type="button" aria-label="Меньше" onClick={() => setQty(l.id, l.qty - 1)} className="grid h-11 w-11 place-items-center rounded-full ring-1 ring-line">
                          <Minus size={14} />
                        </button>
                        <span className="w-6 text-center text-sm tabular-nums">{l.qty}</span>
                        <button type="button" aria-label="Больше" onClick={() => setQty(l.id, l.qty + 1)} className="grid h-11 w-11 place-items-center rounded-full ring-1 ring-line">
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
          <div className="mt-auto border-t border-line px-5 py-5">
            <label className="flex items-center gap-3 text-sm">
              <input type="checkbox" checked={card} onChange={(e) => setCard(e.target.checked)} className="h-4 w-4 accent-leaf" />
              Открытка, {euro(CARD_FEE)}
            </label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Текст открытки или пожелание флористу"
              rows={3}
              className="mt-3 w-full rounded-xl border border-line bg-card p-3 text-sm"
            />
            <div className="mt-4 flex justify-between text-sm text-stone">
              <span>Доставка</span>
              <span>{q.delivery === 0 ? "бесплатно" : euro(q.delivery)}</span>
            </div>
            <div className="mt-1 flex justify-between text-base">
              <span>Итого</span>
              <span>{euro(q.total)}</span>
            </div>
            <Link
              to="/checkout"
              onClick={() => setOpen(false)}
              aria-disabled={lines.length === 0}
              className={`mt-4 inline-flex h-12 w-full items-center justify-center rounded-full bg-leaf text-sm font-medium text-paper ${lines.length === 0 ? "pointer-events-none opacity-40" : ""}`}
            >
              Оформить
            </Link>
          </div>
        </div>
      </aside>
    </div>
  );
}
