"use client";

import { useState } from "react";
import styles from "./clientes.module.css";

const mockUsers = [
  { id: 1, name: "Maria Silva", email: "maria@email.com", phone: "(11) 99999-1111", cpf: "123.456.789-00", created_at: "2024-01-10", street: "Rua ABC", number: "123", complement: "", neighborhood: "Centro", city: "São Paulo", state: "SP", cep: "01000-000" },
  { id: 2, name: "João Santos", email: "joao@email.com", phone: "(11) 99999-2222", cpf: "234.567.890-11", created_at: "2024-01-08", street: "Rua XYZ", number: "456", complement: "Apto 10", neighborhood: "Jardins", city: "São Paulo", state: "SP", cep: "02000-000" },
  { id: 3, name: "Ana Oliveira", email: "ana@email.com", phone: "(11) 99999-3333", cpf: "345.678.901-22", created_at: "2024-01-05", street: "Av. Paulista", number: "1000", complement: "", neighborhood: "Bela Vista", city: "São Paulo", state: "SP", cep: "03000-000" },
  { id: 4, name: "Carlos Souza", email: "carlos@email.com", phone: "(11) 99999-4444", cpf: "456.789.012-33", created_at: "2024-01-03", street: "Rua Augusta", number: "500", complement: "", neighborhood: "Consolação", city: "São Paulo", state: "SP", cep: "04000-000" },
  { id: 5, name: "Pedro Alves", email: "pedro@email.com", phone: "(11) 99999-5555", cpf: "567.890.123-44", created_at: "2024-01-01", street: "Rua Harlay", number: "200", complement: "", neighborhood: "Pinheiros", city: "São Paulo", state: "SP", cep: "05000-000" },
];

