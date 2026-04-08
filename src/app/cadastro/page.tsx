"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

export default function RegisterPage() {
  const { register, isLoading } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    cpf: "",
    password: "",
    confirmPassword: "",
    street: "",
    number: "",
    complement: "",
    neighborhood: "",
    city: "",
    state: "",
    cep: ""
  });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("As senhas não coincidem");
      return;
    }

    if (formData.password.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres");
      return;
    }

    try {
      await register({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        cpf: formData.cpf,
        birthDate: "",
        password: formData.password,
        address: {
          street: formData.street,
          number: formData.number,
          complement: formData.complement,
          neighborhood: formData.neighborhood,
          city: formData.city,
          state: formData.state,
          cep: formData.cep
        }
      });
      router.push("/conta");
    } catch (err) {
      setError("Erro ao criar conta. Tente novamente.");
    }
  };

  return (
    <div className={styles.registerPage}>
      <div className={styles.registerCard}>
        <div className={styles.registerHeader}>
          <h1 className={styles.title}>Criar Conta</h1>
          <p className={styles.subtitle}>Junte-se à família RSR</p>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          {error && <div className={styles.error}>{error}</div>}
          
          <div className={styles.formGroup}>
            <label htmlFor="name" className={styles.label}>Nome Completo</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={styles.input}
              placeholder="Seu nome completo"
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>E-mail</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={styles.input}
              placeholder="seu@email.com"
              required
            />
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="phone" className={styles.label}>Telefone</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={styles.input}
                placeholder="(00) 00000-0000"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="cpf" className={styles.label}>CPF</label>
              <input
                type="text"
                id="cpf"
                name="cpf"
                value={formData.cpf}
                onChange={handleChange}
                className={styles.input}
                placeholder="000.000.000-00"
              />
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="password" className={styles.label}>Senha</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={styles.input}
                placeholder="••••••••"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="confirmPassword" className={styles.label}>Confirmar Senha</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={styles.input}
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <div className={styles.formSection}>
            <h3 className={styles.sectionTitle}>Endereço</h3>
            
            <div className={styles.formRow}>
              <div className={styles.formGroup} style={{ flex: 2 }}>
                <label htmlFor="street" className={styles.label}>Rua</label>
                <input
                  type="text"
                  id="street"
                  name="street"
                  value={formData.street}
                  onChange={handleChange}
                  className={styles.input}
                  placeholder="Nome da rua"
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="number" className={styles.label}>Número</label>
                <input
                  type="text"
                  id="number"
                  name="number"
                  value={formData.number}
                  onChange={handleChange}
                  className={styles.input}
                  placeholder="123"
                />
              </div>
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="complement" className={styles.label}>Complemento</label>
                <input
                  type="text"
                  id="complement"
                  name="complement"
                  value={formData.complement}
                  onChange={handleChange}
                  className={styles.input}
                  placeholder="Apto, sala, etc."
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="neighborhood" className={styles.label}>Bairro</label>
                <input
                  type="text"
                  id="neighborhood"
                  name="neighborhood"
                  value={formData.neighborhood}
                  onChange={handleChange}
                  className={styles.input}
                  placeholder="Bairro"
                />
              </div>
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="city" className={styles.label}>Cidade</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className={styles.input}
                  placeholder="Cidade"
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="state" className={styles.label}>Estado</label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className={styles.input}
                  placeholder="SP"
                  maxLength={2}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="cep" className={styles.label}>CEP</label>
                <input
                  type="text"
                  id="cep"
                  name="cep"
                  value={formData.cep}
                  onChange={handleChange}
                  className={styles.input}
                  placeholder="00000-000"
                />
              </div>
            </div>
          </div>

          <button type="submit" className={styles.submitButton} disabled={isLoading}>
            {isLoading ? "Criando conta..." : "Criar Conta"}
          </button>
        </form>

        <div className={styles.loginSection}>
          <p className={styles.loginText}>Já tem conta?</p>
          <Link href="/conta/login" className={styles.loginButton}>
            Entrar
          </Link>
        </div>

        <p className={styles.terms}>
          Ao criar conta, você concorda com nossos Termos de Uso e Política de Privacidade.
        </p>
      </div>
    </div>
  );
}