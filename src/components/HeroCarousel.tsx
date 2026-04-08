"use client";

import { useState, useEffect } from "react";
import styles from "./HeroCarousel.module.css";

const banners = [
  { id: 1, src: "/banner/Carrossel01.png", alt: "Modelo com blusa de croché" },
  { id: 2, src: "/banner/2.png", alt: "Modelo com bolsa artesanal" },
  { id: 3, src: "/banner/3.png", alt: "Peça de croché detalhes" },
  { id: 4, src: "/banner/4.png", alt: "Acessórios crochetados" },
  { id: 6, src: "/banner/6.png", alt: "Conjunto completo" },
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % banners.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + banners.length) % banners.length);
  };

  const goToSlide = (index: number) => {
    setCurrent(index);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className={styles.carousel}>
      <div className={styles.slideContainer}>
        {banners.map((banner, index) => (
          <div
            key={banner.id}
            className={`${styles.slide} ${
              index === current ? styles.active : ""
            }`}
          >
            <img src={banner.src} alt={banner.alt} className={styles.image} />
            <div className={styles.overlay}></div>
          </div>
        ))}
      </div>

      <div className={styles.logoOverlay}>
        <span className={styles.logoText}>RSR</span>
        <span className={styles.logoSubtext}>Concept Store</span>
        <span className={styles.logoTagline}>Moda & Estilo</span>
      </div>

      <button className={`${styles.navButton} ${styles.prev}`} onClick={prevSlide} aria-label="Anterior">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </button>
      
      <button className={`${styles.navButton} ${styles.next}`} onClick={nextSlide} aria-label="Próximo">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </button>

      <div className={styles.dots}>
        {banners.map((_, index) => (
          <button
            key={index}
            className={`${styles.dot} ${index === current ? styles.activeDot : ""}`}
            onClick={() => goToSlide(index)}
            aria-label={`Ir para slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
