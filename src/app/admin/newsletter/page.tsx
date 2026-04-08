"use client";

import { useState } from "react";
import styles from "./newsletter.module.css";

interface Subscriber { id: string; email: string; name: string; created_at: string; }

export default function AdminNewsletter() {
  const [subscribers] = useState<Subscriber[]>([]);
  const handleExport = () => {
    if (subscribers.length === 0) { alert("Nenhum inscrito para exportar"); return; }
    const csv = subscribers.map(s => `${s.name},${s.email},${s.created_at}`).join("\n");
    const blob = new Blob(["Nome,Email,Data\n" + csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = "newsletter.csv"; a.click();
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div><h1 className={styles.title}>Newsletter</h1><p className={styles.subtitle}>Gerencie os inscritos</p></div>
        <button className={styles.exportBtn} onClick={handleExport}>↓ Exportar</button>
      </div>
      <div className={styles.statsCard}>
        <span className={styles.statsValue}>{subscribers.length}</span>
        <span className={styles.statsLabel}>Inscritos</span>
      </div>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead><tr><th>Nome</th><th>Email</th><th>Data</th></tr></thead>
          <tbody>
            {subscribers.length === 0 ? <tr><td colSpan={3} className={styles.empty}>Nenhum inscrito ainda</td></tr> : 
              subscribers.map(sub => <tr key={sub.id}><td>{sub.name}</td><td>{sub.email}</td><td>{new Date(sub.created_at).toLocaleDateString("pt-BR")}</td></tr>)}
          </tbody>
        </table>
      </div>
    </div>
  );
}