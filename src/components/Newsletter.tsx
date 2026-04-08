"use client";

import { useState } from "react";
import styles from "./Newsletter.module.css";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail("");
    }
  };

  return (
    <section className={styles.newsletter}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h2 className={styles.title}>Fique por dentro</h2>
          <p className={styles.description}>
            Assine nossa newsletter e seja a primeira a saber sobre novas coleções, promoções e dicas de cuidados com suas peças.
          </p>
          
          {submitted ? (
            <div className={styles.success}>
              <span className={styles.successIcon}>✓</span>
              <p>Obrigada! Você receberá nossas novidades no email informado.</p>
            </div>
          ) : (
            <form className={styles.form} onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Seu melhor email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={styles.input}
              />
              <button type="submit" className={styles.button}>
                Inscrever-se
              </button>
            </form>
          )}
          
          <p className={styles.privacy}>
            Prometemos não enviar spam. Você pode cancelar quando quiser.
          </p>
        </div>
      </div>
      <div className={styles.decoration}>
        <div className={styles.stitch}></div>
        <div className={styles.stitch}></div>
        <div className={styles.stitch}></div>
      </div>
    </section>
  );
}
