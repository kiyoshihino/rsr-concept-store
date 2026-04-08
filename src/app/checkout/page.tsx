"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import styles from "./checkout.module.css";

const SHIPPING_OPTIONS = [
  { id: "standard", name: "Frete Padrão", time: "5-10 dias úteis", price: 15.0 },
  { id: "express", name: "Frete Expresso", time: "2-4 dias úteis", price: 35.0 },
];

const PAYMENT_METHODS = [
  { id: "pix", name: "Pix (5% de desconto)", icon: "⚡" },
  { id: "credit_card", name: "Cartão de Crédito", icon: "💳" },
  { id: "boleto", name: "Boleto Bancário", icon: "📄" },
];

export default function CheckoutPage() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading: authLoading, addresses, addOrder } = useAuth();
  const { items, totalPrice, clearCart } = useCart();

  const [selectedAddressId, setSelectedAddressId] = useState<string>("");
  const [selectedShippingId, setSelectedShippingId] = useState<string>("standard");
  const [selectedPaymentId, setSelectedPaymentId] = useState<string>("pix");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push("/login?redirect=/checkout");
    }
  }, [isAuthenticated, authLoading, router]);

  useEffect(() => {
    if (addresses.length > 0 && !selectedAddressId) {
      const defaultAddr = addresses.find(a => a.isDefault) || addresses[0];
      setSelectedAddressId(defaultAddr.id);
    }
  }, [addresses, selectedAddressId]);

  if (authLoading || !isAuthenticated) {
    return (
      <div className={styles.page}>
        <div className={styles.loadingOverlay}>
          <div className={styles.spinner}></div>
          <p>Verificando autenticação...</p>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className={styles.page}>
        <div className={styles.container}>
          <div className={styles.emptyState}>
            <h1 className={styles.title}>Seu carrinho está vazio</h1>
            <p>Adicione produtos antes de finalizar a compra.</p>
            <Link href="/shop" className={styles.shopButton}>
              Ir para a Loja
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const currentShipping = SHIPPING_OPTIONS.find(s => s.id === selectedShippingId)!;
  const subtotal = totalPrice;
  const shippingPrice = currentShipping.price;
  const discount = selectedPaymentId === "pix" ? subtotal * 0.05 : 0;
  const finalTotal = subtotal + shippingPrice - discount;

  const handleFinishOrder = async () => {
    if (!selectedAddressId) {
      alert("Por favor, selecione um endereço de entrega.");
      return;
    }

    setIsSubmitting(true);
    try {
      const selectedAddress = addresses.find(a => a.id === selectedAddressId)!;
      
      await addOrder({
        items: items.map(item => ({
          productId: item.product.id.toString(),
          name: item.product.name,
          quantity: item.quantity,
          price: item.product.price,
          image: item.product.image
        })),
        total: finalTotal,
        shippingAddress: selectedAddress,
        status: "processing"
      });

      clearCart();
      router.push("/conta#pedidos");
    } catch (error) {
      console.error("Erro ao finalizar pedido:", error);
      alert("Ocorreu um erro ao finalizar seu pedido. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <Link href="/carrinho" className={styles.backLink}>
          ← Voltar para o carrinho
        </Link>
        <h1 className={styles.title}>Finalizar Compra</h1>

        <div className={styles.layout}>
          <div className={styles.sections}>
            {/* Endereço de Entrega */}
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>
                <span>1</span> Endereço de Entrega
              </h2>
              
              {addresses.length > 0 ? (
                <div className={styles.addressList}>
                  {addresses.map((addr) => (
                    <div
                      key={addr.id}
                      className={`${styles.addressCard} ${selectedAddressId === addr.id ? styles.selected : ""}`}
                      onClick={() => setSelectedAddressId(addr.id)}
                    >
                      <span className={styles.addressLabel}>{addr.label}</span>
                      <p className={styles.addressText}>
                        {addr.street}, {addr.number} {addr.complement && `- ${addr.complement}`} <br />
                        {addr.neighborhood} - {addr.city}/{addr.state} <br />
                        CEP: {addr.cep}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p style={{ marginBottom: "var(--space-md)", color: "var(--color-stone)" }}>
                  Você ainda não tem endereços cadastrados.
                </p>
              )}
              
              <Link href="/conta?tab=enderecos&redirect=/checkout" className={styles.addNewButton}>
                + Adicionar ou Gerenciar Endereços
              </Link>
            </section>

            {/* Método de Envio */}
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>
                <span>2</span> Método de Envio
              </h2>
              <div className={styles.shippingOptions}>
                {SHIPPING_OPTIONS.map((opt) => (
                  <div
                    key={opt.id}
                    className={`${styles.optionCard} ${selectedShippingId === opt.id ? styles.selected : ""}`}
                    onClick={() => setSelectedShippingId(opt.id)}
                  >
                    <div className={styles.radio}></div>
                    <div className={styles.optionInfo}>
                      <p className={styles.optionName}>{opt.name}</p>
                      <p className={styles.optionTime}>{opt.time}</p>
                    </div>
                    <span className={styles.optionPrice}>
                      {opt.price === 0 ? "Grátis" : `R$ ${opt.price.toFixed(2).replace(".", ",")}`}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* Pagamento */}
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>
                <span>3</span> Pagamento
              </h2>
              <div className={styles.paymentMethods}>
                {PAYMENT_METHODS.map((method) => (
                  <div
                    key={method.id}
                    className={`${styles.paymentCard} ${selectedPaymentId === method.id ? styles.selected : ""}`}
                    onClick={() => setSelectedPaymentId(method.id)}
                  >
                    <div className={styles.paymentIcon}>{method.icon}</div>
                    <p className={styles.paymentName}>{method.name}</p>
                    <div className={styles.radio}></div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Lateral - Resumo */}
          <aside className={styles.sidebar}>
            <div className={styles.summary}>
              <h2 className={styles.summaryTitle}>Resumo do Pedido</h2>
              
              <div className={styles.itemsList}>
                {items.map((item) => (
                  <div key={item.product.id} className={styles.summaryItem}>
                    <div className={styles.itemImage}>
                      <Image
                        src={item.product.image}
                        alt={item.product.name}
                        fill
                        sizes="60px"
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                    <div className={styles.itemInfo}>
                      <span className={styles.itemName}>{item.product.name}</span>
                      <p className={styles.itemMeta}>Qtd: {item.quantity}</p>
                    </div>
                    <span className={styles.itemPrice}>
                      R$ {(item.product.price * item.quantity).toFixed(2).replace(".", ",")}
                    </span>
                  </div>
                ))}
              </div>

              <div className={styles.summaryTotal}>
                <div className={styles.row}>
                  <span>Subtotal</span>
                  <span>R$ {subtotal.toFixed(2).replace(".", ",")}</span>
                </div>
                <div className={styles.row}>
                  <span>Frete</span>
                  <span>R$ {shippingPrice.toFixed(2).replace(".", ",")}</span>
                </div>
                {discount > 0 && (
                  <div className={styles.row} style={{ color: "var(--color-sage)" }}>
                    <span>Desconto Pix (5%)</span>
                    <span>- R$ {discount.toFixed(2).replace(".", ",")}</span>
                  </div>
                )}
                <div className={`${styles.row} ${styles.total}`}>
                  <span>Total</span>
                  <span>R$ {finalTotal.toFixed(2).replace(".", ",")}</span>
                </div>
              </div>

              <button
                className={`${styles.orderButton} ${isSubmitting ? styles.loading : ""}`}
                onClick={handleFinishOrder}
                disabled={isSubmitting || !selectedAddressId}
              >
                {isSubmitting ? "" : "Finalizar Pedido"}
              </button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
