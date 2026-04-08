"use client";

import styles from "./Features.module.css";

const features = [
  {
    icon: "✨",
    title: "Qualidade Premium",
    description: "Materiais selecionados e acabamento impecável em cada peça. Compromisso com a excelência em cada detalhe."
  },
  {
    icon: "🌿",
    title: "Conforto & Praticidade",
    description: "Tecidos pensados para o seu dia a dia. Moda que combina estilo e conforto sem comprometer."
  },
  {
    icon: "🎨",
    title: "Design Exclusivo",
    description: "Peças pensadas e desenhadas para quem busca diferenciação e personalidade nolook."
  },
  {
    icon: "♻️",
    title: "Sustentabilidade",
    description: "Compromisso com produtos duráveis e práticas sustentáveis. Moda consciente que faz sentido."
  }
];

export default function Features() {
  return (
    <section className={styles.features}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.label}>Por que escolher a RSR?</span>
          <h2 className={styles.title}>Qualidade em Primeiro Lugar</h2>
          <p className={styles.subtitle}>
            Mais do que moda, criamos peças que combinam estilo, conforto e durabilidade para o seu dia a dia.
          </p>
        </div>
        <div className={styles.grid}>
          {features.map((feature, index) => (
            <div key={index} className={styles.card}>
              <span className={styles.icon}>{feature.icon}</span>
              <h3 className={styles.cardTitle}>{feature.title}</h3>
              <p className={styles.cardDescription}>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
