"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import styles from "./cart.module.css";

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className={styles.page}>
        <div className={styles.empty}>
          <h1 className={styles.title}>Seu Carrinho</h1>
          <p className={styles.emptyText}>Seu carrinho está vazio</p>
          <Link href="/shop" className={styles.shopButton}>
            Ver Produtos
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.title}>Seu Carrinho</h1>
        
        <div className={styles.content}>
          <div className={styles.items}>
            {items.map((item) => (
              <div key={item.product.id} className={styles.item}>
                <div className={styles.itemImage}>
                  <Image
                    src={item.product.image}
                    alt={item.product.name}
                    fill
                    sizes="120px"
                    className={styles.image}
                  />
                </div>
                
                <div className={styles.itemDetails}>
                  <Link href={`/shop/${item.product.id}`} className={styles.itemName}>
                    {item.product.name}
                  </Link>
                  <p className={styles.itemCategory}>{item.product.category}</p>
                </div>

                <div className={styles.quantity}>
                  <button
                    className={styles.quantityButton}
                    onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                  >
                    −
                  </button>
                  <span className={styles.quantityValue}>{item.quantity}</span>
                  <button
                    className={styles.quantityButton}
                    onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>

                <p className={styles.itemPrice}>
                  R$ {(item.product.price * item.quantity).toFixed(2).replace(".", ",")}
                </p>

                <button
                  className={styles.removeButton}
                  onClick={() => removeFromCart(item.product.id)}
                  aria-label="Remover"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>
            ))}
          </div>

          <div className={styles.summary}>
            <h2 className={styles.summaryTitle}>Resumo</h2>
            <div className={styles.summaryRow}>
              <span>Subtotal</span>
              <span>R$ {totalPrice.toFixed(2).replace(".", ",")}</span>
            </div>
            <div className={styles.summaryRow}>
              <span>Frete</span>
              <span>Grátis</span>
            </div>
            <div className={`${styles.summaryRow} ${styles.total}`}>
              <span>Total</span>
              <span>R$ {totalPrice.toFixed(2).replace(".", ",")}</span>
            </div>
            <button className={styles.checkoutButton}>
              Finalizar Compra
            </button>
            <button className={styles.clearButton} onClick={clearCart}>
              Limpar Carrinho
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
