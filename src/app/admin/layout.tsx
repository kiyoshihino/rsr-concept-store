"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import styles from "./layout.module.css";

const menuItems = [
  { label: "Dashboard", href: "/admin", icon: "◈" },
  { label: "Produtos", href: "/admin/produtos", icon: "◇" },
  { label: "Pedidos", href: "/admin/pedidos", icon: "◎" },
  { label: "Clientes", href: "/admin/clientes", icon: "○" },
  { label: "Categorias", href: "/admin/categorias", icon: "◉" },
  { label: "Banners", href: "/admin/banners", icon: "▣" },
  { label: "Newsletter", href: "/admin/newsletter", icon: "✦" },
  { label: "Configurações", href: "/admin/configuracoes", icon: "⚙" },
];

const bottomNavItems = [
  { label: "Início", href: "/admin", icon: "◈" },
  { label: "Pedidos", href: "/admin/pedidos", icon: "◎" },
  { label: "Produtos", href: "/admin/produtos", icon: "◇" },
  { label: "Mais", href: "/admin/configuracoes", icon: "☰" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <div className={styles.container}>
      <aside className={`${styles.sidebar} ${sidebarOpen ? styles.open : ""}`}>
        <div className={styles.logo}>
          <span className={styles.logoMark}>✿</span>
          <div className={styles.logoText}>
            <span className={styles.logoName}>RSR</span>
            <span className={styles.logoDesc}>Concept</span>
          </div>
        </div>

        <nav className={styles.nav}>
          <span className={styles.navLabel}>Menu Principal</span>
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`${styles.navItem} ${pathname === item.href ? styles.active : ""}`}
              onClick={() => setSidebarOpen(false)}
            >
              <span className={styles.navIcon}>{item.icon}</span>
              <span className={styles.navText}>{item.label}</span>
              {pathname === item.href && <span className={styles.activeDot} />}
            </Link>
          ))}
        </nav>

        <div className={styles.sidebarFooter}>
          <Link href="/" className={styles.siteLink}>
            <span>🌐</span>
            <span>Ver Site</span>
          </Link>
          <button onClick={handleLogout} className={styles.logoutBtn}>
            <span>↩</span>
            <span>Sair</span>
          </button>
          <div className={styles.version}>v1.0.0</div>
        </div>
      </aside>

      <div 
        className={`${styles.sidebarOverlay} ${sidebarOpen ? styles.open : ""}`}
        onClick={() => setSidebarOpen(false)}
      />

      <div className={styles.mobileHeader}>
        <button className={styles.menuBtn} onClick={() => setSidebarOpen(true)}>
          ☰
        </button>
        <div className={styles.mobileLogo}>
            <span>✿</span>
            <span>RSR</span>
          </div>
          <div className={styles.mobileUser}>
            {user?.name?.charAt(0).toUpperCase() || "A"}
          </div>
      </div>

      <main className={styles.main}>
        <header className={styles.topbar}>
          <div className={styles.breadcrumb}>
            <span className={styles.breadcrumbIcon}>☰</span>
            <span>Painel Admin</span>
          </div>
          <div className={styles.topbarRight}>
            <span className={styles.adminName}>{user?.name || "Admin"}</span>
            <span className={styles.adminBadge}>Admin</span>
          </div>
        </header>
        <div className={styles.content}>{children}</div>
      </main>

      <nav className={styles.bottomNav}>
        <Link href="/admin" className={`${styles.bottomNavItem} ${pathname === "/admin" ? styles.active : ""}`}>
          <span className={styles.bottomNavIcon}>◈</span>
          <span className={styles.bottomNavLabel}>Início</span>
        </Link>
        <Link href="/admin/pedidos" className={`${styles.bottomNavItem} ${pathname === "/admin/pedidos" ? styles.active : ""}`}>
          <span className={styles.bottomNavIcon}>◎</span>
          <span className={styles.bottomNavLabel}>Pedidos</span>
        </Link>
        <Link href="/admin/produtos" className={`${styles.bottomNavItem} ${pathname === "/admin/produtos" ? styles.active : ""}`}>
          <span className={styles.bottomNavIcon}>◇</span>
          <span className={styles.bottomNavLabel}>Produtos</span>
        </Link>
        <button className={styles.bottomNavItem} onClick={() => setSidebarOpen(true)}>
          <span className={styles.bottomNavIcon}>☰</span>
          <span className={styles.bottomNavLabel}>Mais</span>
        </button>
      </nav>
    </div>
  );
}