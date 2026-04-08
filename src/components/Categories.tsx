"use client";

import Link from "next/link";
import { categories } from "@/data/categories";
import styles from "./Categories.module.css";

export default function Categories() {
  return (
    <section className={styles.categories}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.label}>Navegue</span>
          <h2 className={styles.title}>Por Categoria</h2>
        </div>
        <div className={styles.grid}>
          {categories.map((category, index) => (
            <Link 
              key={index} 
              href={`/shop?category=${category.slug}`}
              className={styles.card}
            >
              <div className={styles.imageWrapper}>
                <img src={category.image} alt={category.name} className={styles.image} />
                <div className={styles.overlay}></div>
              </div>
              <div className={styles.content}>
                <h3 className={styles.name}>{category.name}</h3>
                <p className={styles.description}>{category.description}</p>
                <span className={styles.link}>Ver produtos →</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
