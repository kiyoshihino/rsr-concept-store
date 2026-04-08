"use client";

import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import ProductGrid from "@/components/ProductGrid";
import { products, categories } from "@/data/products";
import styles from "./shop.module.css";

export default function ShopContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");
  
  const [selectedCategory, setSelectedCategory] = useState<string>(
    categoryParam || "all"
  );
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = useMemo(() => {
    let filtered = products;

    if (selectedCategory !== "all") {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [selectedCategory, searchQuery]);

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>Nossa Coleção</h1>
        <p className={styles.subtitle}>
          Cada peça feita à mão com materiais selecionados
        </p>
      </div>

      <div className={styles.filters}>
        <div className={styles.categories}>
          {categories.map((category) => (
            <button
              key={category.id}
              className={`${styles.categoryButton} ${
                selectedCategory === category.slug ? styles.active : ""
              }`}
              onClick={() => setSelectedCategory(category.slug)}
            >
              {category.name}
            </button>
          ))}
        </div>

        <div className={styles.search}>
          <input
            type="text"
            placeholder="Buscar produtos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
          />
          <svg
            className={styles.searchIcon}
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
          </svg>
        </div>
      </div>

      <div className="container">
        {filteredProducts.length > 0 ? (
          <ProductGrid products={filteredProducts} />
        ) : (
          <div className={styles.empty}>
            <p>Nenhum produto encontrado</p>
            <button
              className={styles.clearButton}
              onClick={() => {
                setSelectedCategory("all");
                setSearchQuery("");
              }}
            >
              Limpar filtros
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
