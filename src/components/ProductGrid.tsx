"use client";

import { Product } from "@/data/products";
import ProductCard from "./ProductCard";
import styles from "./ProductGrid.module.css";

interface ProductGridProps {
  products: Product[];
  title?: string;
  showAllLink?: string;
}

export default function ProductGrid({ products, title, showAllLink }: ProductGridProps) {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        {title && <h2 className={styles.title}>{title}</h2>}
      </div>
      <div className={styles.grid}>
        {products.map((product, index) => (
          <ProductCard key={product.id} product={product} index={index} />
        ))}
      </div>
    </section>
  );
}
