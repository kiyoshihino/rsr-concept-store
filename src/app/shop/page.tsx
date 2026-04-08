import { Suspense } from "react";
import ShopContent from "./ShopContent";
import styles from "./shop.module.css";

export default function ShopPage() {
  return (
    <Suspense fallback={
      <div className={styles.page}>
        <div className={styles.header}>
          <h1 className={styles.title}>Nossa Coleção</h1>
        </div>
        <div className={styles.loading}>Carregando...</div>
      </div>
    }>
      <ShopContent />
    </Suspense>
  );
}
