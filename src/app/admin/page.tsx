"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./dashboard.module.css";

interface Stats {
  totalProducts: number;
  totalOrders: number;
  totalCustomers: number;
}

const quickActions = [
  { label: "Novo Produto", icon: "+", href: "/admin/produtos", color: "terracotta" },
  { label: "Ver Pedidos", icon: "◉", href: "/admin/pedidos", color: "forest" },
  { label: "Banners", icon: "▣", href: "/admin/banners", color: "gold" },
  { label: "Ver Site", icon: "↗", href: "/", color: "moss" },
];

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({ totalProducts: 12, totalOrders: 0, totalCustomers: 0 });
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Bom dia");
    else if (hour < 18) setGreeting("Boa tarde");
    else setGreeting("Boa noite");
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        <div className={styles.heroContent}>
          <span className={styles.greeting}>{greeting}!</span>
          <h1 className={styles.title}>Bem-vindo ao painel</h1>
          <p className={styles.subtitle}>Gerencie sua loja de artesanato</p>
        </div>
        <div className={styles.heroDecor}>✿</div>
      </div>

      <div className={styles.statsGrid}>
        <div className={`${styles.statCard} ${styles.products}`}>
          <div className={styles.statHeader}>
            <span className={styles.statIcon}>◇</span>
            <span className={styles.statTrend}>+2 esta semana</span>
          </div>
          <span className={styles.statValue}>{stats.totalProducts}</span>
          <span className={styles.statLabel}>Produtos</span>
          <Link href="/admin/produtos" className={styles.statLink}>Gerenciar →</Link>
        </div>

        <div className={`${styles.statCard} ${styles.orders}`}>
          <div className={styles.statHeader}>
            <span className={styles.statIcon}>◎</span>
            <span className={styles.statTrend}>0 novos</span>
          </div>
          <span className={styles.statValue}>{stats.totalOrders}</span>
          <span className={styles.statLabel}>Pedidos</span>
          <Link href="/admin/pedidos" className={styles.statLink}>Ver pedidos →</Link>
        </div>

        <div className={`${styles.statCard} ${styles.customers}`}>
          <div className={styles.statHeader}>
            <span className={styles.statIcon}>○</span>
            <span className={styles.statTrend}>+0 este mês</span>
          </div>
          <span className={styles.statValue}>{stats.totalCustomers}</span>
          <span className={styles.statLabel}>Clientes</span>
          <Link href="/admin/clientes" className={styles.statLink}>Ver clientes →</Link>
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Ações Rápidas</h2>
        <div className={styles.actionsGrid}>
          {quickActions.map((action) => (
            <Link key={action.label} href={action.href} className={`${styles.actionCard} ${styles[action.color]}`}>
              <span className={styles.actionIcon}>{action.icon}</span>
              <span className={styles.actionLabel}>{action.label}</span>
            </Link>
          ))}
        </div>
      </div>

      <div className={styles.infoGrid}>
        <div className={styles.infoCard}>
          <div className={styles.infoIcon}>◈</div>
          <div className={styles.infoContent}>
            <span className={styles.infoTitle}>Última atualização</span>
            <span className={styles.infoValue}>{new Date().toLocaleDateString('pt-BR')}</span>
          </div>
        </div>
        <div className={styles.infoCard}>
          <div className={styles.infoIcon}>✦</div>
          <div className={styles.infoContent}>
            <span className={styles.infoTitle}>Status do sistema</span>
            <span className={styles.infoValue}>Tudo funcionando</span>
          </div>
        </div>
      </div>
    </div>
  );
}