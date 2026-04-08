"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import styles from "./page.module.css";

export default function AccountDashboard() {
  const { user, orders, logout } = useAuth();

  const recentOrders = orders.slice(0, 3);
  const pendingOrders = orders.filter(o => o.status === "processing" || o.status === "confirmed" || o.status === "shipped").length;

  return (
    <div className={styles.dashboard}>
      <div className={styles.header}>
        <div className={styles.welcome}>
          <h1 className={styles.title}>Bem-vindo, {user?.name.split(" ")[0]}!</h1>
          <p className={styles.subtitle}>Aqui está o resumo da sua conta</p>
        </div>
        <button onClick={logout} className={styles.logoutButton}>
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
            <polyline points="16 17 21 12 16 7"></polyline>
            <line x1="21" y1="12" x2="9" y2="12"></line>
          </svg>
          Sair
        </button>
      </div>

      <div className={styles.stats}>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <path d="M16 10a4 4 0 0 1-8 0"></path>
            </svg>
          </div>
          <div className={styles.statContent}>
            <span className={styles.statValue}>{orders.length}</span>
            <span className={styles.statLabel}>Pedidos</span>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
          </div>
          <div className={styles.statContent}>
            <span className={styles.statValue}>{pendingOrders}</span>
            <span className={styles.statLabel}>Em Andamento</span>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </div>
          <div className={styles.statContent}>
            <span className={styles.statValue}>0</span>
            <span className={styles.statLabel}>Favoritos</span>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
          </div>
          <div className={styles.statContent}>
            <span className={styles.statValue}>0</span>
            <span className={styles.statLabel}>Endereços</span>
          </div>
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Pedidos Recentes</h2>
          <Link href="/conta/pedidos" className={styles.viewAll}>Ver todos →</Link>
        </div>

        {recentOrders.length > 0 ? (
          <div className={styles.ordersList}>
            {recentOrders.map((order) => (
              <div key={order.id} className={styles.orderCard}>
                <div className={styles.orderInfo}>
                  <div className={styles.orderHeader}>
                    <span className={styles.orderId}>{order.id}</span>
                    <span className={`${styles.orderStatus} ${styles[order.status]}`}>
                      {order.status === "processing" && "Processando"}
                      {order.status === "confirmed" && "Confirmado"}
                      {order.status === "shipped" && "Enviado"}
                      {order.status === "delivered" && "Entregue"}
                      {order.status === "cancelled" && "Cancelado"}
                    </span>
                  </div>
                  <p className={styles.orderDate}>Data: {new Date(order.date).toLocaleDateString("pt-BR")}</p>
                  <p className={styles.orderItems}>{order.items.length} item(s)</p>
                </div>
                <div className={styles.orderTotal}>
                  <span className={styles.totalValue}>R$ {order.total.toFixed(2).replace(".", ",")}</span>
                  <Link href={`/conta/pedidos/${order.id}`} className={styles.orderDetails}>
                    Ver detalhes
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.emptyState}>
            <p>Nenhum pedido realizado ainda.</p>
            <Link href="/shop" className={styles.shopButton}>Começar a Comprar</Link>
          </div>
        )}
      </div>

      <div className={styles.quickActions}>
        <h2 className={styles.sectionTitle}>Ações Rápidas</h2>
        <div className={styles.actionsGrid}>
          <Link href="/conta/perfil" className={styles.actionCard}>
            <div className={styles.actionIcon}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>
            <span>Editar Perfil</span>
          </Link>
          <Link href="/conta/enderecos" className={styles.actionCard}>
            <div className={styles.actionIcon}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
            </div>
            <span>Meus Endereços</span>
          </Link>
          <Link href="/conta/favoritos" className={styles.actionCard}>
            <div className={styles.actionIcon}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
            </div>
            <span>Meus Favoritos</span>
          </Link>
        </div>
      </div>
    </div>
  );
}