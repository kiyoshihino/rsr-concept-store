"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { products } from "@/data/products";
import styles from "./page.module.css";

export default function FavoritesPage() {
  const { favorites, toggleFavorite } = useAuth();
  
  const favoriteProducts = products.filter(p => favorites.includes(p.id));

  return (
    <div className={styles.favorites}>
      <div className={styles.header}>
        <h1 className={styles.title}>Meus Favoritos</h1>
        <p className={styles.subtitle}>Produtos que você salvou para comprar depois</p>
      </div>

      {favoriteProducts.length > 0 ? (
        <div className={styles.productsGrid}>
          {favoriteProducts.map((product) => (
            <div key={product.id} className={styles.productCard}>
              <div className={styles.productImage}>
                <div className={styles.imagePlaceholder}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                    <circle cx="8.5" cy="8.5" r="1.5"></circle>
                    <polyline points="21 15 16 10 5 21"></polyline>
                  </svg>
                </div>
                <button 
                  className={styles.removeButton}
                  onClick={() => toggleFavorite(product.id)}
                  aria-label="Remover dos favoritos"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                  </svg>
                </button>
              </div>
              <div className={styles.productInfo}>
                <span className={styles.productCategory}>{product.category}</span>
                <h3 className={styles.productName}>{product.name}</h3>
                <p className={styles.productPrice}>R$ {product.price.toFixed(2).replace(".", ",")}</p>
                <Link href={`/shop/${product.id}`} className={styles.viewButton}>
                  Ver Detalhes
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>
            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </div>
          <h3 className={styles.emptyTitle}>Nenhum favorito ainda</h3>
          <p className={styles.emptyText}>
            Explore nossa loja e salve os produtos que você mais gostar!
          </p>
          <Link href="/shop" className={styles.shopButton}>
            Explorar Loja
          </Link>
        </div>
      )}
    </div>
  );
}