"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import styles from "./Header.module.css";

export default function Header() {
  const { totalItems } = useCart();
  const { isAuthenticated, user } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
      <div className={styles.container}>
        <nav className={styles.nav}>
          <Link href="/" className={styles.logo}>
            <span className={styles.logoText}>RSR</span>
            <div className={styles.logoLines}>
              <span className={styles.logoLine1}>Concept</span>
              <span className={styles.logoLine2}>Store</span>
            </div>
          </Link>
        </nav>

        <nav className={`${styles.navLinks} ${menuOpen ? styles.open : ""}`}>
          <Link href="/" className={styles.navLink}>Início</Link>
          <Link href="/shop" className={styles.navLink}>Shop</Link>
          <Link href="/sobre" className={styles.navLink}>Sobre</Link>
          <Link href="/contato" className={styles.navLink}>Contato</Link>
        </nav>

        <div className={styles.actions}>
          <Link 
            href={isAuthenticated ? "/conta" : "/login"} 
            className={styles.accountButton}
            aria-label={isAuthenticated ? "Minha conta" : "Entrar"}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
            {isAuthenticated && user && (
              <span className={styles.accountName}>{user.name.split(" ")[0]}</span>
            )}
          </Link>

          <Link href="/carrinho" className={styles.cartButton}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <path d="M16 10a4 4 0 0 1-8 0"></path>
            </svg>
            {totalItems > 0 && <span className={styles.cartBadge}>{totalItems}</span>}
          </Link>

          <button 
            className={styles.menuToggle}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <span className={`${styles.menuLine} ${menuOpen ? styles.open : ""}`}></span>
          </button>
        </div>
      </div>
    </header>
  );
}
