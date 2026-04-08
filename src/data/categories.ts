export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  image: string;
  icon: string;
}

export const categories: Category[] = [
  {
    id: 1,
    name: "Moda Fitness",
    slug: "Moda Fitness",
    description: "Roupas confortáveis para seu treino",
    image: "/banner/Vestuário.png",
    icon: "🏃"
  },
  {
    id: 2,
    name: "T-Shirts & Malhas",
    slug: "T-Shirts",
    description: "100% algodão, cores variadas",
    image: "/banner/Acessários1.png",
    icon: "👕"
  },
  {
    id: 3,
    name: "Uniforme Escolar",
    slug: "Uniforme Escolar",
    description: "Conjuntos para escolas",
    image: "/banner/Decoração.png",
    icon: "🎒"
  },
  {
    id: 4,
    name: "Moletons",
    slug: "Moletons",
    description: "Conforto quentinho",
    image: "/banner/Vestuário.png",
    icon: "🧥"
  },
  {
    id: 5,
    name: "Acessórios",
    slug: "Acessórios",
    description: "Complementos para seu look",
    image: "/banner/Acessários1.png",
    icon: "👜"
  },
  {
    id: 6,
    name: "Couro",
    slug: "Couro",
    description: "Bolsa, carteiras e mais",
    image: "/banner/Decoração.png",
    icon: "🐄"
  }
];
