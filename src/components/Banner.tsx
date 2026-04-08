"use client";

import Link from "next/link";
import styles from "./Banner.module.css";

interface BannerProps {
  title: string;
  subtitle?: string;
  description?: string;
  ctaText?: string;
  ctaLink?: string;
  image: string;
  reverse?: boolean;
}

export default function Banner({ 
  title, 
  subtitle, 
  description, 
  ctaText, 
  ctaLink = "/shop",
  image,
  reverse = false
}: BannerProps) {
  return (
    <section className={`${styles.banner} ${reverse ? styles.reverse : ""}`}>
      <div className={styles.imageSection}>
        <img src={image} alt={title} className={styles.image} />
        <div className={styles.overlay}></div>
      </div>
      <div className={styles.content}>
        {subtitle && <span className={styles.subtitle}>{subtitle}</span>}
        <h2 className={styles.title}>{title}</h2>
        {description && <p className={styles.description}>{description}</p>}
        {ctaText && (
          <Link href={ctaLink} className={styles.ctaButton}>
            {ctaText}
          </Link>
        )}
      </div>
    </section>
  );
}
