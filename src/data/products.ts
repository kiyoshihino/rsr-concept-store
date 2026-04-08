export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
  materials?: string;
  care?: string;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Cardigan Oversized",
    price: 289.90,
    category: "Vestuário",
    image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800&q=80",
    description: "Cardigan oversized feito em tricô manual com fio de lã merino. Perfeito para os dias mais frios, combinando conforto e elegância em uma peça única.",
    materials: "100% Lã Merinos",
    care: "Lavagem à mão ou ciclo delicado"
  },
  {
    id: "2",
    name: "Bolsa Croché",
    price: 159.90,
    category: "Acessórios",
    image: "/banner/Bolsa croche.png",
    description: "Bolsa artesanal em croché. Ideal para complementar looks casuais com um toque de sofisticação.",
    materials: "Fio de algodão",
    care: "Limpeza úmida"
  },
  {
    id: "3",
    name: "Manta Peluda Cloud",
    price: 219.90,
    category: "Decoração",
    image: "/banner/Manta Peluda Cloud.png",
    description: "Manta super macia em ponto cloud. O acompanhamento perfeito para seus momentos de relaxamento.",
    materials: "Poliéstersoft premium",
    care: "Lavagem à máquina fria"
  },
  {
    id: "13",
    name: "Almofada de Croché",
    price: 129.90,
    category: "Decoração",
    image: "/banner/Almofada Croche.png",
    description: "Almofada artesanal em croché com textura única. Perfeita para adicionar charme e conforto à sua decoração.",
    materials: "Fio de algodão",
    care: "Limpeza manual"
  },
  {
    id: "5",
    name: "Vestido Midi Croisé",
    price: 349.90,
    category: "Vestuário",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=80",
    description: "Vestido midi elegante em ponto croisé. Silhueta fluida que valoriza o corpo com delicadeza.",
    materials: "Lã + Viscosa",
    care: "Lavagem a seco"
  },
  {
    id: "6",
    name: "Cestos Organizadores de Croché",
    price: 149.90,
    category: "Decoração",
    image: "/banner/cestos organizadores de crochê.png",
    description: "Conjunto de cestos organizadores em croché. Perfeitos para organizar sua casa com estilo e charme.",
    materials: "Fio de algodão",
    care: "Limpeza manual"
  },
  {
    id: "7",
    name: "Cachecol Infinity",
    price: 129.90,
    category: "Acessórios",
    image: "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=800&q=80",
    description: "Cachecol infinity em tricô infinito. O estilo que aquece sem complicar.",
    materials: "Lã merino",
    care: "Lavagem à mão"
  },
  {
    id: "8",
    name: "Suéter Cozy",
    price: 269.90,
    category: "Vestuário",
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=80",
    description: "Suéter relaxed fit em ponto moss. Conforto extremo para o dia a dia.",
    materials: "Lã acrylica",
    care: "Lavagem delicada"
  },
  {
    id: "9",
    name: "Tapete Redondo",
    price: 249.90,
    category: "Decoração",
    image: "https://images.unsplash.com/photo-1531835551805-16d864c8d311?w=800&q=80",
    description: "Tapete artesanalredondo em croché. Elemento decorativo que transforma qualquer ambiente.",
    materials: "Fio de juta + Algodão",
    care: "Aspirar regularmente"
  },
  {
    id: "10",
    name: "Luvas Tricô",
    price: 79.90,
    category: "Acessórios",
    image: "https://images.unsplash.com/photo-1606103836293-0a063ee20566?w=800&q=80",
    description: "Luvas com dedos em tricô estruturado. Proteção completa com estilo.",
    materials: "Lã merino",
    care: "Lavagem à mão"
  },
  {
    id: "11",
    name: "Kit Amigurumi",
    price: 99.90,
    category: "Kits",
    image: "https://images.unsplash.com/photo-1606092195730-5d7b9af1ef4d?w=800&q=80",
    description: "Kit completo para crochê de amigurumis. Incluye fios, agulhas e padrões.",
    materials: "Fio acrylico + Agulhas",
    care: "ikuti instruções"
  },
  {
    id: "12",
    name: "Bolo姨姨姨姨",
    price: 159.90,
    category: "Kits",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    description: "Kit para fazer yourself em casa. Perfeito para iniciantes no mundo do tricô.",
    materials: "Fio lã + Agulhas",
    care: "Sigue as instruções"
  }
];

export const categories = [
  { id: "all", name: "Todos", slug: "all" },
  { id: "vestuario", name: "Vestuário", slug: "Vestuário" },
  { id: "acessorios", name: "Acessórios", slug: "Acessórios" },
  { id: "decoracao", name: "Decoração", slug: "Decoração" },
  { id: "kits", name: "Kits", slug: "Kits" }
];
