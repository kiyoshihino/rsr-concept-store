"use client";

import { usePathname } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Providers({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  // Routes that should NOT show header/footer
  const hideShellRoutes = ['/login', '/cadastro', '/admin', '/conta'];
  const shouldHideShell = hideShellRoutes.some(route => pathname?.startsWith(route));
  
  if (!isMounted) {
    return (
      <AuthProvider>
        <CartProvider>
          {children}
        </CartProvider>
      </AuthProvider>
    );
  }
  
  return (
    <AuthProvider>
      <CartProvider>
        {shouldHideShell ? (
          children
        ) : (
          <>
            <Header />
            <main style={{ minHeight: 'calc(100vh - 200px)' }}>
              {children}
            </main>
            <Footer />
          </>
        )}
      </CartProvider>
    </AuthProvider>
  );
}