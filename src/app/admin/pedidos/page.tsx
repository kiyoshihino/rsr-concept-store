"use client";

import { useEffect, useState } from "react";
import styles from "./pedidos.module.css";

interface Order {
  id: string;
  user_id: number;
  status: string;
  total: number;
  created_at: string;
}

const statusOptions = [
  { value: "processing", label: "Pendente", color: "#F59E0B" },
  { value: "confirmed", label: "Confirmado", color: "#3B82F6" },
  { value: "shipped", label: "Enviado", color: "#8B5CF6" },
  { value: "delivered", label: "Entregue", color: "#10B981" },
  { value: "cancelled", label: "Cancelado", color: "#EF4444" },
];

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchOrders(); }, []);
  const fetchOrders = async () => {
    try { const res = await fetch("/api/admin/orders"); const data = await res.json(); setOrders(data.orders || []); }
    catch (error) { console.error("Error:", error); }
    finally { setLoading(false); }
  };

  const updateStatus = async (orderId: string, newStatus: string) => {
    try { await fetch("/api/admin/orders", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ orderId, status: newStatus }) }); fetchOrders(); }
    catch (error) { console.error("Error:", error); }
  };

  const getStatusInfo = (status: string) => statusOptions.find(s => s.value === status) || statusOptions[0];

  if (loading) return <div className={styles.loading}>Carregando...</div>;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Pedidos</h1>
          <p className={styles.subtitle}>{orders.length} pedidos registrados</p>
        </div>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Pedido</th>
              <th>Data</th>
              <th>Valor</th>
              <th>Status</th>
              <th>Atualizar</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr><td colSpan={5} className={styles.empty}>Nenhum pedido encontrado</td></tr>
            ) : (
              orders.map(order => {
                const statusInfo = getStatusInfo(order.status);
                return (
                  <tr key={order.id}>
                    <td className={styles.orderId}>#{order.id}</td>
                    <td>{new Date(order.created_at).toLocaleDateString('pt-BR')}</td>
                    <td className={styles.price}>R$ {order.total.toFixed(2)}</td>
                    <td><span className={styles.statusBadge} style={{ background: `${statusInfo.color}15`, color: statusInfo.color }}>{statusInfo.label}</span></td>
                    <td>
                      <select className={styles.statusSelect} value={order.status} onChange={(e) => updateStatus(order.id, e.target.value)}>
                        {statusOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                      </select>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}