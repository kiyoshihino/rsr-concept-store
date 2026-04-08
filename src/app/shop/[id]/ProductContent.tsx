"use client";

import { use } from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { products } from "@/data/products";
import { useCart } from "@/context/CartContext";
import styles from "./product.module.css";

interface ProductContentProps {
  params: Promise<{ id: string }>;
}

export default function ProductContent({ params }: ProductContentProps) {
  const { id } = use(params);
  const { addToCart } = useCart();
  
  const product = products.find((p) => p.id === id);

  if (!product) {
    notFound();
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.imageSection}>
          <div className={styles.imageWrapper}>
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className={styles.image}
              priority
            />
          </div>
        </div>

        <div className={styles.details}>
          <span className={styles.category}>{product.category}</span>
          <h1 className={styles.name}>{product.name}</h1>
          <p className={styles.price}>
            R$ {product.price.toFixed(2).replace(".", ",")}
          </p>
          
          <p className={styles.description}>{product.description}</p>

          {product.materials && (
            <div className={styles.info}>
              <h3 className={styles.infoTitle}>Materiais</h3>
              <p className={styles.infoText}>{product.materials}</p>
            </div>
          )}

          {product.care && (
            <div className={styles.info}>
              <h3 className={styles.infoTitle}>Cuidados</h3>
              <p className={styles.infoText}>{product.care}</p>
            </div>
          )}

          <button
            className={styles.addButton}
            onClick={() => addToCart(product)}
          >
            Adicionar ao Carrinho
          </button>
        </div>
      </div>
    </div>
  );
}
