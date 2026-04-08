import HeroCarousel from "@/components/HeroCarousel";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Categories from "@/components/Categories";
import ProductGrid from "@/components/ProductGrid";
import Banner from "@/components/Banner";
import Testimonials from "@/components/Testimonials";
import Newsletter from "@/components/Newsletter";
import { query } from "@/lib/db";
import { Product } from "@/data/products";

export default async function Home() {
  const featuredProducts = await query<Product>(
    "SELECT * FROM products WHERE is_featured = true LIMIT 4"
  );
  
  const fitness = await query<Product>(
    "SELECT * FROM products WHERE category = $1 LIMIT 4",
    ["Vestuário"]
  );

  return (
    <>
      <HeroCarousel />
      <Hero />
      <Features />
      <Categories />
      
      <div className="container">
        <ProductGrid products={featuredProducts} title="Destaques da Semana" />
      </div>

      <Banner
        subtitle="Conforto"
        title="Tecidos de Primeira Qualidade"
        description="Selecionamos os melhores tecidos e materiais. Cada peça é desenvolvida com rigor para garantir conforto, durabilidade e muito estilo."
        ctaText="Conhecer Nossa História"
        ctaLink="/sobre"
        image="/banner/Fios de qualidade.png"
      />

      <div className="container">
        <ProductGrid products={fitness} title="Moda Fitness" />
      </div>

      <Testimonials />

      <Banner
        subtitle="Presentes"
        title="Presenteie com Estilo"
        description="Surpreenda quem você ama com peças exclusivas. Perfeito para datas especiais ou simplesmente porque sim."
        ctaText="Ver Coleção de Presentes"
        ctaLink="/shop"
        image="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800&q=80"
        reverse
      />

      <Newsletter />
    </>
  );
}
