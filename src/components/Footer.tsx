"use client";

import Link from "next/link";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.pattern}></div>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.brand}>
            <Link href="/" className={styles.logo}>
              <span className={styles.logoText}>RSR</span>
              <span className={styles.logoSubtext}>Concept Store</span>
            </Link>
            <p className={styles.tagline}>
              Moda & estilo com qualidade. Peças pensadas para o seu dia a dia, com design exclusivo e materiais premium.
            </p>
          </div>

          <div className={styles.links}>
            <h4 className={styles.heading}>Navegação</h4>
            <nav className={styles.nav}>
              <Link href="/">Início</Link>
              <Link href="/shop">Shop</Link>
              <Link href="/sobre">Sobre</Link>
              <Link href="/contato">Contato</Link>
            </nav>
          </div>

          <div className={styles.links}>
            <h4 className={styles.heading}>Categorias</h4>
            <nav className={styles.nav}>
              <Link href="/shop?category=Moda Fitness">Moda Fitness</Link>
              <Link href="/shop?category=T-Shirts">T-Shirts</Link>
              <Link href="/shop?category=Uniforme Escolar">Uniforme Escolar</Link>
              <Link href="/shop?category=Moletons">Moletons</Link>
              <Link href="/shop?category=Acessórios">Acessórios</Link>
              <Link href="/shop?category=Couro">Couro</Link>
            </nav>
          </div>

          <div className={styles.contact}>
            <h4 className={styles.heading}>Contato</h4>
            <p>hello@rsrconcept.com</p>
            <p>(11) 99999-9999</p>
            <p>São Paulo, SP</p>
          </div>
        </div>

        <div className={styles.bottom}>
          <div className={styles.social}>
            <a href="#" aria-label="Instagram">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
            <a href="#" aria-label="Pinterest">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2C6.48 2 2 6.48 2 12c0 4.25 2.67 7.9 6.44 9.34-.09-.78-.17-1.96.04-2.81.19-.79 1.22-5.17 1.22-5.17s-.31-.62-.31-1.54c0-1.44.84-2.52 1.88-2.52.89 0 1.32.67 1.32 1.47 0 .89-.57 2.23-.86 3.47-.25 1.04.52 1.88 1.54 1.88 1.85 0 3.27-1.95 3.27-4.77 0-2.49-1.79-4.24-4.35-4.24-2.96 0-4.7 2.22-4.7 4.52 0 .89.34 1.85.77 2.37.08.1.09.19.07.29-.08.32-.26 1.04-.29 1.18-.05.19-.16.23-.36.14-1.35-.63-2.19-2.6-2.19-4.19 0-3.41 2.48-6.54 7.15-6.54 3.75 0 6.67 2.68 6.67 6.24 0 3.73-2.35 6.73-5.62 6.73-1.1 0-2.13-.57-2.48-1.24l-.68 2.58c-.24.94-.9 2.12-1.34 2.84 1.01.31 2.08.48 3.19.48 5.52 0 10-4.48 10-10S17.52 2 12 2z"/>
              </svg>
            </a>
            <a href="#" aria-label="WhatsApp">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
              </svg>
            </a>
          </div>
          <p className={styles.copyright}>
            © {new Date().getFullYear()} RSR Concept Store. Feito com ♥
          </p>
        </div>
      </div>
    </footer>
  );
}
