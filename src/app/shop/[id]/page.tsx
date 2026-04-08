import { products } from "@/data/products";
import ProductContent from "./ProductContent";

export function generateStaticParams() {
  return products.map((product) => ({
    id: product.id,
  }));
}

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  return <ProductContent params={params} />;
}
