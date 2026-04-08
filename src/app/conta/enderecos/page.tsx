"use client";

import { useState } from "react";
import { useAuth, Address } from "@/context/AuthContext";
import styles from "./page.module.css";

export default function AddressesPage() {
  const { addresses, addAddress, updateAddress, removeAddress, isLoading } = useAuth();
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    label: "",
    street: "",
    number: "",
    complement: "",
    neighborhood: "",
    city: "",
    state: "",
    cep: "",
    isDefault: false
  });

  const resetForm = () => {
    setFormData({
      label: "",
      street: "",
      number: "",
      complement: "",
      neighborhood: "",
      city: "",
      state: "",
      cep: "",
      isDefault: false
    });
    setIsAdding(false);
    setEditingId(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      await updateAddress(editingId, formData);
    } else {
      await addAddress(formData);
    }
    resetForm();
  };

  const handleEdit = (address: Address) => {
    setFormData({
      ...address,
      complement: address.complement || ""
    });
    setEditingId(address.id);
    setIsAdding(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Tem certeza que deseja excluir este endereço?")) {
      await removeAddress(id);
    }
  };

  const handleSetDefault = async (id: string) => {
    for (const addr of addresses) {
      if (addr.isDefault && addr.id !== id) {
        await updateAddress(addr.id, { isDefault: false });
      }
    }
    await updateAddress(id, { isDefault: true });
  };

  return (
    <div className={styles.addresses}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Meus Endereços</h1>
          <p className={styles.subtitle}>Gerencie seus endereços de entrega</p>
        </div>
        {!isAdding && (
          <button onClick={() => setIsAdding(true)} className={styles.addButton}>
            + Novo Endereço
          </button>
        )}
      </div>

      {isAdding && (
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formHeader}>
            <h2 className={styles.formTitle}>
              {editingId ? "Editar Endereço" : "Novo Endereço"}
            </h2>
            <button type="button" onClick={resetForm} className={styles.cancelButton}>
              Cancelar
            </button>
          </div>

          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label htmlFor="label" className={styles.label}>Nome do Endereço</label>
              <input
                type="text"
                id="label"
                name="label"
                value={formData.label}
                onChange={handleChange}
                className={styles.input}
                placeholder="Ex: Casa, Trabalho"
                required
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
                required
              />
            </div>

            <div className={styles.formGroupFull}>
              <label htmlFor="street" className={styles.label}>Rua/Avenida</label>
              <input
                type="text"
                id="street"
                name="street"
                value={formData.street}
                onChange={handleChange}
                className={styles.input}
                placeholder="Nome da rua"
                required
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
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="complement" className={styles.label}>Complemento</label>
              <input
                type="text"
                id="complement"
                name="complement"
                value={formData.complement}
                onChange={handleChange}
                className={styles.input}
                placeholder="Apto, Bloco, etc"
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
                placeholder="Nome do bairro"
                required
              />
            </div>

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
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="state" className={styles.label}>Estado</label>
              <select
                id="state"
                name="state"
                value={formData.state}
                onChange={handleChange}
                className={styles.input}
                required
              >
                <option value="">Selecione</option>
                <option value="AC">Acre</option>
                <option value="AL">Alagoas</option>
                <option value="AP">Amapá</option>
                <option value="AM">Amazonas</option>
                <option value="BA">Bahia</option>
                <option value="CE">Ceará</option>
                <option value="DF">Distrito Federal</option>
                <option value="ES">Espírito Santo</option>
                <option value="GO">Goiás</option>
                <option value="MA">Maranhão</option>
                <option value="MT">Mato Grosso</option>
                <option value="MS">Mato Grosso do Sul</option>
                <option value="MG">Minas Gerais</option>
                <option value="PA">Pará</option>
                <option value="PB">Paraíba</option>
                <option value="PR">Paraná</option>
                <option value="PE">Pernambuco</option>
                <option value="PI">Piauí</option>
                <option value="RJ">Rio de Janeiro</option>
                <option value="RN">Rio Grande do Norte</option>
                <option value="RS">Rio Grande do Sul</option>
                <option value="RO">Rondônia</option>
                <option value="RR">Roraima</option>
                <option value="SC">Santa Catarina</option>
                <option value="SP">São Paulo</option>
                <option value="SE">Sergipe</option>
                <option value="TO">Tocantins</option>
              </select>
            </div>

            <div className={styles.formGroupCheckbox}>
              <input
                type="checkbox"
                id="isDefault"
                name="isDefault"
                checked={formData.isDefault}
                onChange={handleChange}
                className={styles.checkbox}
              />
              <label htmlFor="isDefault" className={styles.checkboxLabel}>
                Definir como endereço principal
              </label>
            </div>
          </div>

          <div className={styles.formActions}>
            <button type="submit" className={styles.submitButton} disabled={isLoading}>
              {isLoading ? "Salvando..." : editingId ? "Atualizar Endereço" : "Adicionar Endereço"}
            </button>
          </div>
        </form>
      )}

      <div className={styles.addressList}>
        {addresses.length > 0 ? (
          addresses.map((address) => (
            <div key={address.id} className={`${styles.addressCard} ${address.isDefault ? styles.default : ""}`}>
              {address.isDefault && (
                <span className={styles.defaultBadge}>Principal</span>
              )}
              <div className={styles.addressContent}>
                <div className={styles.addressLabel}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                  {address.label}
                </div>
                <p className={styles.addressText}>
                  {address.street}, {address.number}
                  {address.complement && `, ${address.complement}`}
                </p>
                <p className={styles.addressText}>
                  {address.neighborhood} - {address.city}/{address.state}
                </p>
                <p className={styles.addressCep}>CEP: {address.cep}</p>
              </div>
              <div className={styles.addressActions}>
                {!address.isDefault && (
                  <button 
                    onClick={() => handleSetDefault(address.id)}
                    className={styles.defaultButton}
                  >
                    Definir Principal
                  </button>
                )}
                <button 
                  onClick={() => handleEdit(address)}
                  className={styles.editButton}
                >
                  Editar
                </button>
                <button 
                  onClick={() => handleDelete(address.id)}
                  className={styles.deleteButton}
                >
                  Excluir
                </button>
              </div>
            </div>
          ))
        ) : (
          !isAdding && (
            <div className={styles.emptyState}>
              <div className={styles.emptyIcon}>
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
              </div>
              <h3 className={styles.emptyTitle}>Nenhum endereço cadastrado</h3>
              <p className={styles.emptyText}>Adicione um endereço para facilitar suas compras.</p>
            </div>
          )
        )}
      </div>
    </div>
  );
}