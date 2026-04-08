"use client";

import Link from "next/link";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.pattern}></div>
      <div className={styles.content}>
        <span className={styles.subtitle}>Estilo & Conforto</span>
        <h1 className={styles.title}>
          Feito para <br />
          <em>Viver Bem</em>
        </h1>
        <p className={styles.description}>
          Moda fitness,wearables, malhas,moletons e acessórios em couro. 
          Qualidade premium, design único e muito estilo para o seu dia a dia.
        </p>
      </div>
      <div className={styles.imageWrapper}>
        <div className={styles.imageDecor}>
          <img 
            src="/banner/Inverno.png" 
            alt="Coleção"
          />
        </div>
        <div className={styles.floatingCard}>
          <span className={styles.floatingLabel}>Novidades</span>
          <span className={styles.floatingText}>Coleção 2026</span>
        </div>
      </div>
      <div className={styles.actionsMobile}>
        <Link href="/shop" className={styles.primaryButton}>
          Ver Coleção
        </Link>
        <Link href="/sobre" className={styles.secondaryButton}>
          Nossa História
        </Link>
      </div>
    </section>
  );
}
