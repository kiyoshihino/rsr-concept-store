"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth, Order } from "@/context/AuthContext";
import styles from "./page.module.css";

const statusLabels = {
  processing: "Processando",
  confirmed: "Confirmado",
  shipped: "Enviado",
  delivered: "Entregue",
  cancelled: "Cancelado"
};

export default function OrdersPage() {
  const { orders } = useAuth();
  const [filter, setFilter] = useState<string>("all");
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  const filteredOrders = filter === "all" 
    ? orders 
    : orders.filter(o => o.status === filter);

  const toggleOrder = (orderId: string) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  return (
    <div className={styles.orders}>
      <div className={styles.header}>
        <h1 className={styles.title}>Meus Pedidos</h1>
        <p className={styles.subtitle}>Acompanhe todos os seus pedidos</p>
      </div>

      <div className={styles.filters}>
        <button 
          className={`${styles.filterButton} ${filter === "all" ? styles.active : ""}`}
          onClick={() => setFilter("all")}
        >
          Todos ({orders.length})
        </button>
        <button 
          className={`${styles.filterButton} ${filter === "processing" ? styles.active : ""}`}
          onClick={() => setFilter("processing")}
        >
          Processando
        </button>
        <button 
          className={`${styles.filterButton} ${filter === "shipped" ? styles.active : ""}`}
          onClick={() => setFilter("shipped")}
        >
          Enviados
        </button>
        <button 
          className={`${styles.filterButton} ${filter === "delivered" ? styles.active : ""}`}
          onClick={() => setFilter("delivered")}
        >
          Entregues
        </button>
      </div>

      {filteredOrders.length > 0 ? (
        <div className={styles.ordersList}>
          {filteredOrders.map((order) => (
            <div key={order.id} className={styles.orderCard}>
              <div className={styles.orderMain} onClick={() => toggleOrder(order.id)}>
                <div className={styles.orderInfo}>
                  <div className={styles.orderHeader}>
                    <span className={styles.orderId}>Pedido {order.id}</span>
                    <span className={`${styles.orderStatus} ${styles[order.status]}`}>
                      {statusLabels[order.status]}
                    </span>
                  </div>
                  <div className={styles.orderMeta}>
                    <span className={styles.orderDate}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                        <line x1="16" y1="2" x2="16" y2="6"></line>
                        <line x1="8" y1="2" x2="8" y2="6"></line>
                        <line x1="3" y1="10" x2="21" y2="10"></line>
                      </svg>
                      {new Date(order.date).toLocaleDateString("pt-BR")}
                    </span>
                    <span className={styles.orderItems}>
                      {order.items.reduce((sum, item) => sum + item.quantity, 0)} item(s)
                    </span>
                  </div>
                </div>
                <div className={styles.orderTotal}>
                  <span className={styles.totalValue}>R$ {order.total.toFixed(2).replace(".", ",")}</span>
                  <span className={styles.expandIcon}>
                    {expandedOrder === order.id ? "−" : "+"}
                  </span>
                </div>
              </div>

              {expandedOrder === order.id && (
                <div className={styles.orderDetails}>
                  <div className={styles.itemsList}>
                    <h3 className={styles.detailsTitle}>Itens do Pedido</h3>
                    {order.items.map((item, index) => (
                      <div key={index} className={styles.orderItem}>
                        <div className={styles.itemImage}>
                          <div className={styles.itemPlaceholder}>IMG</div>
                        </div>
                        <div className={styles.itemInfo}>
                          <span className={styles.itemName}>{item.name}</span>
                          <span className={styles.itemQuantity}>Qty: {item.quantity}</span>
                        </div>
                        <span className={styles.itemPrice}>R$ {(item.price * item.quantity).toFixed(2).replace(".", ",")}</span>
                      </div>
                    ))}
                  </div>

                  <div className={styles.shippingInfo}>
                    <h3 className={styles.detailsTitle}>Endereço de Entrega</h3>
                    <div className={styles.addressBox}>
                      <p className={styles.addressLabel}>{order.shippingAddress.label}</p>
                      <p className={styles.addressText}>
                        {order.shippingAddress.street}, {order.shippingAddress.number}
                        {order.shippingAddress.complement && `, ${order.shippingAddress.complement}`}
                      </p>
                      <p className={styles.addressText}>
                        {order.shippingAddress.neighborhood} - {order.shippingAddress.city}/{order.shippingAddress.state}
                      </p>
                      <p className={styles.addressText}>CEP: {order.shippingAddress.cep}</p>
                    </div>
                  </div>

                  {order.trackingNumber && (
                    <div className={styles.tracking}>
                      <h3 className={styles.detailsTitle}>Rastreamento</h3>
                      <p className={styles.trackingNumber}>Código: {order.trackingNumber}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <path d="M16 10a4 4 0 0 1-8 0"></path>
            </svg>
          </div>
          <h3 className={styles.emptyTitle}>Nenhum pedido encontrado</h3>
          <p className={styles.emptyText}>Você ainda não realizou nenhum pedido.</p>
          <Link href="/shop" className={styles.shopButton}>Começar a Comprar</Link>
        </div>
      )}
    </div>
  );
}