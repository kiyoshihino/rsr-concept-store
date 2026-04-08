"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

export default function LoginPage() {
  const { login, isLoading } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    try {
      await login(email, password);
      router.push("/conta");
    } catch (err) {
      setError("E-mail ou senha incorretos");
    }
  };

  return (
    <div className={styles.loginPage}>
      <div className={styles.loginCard}>
        <div className={styles.loginHeader}>
          <h1 className={styles.title}>Entrar</h1>
          <p className={styles.subtitle}>Acesse sua conta RSR</p>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          {error && <div className={styles.error}>{error}</div>}
          
          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>E-mail</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.input}
              placeholder="seu@email.com"
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.label}>Senha</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.input}
              placeholder="••••••••"
              required
            />
          </div>

          <div className={styles.options}>
            <label className={styles.checkboxLabel}>
              <input type="checkbox" className={styles.checkbox} />
              <span>Lembrar-me</span>
            </label>
            <Link href="/conta/login?recovery" className={styles.forgotLink}>
              Esqueci minha senha
            </Link>
          </div>

          <button type="submit" className={styles.submitButton} disabled={isLoading}>
            {isLoading ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <div className={styles.divider}>
          <span>ou</span>
        </div>

        <div className={styles.registerSection}>
          <p className={styles.registerText}>Não tem conta?</p>
          <Link href="/conta/cadastro" className={styles.registerButton}>
            Criar Conta
          </Link>
        </div>

        <p className={styles.demoHint}>
          Demo: Use qualquer e-mail e senha para testar
        </p>
      </div>
    </div>
  );
}