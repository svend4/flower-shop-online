import { useMemo, useState, type ReactNode } from "react";
import { Clock, Leaf, MapPin, Plus, X } from "lucide-react";
import {
  bouquets,
  occasions,
  type Bouquet,
  type Occasion,
} from "@/data/bouquets";
import { CartDrawer } from "@/components/flora/cart-drawer";
import { SiteHeader } from "@/components/flora/header";
import { euro } from "@/lib/money";
import { useCart } from "@/store/cart";

export function Shop() {
  const [filter, setFilter] = useState<"all" | Occasion>("all");
  const [active, setActive] = useState<Bouquet | null>(null);
  const add = useCart((s) => s.add);

  const visible = useMemo(
    () => (filter === "all" ? bouquets : bouquets.filter((b) => b.occasions.includes(filter))),
    [filter],
  );

  return (
    <div className="min-h-screen bg-paper text-ink">
      <SiteHeader homeAnchors />

      <main id="top">
        <section className="mx-auto grid max-w-6xl items-center gap-8 px-5 py-10 md:grid-cols-2 md:py-16">
          <div>
            <p className="text-xs font-medium tracking-widest text-leaf uppercase">
              Саксония · доставка в тот же день
            </p>
            <h1 className="mt-3 font-display text-5xl leading-none tracking-tight md:text-6xl">
              Букеты, которые не кричат
            </h1>
            <p className="mt-5 max-w-md text-base text-stone">
              Собираем утром из сезонных цветов. Заказ до 14:00 привозим сегодня по Саксонии.
            </p>
            <a
              href="#catalog"
              className="mt-8 inline-flex h-12 items-center rounded-full bg-leaf px-6 text-sm font-medium text-paper"
            >
              Выбрать букет
            </a>
          </div>
          <div className="overflow-hidden rounded-card">
            <img
              src="/flowers/hero.jpg"
              alt="Стол флориста: розы, бумага и готовый букет"
              className="aspect-video w-full object-cover md:aspect-4/3"
            />
          </div>
        </section>

        <section id="catalog" className="mx-auto max-w-6xl px-5 pb-16">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="font-display text-3xl tracking-tight">Каталог</h2>
            <div className="flex flex-wrap gap-2">
              {occasions.map((o) => {
                const on = filter === o.id;
                return (
                  <button
                    key={o.id}
                    type="button"
                    onClick={() => setFilter(o.id)}
                    className={`h-10 rounded-full px-4 text-sm ${
                      on ? "bg-ink text-paper" : "bg-card text-ink ring-1 ring-line"
                    }`}
                  >
                    {o.label}
                  </button>
                );
              })}
            </div>
          </div>
          <ul className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
            {visible.map((b) => (
              <li key={b.id}>
                <article className="flex h-full flex-col overflow-hidden rounded-card bg-card ring-1 ring-line">
                  <button type="button" onClick={() => setActive(b)} className="text-left">
                    <img src={b.image} alt={b.name} className="aspect-3/4 w-full object-cover" />
                  </button>
                  <div className="flex flex-1 flex-col p-4">
                    <button type="button" onClick={() => setActive(b)} className="text-left">
                      <h3 className="font-display text-xl leading-tight">{b.name}</h3>
                      <p className="mt-1 text-sm text-stone">{b.stems}</p>
                    </button>
                    <div className="mt-4 flex flex-col gap-3">
                      <span className="text-sm font-medium">{euro(b.price)}</span>
                      <button
                        type="button"
                        onClick={() => add(b.id)}
                        className="inline-flex h-11 items-center justify-center gap-1 rounded-full bg-paper px-3 text-sm ring-1 ring-line"
                      >
                        <Plus size={14} />
                        В корзину
                      </button>
                    </div>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </section>

        <section id="studio" className="border-y border-line bg-card">
          <div className="mx-auto grid max-w-6xl gap-8 px-5 py-14 md:grid-cols-3">
            <div className="md:col-span-1">
              <h2 className="font-display text-3xl tracking-tight">Ателье</h2>
              <p className="mt-3 text-sm text-stone">
                Небольшая студия в Саксонии. Без пластиковой плёнки и без готовых витринных композиций
                «на все случаи».
              </p>
            </div>
            <ul className="grid gap-6 md:col-span-2 md:grid-cols-3">
              <Fact icon={<Clock size={18} />} title="До 14:00" text="Тот же день по Саксонии. После — на следующее утро." />
              <Fact icon={<MapPin size={18} />} title="От 50 €" text="Доставка бесплатно. Ниже порога — 6 €." />
              <Fact icon={<Leaf size={18} />} title="Сезон" text="Состав меняется по неделе. На карточке — то, что собираем сейчас." />
            </ul>
          </div>
        </section>

        <section id="delivery" className="mx-auto max-w-6xl px-5 py-14">
          <h2 className="font-display text-3xl tracking-tight">Как заказать</h2>
          <ol className="mt-6 grid gap-4 md:grid-cols-3">
            {[
              ["01", "Выберите букет", "Можно несколько. Открытка — по желанию, +5 €."],
              ["02", "Адрес и время", "Имя, телефон, улица и день доставки."],
              ["03", "Подтверждение", "Мы перезвоним и уточним, если цветок закончился."],
            ].map(([n, t, d]) => (
              <li key={n} className="rounded-card bg-card p-5 ring-1 ring-line">
                <p className="text-xs tracking-widest text-blush">{n}</p>
                <h3 className="mt-2 font-display text-xl">{t}</h3>
                <p className="mt-2 text-sm text-stone">{d}</p>
              </li>
            ))}
          </ol>
        </section>
      </main>

      <footer className="border-t border-line px-5 py-8 text-center text-sm text-stone">
        Flora · Саксония · букеты с доставкой
      </footer>

      {active ? (
        <ProductDialog bouquet={active} onClose={() => setActive(null)} onAdd={() => add(active.id)} />
      ) : null}
      <CartDrawer />
    </div>
  );
}

function Fact({ icon, title, text }: { icon: ReactNode; title: string; text: string }) {
  return (
    <li>
      <div className="text-leaf">{icon}</div>
      <h3 className="mt-3 font-display text-xl">{title}</h3>
      <p className="mt-2 text-sm text-stone">{text}</p>
    </li>
  );
}

function ProductDialog({
  bouquet,
  onClose,
  onAdd,
}: {
  bouquet: Bouquet;
  onClose: () => void;
  onAdd: () => void;
}) {
  return (
    <div className="fixed inset-0 z-40 flex items-end justify-center bg-ink/40 p-0 sm:items-center sm:p-6" role="presentation" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="bouquet-title"
        className="grid max-h-[92vh] w-full max-w-3xl overflow-auto bg-paper sm:grid-cols-2 sm:rounded-card"
        onClick={(e) => e.stopPropagation()}
      >
        <img src={bouquet.image} alt="" className="aspect-3/4 w-full object-cover sm:aspect-auto sm:h-full" />
        <div className="flex flex-col p-6">
          <div className="flex items-start justify-between gap-4">
            <h2 id="bouquet-title" className="font-display text-3xl tracking-tight">
              {bouquet.name}
            </h2>
            <button type="button" onClick={onClose} aria-label="Закрыть" className="grid h-11 w-11 place-items-center rounded-full ring-1 ring-line">
              <X size={16} />
            </button>
          </div>
          <p className="mt-2 text-sm text-stone">{bouquet.stems}</p>
          <p className="mt-4 text-base">{bouquet.note}</p>
          <p className="mt-6 font-display text-2xl">{euro(bouquet.price)}</p>
          <button
            type="button"
            onClick={() => {
              onAdd();
              onClose();
            }}
            className="mt-6 inline-flex h-12 items-center justify-center rounded-full bg-leaf text-sm font-medium text-paper"
          >
            Добавить в корзину
          </button>
        </div>
      </div>
    </div>
  );
}

