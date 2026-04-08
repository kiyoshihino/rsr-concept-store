"use client";

import Image from "next/image";
import Link from "next/link";
import { Product } from "@/data/products";
import styles from "./ProductCard.module.css";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  return (
    <Link 
      href={`/shop/${product.id}`} 
      className={styles.card}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className={styles.imageWrapper}>
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, 25vw"
          className={styles.image}
        />
        <span className={styles.badge}>{product.category}</span>
      </div>
      <div className={styles.content}>
        <h3 className={styles.name}>{product.name}</h3>
        <p className={styles.price}>
          R$ {product.price.toFixed(2).replace(".", ",")}
        </p>
      </div>
    </Link>
  );
}
