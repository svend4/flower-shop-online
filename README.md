# flower-shop-online

Прототип онлайн-магазина цветов **Flora** с доставкой по Саксонии.

## Описание проекта

Веб-приложение реализует витрину букетов и оформление заказа:
- фильтрация каталога по категориям (`all`, `roses`, `season`, `wedding`, `mini`) и просмотр карточки товара (`ProductDialog`);
- корзина и расчёт стоимости заказа (открытка `+5 €`, доставка `6 €` или бесплатно при сумме от `50 €`, доставка в день заказа при оформлении до `14:00`);
- оформление заказа на доставку с оплатой при получении (имя, телефон, адрес в Саксонии, дата доставки, текст открытки) и просмотр истории заказов.

Пользовательская часть магазина хранит корзину и историю заказов локально в браузере через `localStorage` (ключи `"flora-cart"` и `"flora-orders"`, максимум 20 заказов). В репозитории также присутствует инфраструктура шаблона (`server/`, `migrations/auth/`, `src/lib/db.ts`, `src/lib/auth/`), однако витрина и оформление заказа работают поверх `localStorage`.

## Структура проекта

- `src/routes/`:
  - `__root.tsx` — корневой макет (`APP_NAME = "Flora"`, `<PreviewHostBridge />`, `<AuthProvider>`);
  - `index.tsx` — страница каталога (`Shop`);
  - `checkout.tsx` — оформление заказа с сохранением через `saveOrder`;
  - `orders.tsx` — история заказов через `loadOrders`.
- `src/data/bouquets.ts` — каталог из 6 букетов (`garden-roses`, `white-tulips`, `romantic`, `spring`, `peonies`, `mini`), категории и константы расчёта (`CARD_FEE = 5`, `FREE_DELIVERY_FROM = 50`, `DELIVERY_FEE = 6`).
- `src/components/flora/` — компоненты интерфейса: `shop.tsx` (`ProductDialog`, секции `#studio`, `#delivery`), `header.tsx` (`SiteHeader`), `cart-drawer.tsx` (`CartDrawer`).
- `src/store/cart.ts` — Zustand-хранилище корзины (`localStorage`).
- `src/lib/orders.ts` — работа с историей заказов в `localStorage`.
- `src/lib/money.ts` — функции форматирования и расчёта `euro()` и `quote()`.
- `public/flowers/` — изображения букетов (`hero.jpg`, `mini.jpg`, `peony.jpg`, `romantic.jpg`, `roses.jpg`, `spring.jpg`, `tulips.jpg`), а также `public/favicon.svg`, `public/og.jpg`, `public/__grok/`.
- Шаблонная инфраструктура: `AGENTS.md`, `AGENTS.project.md`, `startup.sh`, `vercel.json`, `server/`, `migrations/auth/`, `src/lib/db.ts`, `src/lib/auth/`, `scripts/`, `artifacts/`.

## Технологический стек и команды

Согласно `package.json` и `AGENTS.md`, используются:
- **Фронтенд и сборка:** React 19, TypeScript 5.7, Vite 8.2, TanStack Start / Router / Query / Table, Nitro, Tailwind CSS v4, Radix UI, `lucide-react`, Zustand 5, Zod 4.
- **Шаблонные серверные/БД-зависимости:** `@electric-sql/pglite`, `pg`, `kysely`, `better-auth`.

Основные сценарии из `package.json`:

```bash
npm run dev              # запуск Vite dev-сервера (0.0.0.0:8080) через scripts/with-app-env.mjs
npm run build            # сборка (vite build && npm run db:migrate)
npm run db:migrate       # миграции БД
npm run build:dev        # сборка dev-конфигурации
npm run preview          # предпросмотр собранного приложения
npm run preview:restart  # перезапуск preview
npm run preview:stop     # остановка preview
npm run typecheck        # проверка типов (tsc --noEmit)
npm run check:auth       # проверка аутентификации из шаблона
npm run test             # запуск тестов
npm run lint             # проверка линтером (eslint .)
npm run format           # форматирование (prettier --write .)
```

## Ветки репозитория

Ветка по умолчанию — `main` (защищённая). Дополнительные ветки и Pull Request в репозитории отсутствуют.

## Лицензия

Файл `LICENSE` в репозитории отсутствует.
