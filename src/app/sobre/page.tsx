"use client";

import Image from "next/image";
import styles from "./sobre.module.css";

export default function SobrePage() {
  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <h1 className={styles.title}>Nossa História</h1>
        <p className={styles.subtitle}>Artesanato que aquece a alma</p>
      </div>

      <div className={styles.content}>
        <div className={styles.imageSection}>
          <div className={styles.imageWrapper}>
            <img 
              src="https://images.unsplash.com/photo-1606722590583-6951b5ea92ad?w=800&q=80" 
              alt="Artesã trabalhando"
            />
          </div>
        </div>

        <div className={styles.textSection}>
          <h2 className={styles.heading}>A Origem</h2>
          <p className={styles.text}>
            A RSR Concept Store nasceu de uma paixão antiga pelo artesanato. Cada peça carrega a história de horas de trabalho manual, onde cada ponto é dado com atenção e carinho.
          </p>
          <p className={styles.text}>
            Nosso nome representa as iniciais de nossos fundadores, mas também carrega um significado mais profundo: <strong>Reconectar, Criar e Celebrar</strong>. Acreditamos que peças artesanais trazem uma energia única para os lares e quem as usa.
          </p>

          <div className={styles.values}>
            <div className={styles.value}>
              <span className={styles.valueIcon}>♥</span>
              <h3>Feito à Mão</h3>
              <p>Cada peça é única</p>
            </div>
            <div className={styles.value}>
              <span className={styles.valueIcon}>♻</span>
              <h3>Sustentável</h3>
              <p>Materiais responsáveis</p>
            </div>
            <div className={styles.value}>
              <span className={styles.valueIcon}>✦</span>
              <h3>Artesanal</h3>
              <p>Tradição e qualidade</p>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.process}>
        <h2 className={styles.processTitle}>Nosso Processo</h2>
        <div className={styles.steps}>
          <div className={styles.step}>
            <span className={styles.stepNumber}>01</span>
            <h3>Seleção</h3>
            <p>Escolhemos fios e materiais de primeira qualidade</p>
          </div>
          <div className={styles.step}>
            <span className={styles.stepNumber}>02</span>
            <h3>Criação</h3>
            <p>Cada peça é desenvolvida com técnicas tradicionais</p>
          </div>
          <div className={styles.step}>
            <span className={styles.stepNumber}>03</span>
            <h3>Acabamento</h3>
            <p>Detalhes finais que fazem toda a diferença</p>
          </div>
          <div className={styles.step}>
            <span className={styles.stepNumber}>04</span>
            <h3>Entrega</h3>
            <p>Sua peça chega com todo o carinho</p>
          </div>
        </div>
      </div>
    </div>
  );
}
