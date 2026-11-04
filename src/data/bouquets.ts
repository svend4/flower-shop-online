export type Occasion = "roses" | "season" | "wedding" | "mini";

export type Bouquet = {
  id: string;
  name: string;
  price: number;
  stems: string;
  note: string;
  occasions: Occasion[];
  image: string;
};

export const occasions: { id: "all" | Occasion; label: string }[] = [
  { id: "all", label: "Все" },
  { id: "roses", label: "Розы" },
  { id: "season", label: "Сезон" },
  { id: "wedding", label: "Свадьба" },
  { id: "mini", label: "Мини" },
];

export const bouquets: Bouquet[] = [
  {
    id: "garden-roses",
    name: "Садовые розы",
    price: 34,
    stems: "15 стеблей",
    note: "Плотные садовые розы глубокого красного, крафт и оливковая лента.",
    occasions: ["roses", "wedding"],
    image: "/flowers/roses.jpg",
  },
  {
    id: "white-tulips",
    name: "Белые тюльпаны",
    price: 26,
    stems: "20 стеблей",
    note: "Светлые тюльпаны на длинной ножке. Хороши как утренний жест без повода.",
    occasions: ["season"],
    image: "/flowers/tulips.jpg",
  },
  {
    id: "romantic",
    name: "Романтик",
    price: 42,
    stems: "смешанный",
    note: "Пионы, ранункулюсы и эвкалипт. Мягкий, не кричащий букет.",
    occasions: ["wedding", "season"],
    image: "/flowers/romantic.jpg",
  },
  {
    id: "spring",
    name: "Весна",
    price: 36,
    stems: "сезонный сбор",
    note: "Сирень, анемоны и морозник. Живёт в вазе около пяти дней.",
    occasions: ["season"],
    image: "/flowers/spring.jpg",
  },
  {
    id: "peonies",
    name: "Пионы",
    price: 48,
    stems: "9 головок",
    note: "Пыльные розовые пионы в оливковой бумаге. На стол или на церемонию.",
    occasions: ["wedding", "season"],
    image: "/flowers/peony.jpg",
  },
  {
    id: "mini",
    name: "Мини-поза",
    price: 19,
    stems: "7 стеблей",
    note: "Абрикосовые спрей-розы в керамической чашке. На стол коллеге или себе.",
    occasions: ["mini", "roses"],
    image: "/flowers/mini.jpg",
  },
];

export function findBouquet(id: string) {
  return bouquets.find((b) => b.id === id);
}

export const CARD_FEE = 5;
export const FREE_DELIVERY_FROM = 50;
export const DELIVERY_FEE = 6;
