"use client";

import { useState } from "react";
import styles from "./contato.module.css";

export default function ContatoPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className={styles.page}>
        <div className={styles.success}>
          <h1 className={styles.title}>Obrigada!</h1>
          <p className={styles.successText}>
            Sua mensagem foi enviada com sucesso. Retornaremos em breve.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <h1 className={styles.title}>Fale Conosco</h1>
        <p className={styles.subtitle}>Estamos sempre prontas para ajudar</p>
      </div>

      <div className={styles.content}>
        <div className={styles.info}>
          <div className={styles.infoItem}>
            <h3>Email</h3>
            <p>hello@rsrconcept.com</p>
          </div>
          <div className={styles.infoItem}>
            <h3>WhatsApp</h3>
            <p>(11) 99999-9999</p>
          </div>
          <div className={styles.infoItem}>
            <h3>Horário</h3>
            <p>Seg a Sex: 9h às 18h</p>
          </div>
          <div className={styles.infoItem}>
            <h3>Localização</h3>
            <p>São Paulo, SP</p>
          </div>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Nome</label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="subject">Assunto</label>
            <select
              id="subject"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              required
              className={styles.input}
            >
              <option value="">Selecione um assunto</option>
              <option value="pedido">Pedido</option>
              <option value="duvida">Dúvida</option>
              <option value="parceria">Parceria</option>
              <option value="outro">Outro</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="message">Mensagem</label>
            <textarea
              id="message"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              required
              rows={6}
              className={styles.textarea}
            />
          </div>

          <button type="submit" className={styles.submitButton}>
            Enviar Mensagem
          </button>
        </form>
      </div>
    </div>
  );
}
