"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import styles from "./page.module.css";

export default function ProfilePage() {
  const { user, updateProfile, isLoading } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    cpf: user?.cpf || "",
    birthDate: user?.birthDate || ""
  });
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateProfile(formData);
    setSuccessMessage("Perfil atualizado com sucesso!");
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  return (
    <div className={styles.profile}>
      <div className={styles.header}>
        <h1 className={styles.title}>Meu Perfil</h1>
        <p className={styles.subtitle}>Gerencie suas informações pessoais</p>
      </div>

      {successMessage && (
        <div className={styles.successMessage}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
          {successMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.avatarSection}>
          <div className={styles.avatar}>
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <div className={styles.avatarInfo}>
            <span className={styles.avatarName}>{user?.name}</span>
            <span className={styles.avatarEmail}>{user?.email}</span>
          </div>
        </div>

        <div className={styles.formGrid}>
          <div className={styles.formGroup}>
            <label htmlFor="name" className={styles.label}>Nome Completo</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={styles.input}
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
              required
            />
          </div>

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

          <div className={styles.formGroup}>
            <label htmlFor="birthDate" className={styles.label}>Data de Nascimento</label>
            <input
              type="date"
              id="birthDate"
              name="birthDate"
              value={formData.birthDate}
              onChange={handleChange}
              className={styles.input}
            />
          </div>
        </div>

        <div className={styles.formActions}>
          <button type="submit" className={styles.submitButton} disabled={isLoading}>
            {isLoading ? "Salvando..." : "Salvar Alterações"}
          </button>
        </div>
      </form>

      <div className={styles.dangerZone}>
        <h3 className={styles.dangerTitle}>Zona de Perigo</h3>
        <p className={styles.dangerText}>Uma vez que você	delete sua conta, não há volta. Por favor, tenha certeza.</p>
        <button className={styles.deleteButton}>Excluir Minha Conta</button>
      </div>
    </div>
  );
}