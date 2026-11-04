import { Link } from "@tanstack/react-router";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/store/cart";

export function SiteHeader({ homeAnchors = false }: { homeAnchors?: boolean }) {
  const lines = useCart((s) => s.lines);
  const setOpen = useCart((s) => s.setOpen);
  const count = lines.reduce((n, l) => n + l.qty, 0);
  const catalog = homeAnchors ? "#catalog" : "/#catalog";
  const studio = homeAnchors ? "#studio" : "/#studio";
  const delivery = homeAnchors ? "#delivery" : "/#delivery";

  return (
    <header className="sticky top-0 z-30 border-b border-line bg-paper/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Link to="/" className="font-display text-2xl tracking-tight">
          Flora
        </Link>
        <nav className="hidden items-center gap-8 text-sm text-stone md:flex">
          <a href={catalog} className="hover:text-ink">
            Каталог
          </a>
          <a href={studio} className="hover:text-ink">
            Ателье
          </a>
          <a href={delivery} className="hover:text-ink">
            Доставка
          </a>
          <Link to="/orders" className="hover:text-ink">
            Заказы
          </Link>
        </nav>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="inline-flex h-11 items-center gap-2 rounded-full bg-ink px-4 text-sm text-paper"
        >
          <ShoppingBag size={16} strokeWidth={1.75} />
          Корзина
          <span className="tabular-nums">{count}</span>
        </button>
      </div>
    </header>
  );
}
