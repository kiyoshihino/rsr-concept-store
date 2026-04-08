"use client";

import { useState } from "react";
import styles from "./configuracoes.module.css";

export default function AdminConfiguracoes() {
  const [settings, setSettings] = useState({ storeName: "RSR Concept Store", storeEmail: "contato@rsrconceptstore.com.br", storePhone: "(11) 99999-9999", storeAddress: "Rua Example, 123 - São Paulo, SP", shippingPrice: "15.00", freeShippingMin: "200.00" });
  const handleSave = () => alert("Configurações salvas com sucesso!");

  return (
    <div className={styles.container}>
      <div className={styles.header}><h1 className={styles.title}>Configurações</h1><p className={styles.subtitle}>Personalize sua loja</p></div>
      <div className={styles.card}>
        <div className={styles.cardHeader}><h2>Informações da Loja</h2></div>
        <div className={styles.cardBody}>
          <div className={styles.formGrid}>
            <div className={styles.formGroup}><label>Nome da Loja</label><input type="text" value={settings.storeName} onChange={e => setSettings({...settings, storeName: e.target.value})} /></div>
            <div className={styles.formGroup}><label>Email</label><input type="email" value={settings.storeEmail} onChange={e => setSettings({...settings, storeEmail: e.target.value})} /></div>
            <div className={styles.formGroup}><label>Telefone</label><input type="text" value={settings.storePhone} onChange={e => setSettings({...settings, storePhone: e.target.value})} /></div>
            <div className={styles.formGroup}><label>Endereço</label><input type="text" value={settings.storeAddress} onChange={e => setSettings({...settings, storeAddress: e.target.value})} /></div>
          </div>
        </div>
      </div>
      <div className={styles.card}>
        <div className={styles.cardHeader}><h2>Frete</h2></div>
        <div className={styles.cardBody}>
          <div className={styles.formGrid}>
            <div className={styles.formGroup}><label>Valor do Frete (R$)</label><input type="number" value={settings.shippingPrice} onChange={e => setSettings({...settings, shippingPrice: e.target.value})} /></div>
            <div className={styles.formGroup}><label>Frete Grátis a partir de (R$)</label><input type="number" value={settings.freeShippingMin} onChange={e => setSettings({...settings, freeShippingMin: e.target.value})} /></div>
          </div>
        </div>
      </div>
      <button className={styles.saveBtn} onClick={handleSave}>✿ Salvar Configurações</button>
    </div>
  );
}