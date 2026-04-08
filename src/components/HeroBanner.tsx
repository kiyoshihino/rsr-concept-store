"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import styles from "./HeroBanner.module.css";

export default function HeroBanner() {
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (parallaxRef.current) {
        const scrolled = window.scrollY;
        parallaxRef.current.style.transform = `translateY(${scrolled * 0.3}px)`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className={styles.hero}>
      <div className={styles.parallax} ref={parallaxRef}>
        <div className={styles.imageGrid}>
          <div className={`${styles.imageWrapper} ${styles.large}`}>
            <img 
              src="https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=90" 
              alt="Modelo com blusa de croché" 
              className={styles.image}
            />
          </div>
          <div className={styles.imageWrapper}>
            <img 
              src="https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&q=90" 
              alt="Modelo com bolsa artesanal" 
              className={styles.image}
            />
          </div>
          <div className={styles.imageWrapper}>
            <img 
              src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=90" 
              alt="Look de croché" 
              className={styles.image}
            />
          </div>
        </div>
        <div className={styles.overlay}></div>
      </div>

      <div className={styles.content}>
        <div className={styles.textContent}>
          <span className={styles.label}>Coleção Exclusiva</span>
          <h1 className={styles.title}>
            <span className={styles.titleLine}>O artesanato</span>
            <span className={styles.titleLine}>
              que <em>veste</em> alma
            </span>
          </h1>
          <p className={styles.description}>
            Descubra peças únicas de croché e tricô, criadas manualmente com fios selecionados e o carinho que só o artesanato brasileiro pode oferecer. Cada ponto carrega história, tradição e muito amor.
          </p>
          <div className={styles.actions}>
            <Link href="/shop" className={styles.primaryButton}>
              Explorar Coleção
            </Link>
            <Link href="/sobre" className={styles.secondaryButton}>
              Nossa História
            </Link>
          </div>
        </div>
        
        <div className={styles.stats}>
          <div className={styles.stat}>
            <span className={styles.statNumber}>100%</span>
            <span className={styles.statLabel}>Feito à Mão</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statNumber}>12+</span>
            <span className={styles.statLabel}>Anos de Arte</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statNumber}>5k+</span>
            <span className={styles.statLabel}>Clientes Felizes</span>
          </div>
        </div>
      </div>

      <div className={styles.scrollIndicator}>
        <span>Descubra mais</span>
        <div className={styles.scrollIcon}>
          <span></span>
        </div>
      </div>
    </section>
  );
}