export default function ClientesPage() {
  const [users, setUsers] = useState(mockUsers);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [isNewUser, setIsNewUser] = useState(false);
  const [formData, setFormData] = useState({ 
    name: "", 
    email: "", 
    phone: "", 
    cpf: "",
    street: "",
    number: "",
    complement: "",
    neighborhood: "",
    city: "",
    state: "",
    cep: ""
  });

  const getInitials = (name: string) => name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
  const formatDate = (dateString: string) => dateString ? new Date(dateString).toLocaleDateString("pt-BR") : "-";

  const filteredUsers = users.filter(u => !search || u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()));

  const openNewUserModal = () => {
    setIsNewUser(true);
    setSelectedUser({ id: Date.now() });
    setFormData({
      name: "",
      email: "",
      phone: "",
      cpf: "",
      street: "",
      number: "",
      complement: "",
      neighborhood: "",
      city: "",
      state: "",
      cep: ""
    });
    setShowModal(true);
  };

  const openEditModal = (user: any) => {
    setSelectedUser(user);
    setFormData({ 
      name: user.name, 
      email: user.email, 
      phone: user.phone || "", 
      cpf: user.cpf || "",
      street: user.street || "",
      number: user.number || "",
      complement: user.complement || "",
      neighborhood: user.neighborhood || "",
      city: user.city || "",
      state: user.state || "",
      cep: user.cep || ""
    });
    setShowModal(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (isNewUser) {
      const newUser = {
        ...formData,
        id: Date.now(),
        created_at: new Date().toISOString().split("T")[0]
      };
      setUsers([newUser, ...users]);
    } else {
      setUsers(users.map(u => u.id === selectedUser.id ? { ...u, ...formData } : u));
    }
    setShowModal(false);
  };

  const handleDelete = () => {
    if (!confirm("Tem certeza que deseja excluir este cliente?")) return;
    setUsers(users.filter(u => u.id !== selectedUser.id));
    setShowModal(false);
  };

  const closeModal = () => {
    setShowModal(false);
    setIsNewUser(false);
    setSelectedUser(null);
  };

  return (
    <div className={styles.page}>
      <div className={styles.toolbar}>
        <div className={styles.searchFilters}>
          <div className={styles.searchInput}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
            <input type="text" placeholder="Buscar clientes..." value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
        </div>
        <button className={styles.addBtn} onClick={openNewUserModal}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
          Novo Cliente
        </button>
      </div>

      <div className={styles.tableCard}>
        <table className={styles.table}>
          <thead>
            <tr><th>Cliente</th><th>Email</th><th>Telefone</th><th>CPF</th><th>Cadastro</th><th>Ações</th></tr>
          </thead>
          <tbody>
            {filteredUsers.map(user => (
              <tr key={user.id}>
                <td>
                  <div className={styles.customerCell}>
                    <div className={styles.avatar}>{getInitials(user.name)}</div>
                    <div className={styles.customerInfo}><span className={styles.customerName}>{user.name}</span></div>
                  </div>
                </td>
                <td className={styles.email}>{user.email}</td>
                <td>{user.phone || "-"}</td>
                <td>{user.cpf || "-"}</td>
                <td>{formatDate(user.created_at)}</td>
                <td>
                  <button className={styles.actionBtn} onClick={() => openEditModal(user)}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && selectedUser && (
        <div className={styles.modal} onClick={closeModal}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h2 className={styles.modalTitle}>{isNewUser ? "Novo Cliente" : "Editar Cliente"}</h2>
              <button className={styles.modalClose} onClick={closeModal}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
              </button>
            </div>
            <form onSubmit={handleSave}>
              <div className={styles.modalBody}>
                <div className={styles.formSection}>
                  <h4 className={styles.formSectionTitle}>Dados Pessoais</h4>
                  <div className={styles.formGrid}>
                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>Nome Completo</label>
                      <input type="text" className={styles.formInput} value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
                    </div>
                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>Email</label>
                      <input type="email" className={styles.formInput} value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
                    </div>
                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>Telefone</label>
                      <input type="text" className={styles.formInput} value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} placeholder="(11) 99999-9999" />
                    </div>
                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>CPF</label>
                      <input type="text" className={styles.formInput} value={formData.cpf} onChange={(e) => setFormData({ ...formData, cpf: e.target.value })} placeholder="000.000.000-00" />
                    </div>
                  </div>
                </div>
                <div className={styles.formSection}>
                  <h4 className={styles.formSectionTitle}>Endereço</h4>
                  <div className={styles.formGrid}>
                    <div className={styles.formGroup} style={{ flex: 2 }}>
                      <label className={styles.formLabel}>Rua</label>
                      <input type="text" className={styles.formInput} value={formData.street} onChange={(e) => setFormData({ ...formData, street: e.target.value })} />
                    </div>
                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>Número</label>
                      <input type="text" className={styles.formInput} value={formData.number} onChange={(e) => setFormData({ ...formData, number: e.target.value })} />
                    </div>
                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>Complemento</label>
                      <input type="text" className={styles.formInput} value={formData.complement} onChange={(e) => setFormData({ ...formData, complement: e.target.value })} />
                    </div>
                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>Bairro</label>
                      <input type="text" className={styles.formInput} value={formData.neighborhood} onChange={(e) => setFormData({ ...formData, neighborhood: e.target.value })} />
                    </div>
                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>Cidade</label>
                      <input type="text" className={styles.formInput} value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })} />
                    </div>
                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>Estado</label>
                      <input type="text" className={styles.formInput} value={formData.state} onChange={(e) => setFormData({ ...formData, state: e.target.value })} placeholder="SP" maxLength={2} />
                    </div>
                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>CEP</label>
                      <input type="text" className={styles.formInput} value={formData.cep} onChange={(e) => setFormData({ ...formData, cep: e.target.value })} placeholder="00000-000" />
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.modalFooter}>
                {!isNewUser && (
                  <button type="button" className={styles.deleteBtn} onClick={handleDelete}>Excluir</button>
                )}
                <div style={{ display: "flex", gap: "12px", flex: 1, justifyContent: "flex-end" }}>
                  <button type="button" className={styles.btnSecondary} onClick={closeModal}>Cancelar</button>
                  <button type="submit" className={styles.btnPrimary}>{isNewUser ? "Cadastrar" : "Salvar"}</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
