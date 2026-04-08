"use client";

import styles from "./Testimonials.module.css";

const testimonials = [
  {
    quote: "Recebi minha manta e é ainda mais linda pessoalmente. O acabamento é impecável. Agora uso todo dia assistindo minhas séries.",
    name: "Carla Mendes",
    product: "Manta Peluda Cloud"
  },
  {
    quote: "O cardigan é perfeito. Todo mundo pergunta onde comprei. A qualidade do tricô é extraordinária.",
    name: "Patrícia Almeida",
    product: "Cardigan Oversized"
  },
  {
    quote: "Comprei como presente e amou. A embalagem também foi um carinho à parte. Recomendo demais!",
    name: "Juliana Costa",
    product: "Kit Amigurumi"
  }
];

export default function Testimonials() {
  return (
    <section className={styles.testimonials}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.label}>Depoimentos</span>
          <h2 className={styles.title}>O que dizem nossas clientes</h2>
        </div>
        <div className={styles.grid}>
          {testimonials.map((testimonial, index) => (
            <div key={index} className={styles.card}>
              <div className={styles.quoteIcon}>"</div>
              <p className={styles.quote}>{testimonial.quote}</p>
              <div className={styles.author}>
                <span className={styles.name}>{testimonial.name}</span>
                <span className={styles.product}>{testimonial.product}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
