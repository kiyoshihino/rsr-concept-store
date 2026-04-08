"use client";

import { useState } from "react";
import styles from "./categorias.module.css";

interface Category { id: string; name: string; slug: string; image: string; }

export default function AdminCategories() {
  const [categories, setCategories] = useState<Category[]>([
    { id: "1", name: "Vestuário", slug: "vestuario", image: "" },
    { id: "2", name: "Acessórios", slug: "acessorios", image: "" },
    { id: "3", name: "Decoração", slug: "decoracao", image: "" },
    { id: "4", name: "Kits", slug: "kits", image: "" },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [newCategory, setNewCategory] = useState({ name: "", slug: "", image: "" });
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleImageUpload = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: formData });
    const data = await res.json();
    return data.url;
  };

  const handleAdd = async () => {
    if (!newCategory.name || !newCategory.slug) return;
    
    let imageUrl = newCategory.image;
    if (imageFile) {
      imageUrl = await handleImageUpload(imageFile);
    }
    
    setCategories([...categories, { ...newCategory, image: imageUrl, id: Date.now().toString() }]);
    setNewCategory({ name: "", slug: "", image: "" });
    setImageFile(null);
    setShowModal(false);
  };

  const handleDelete = (id: string) => {
    if (!confirm("Excluir esta categoria?")) return;
    setCategories(categories.filter(c => c.id !== id));
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Categorias</h1>
          <p className={styles.subtitle}>{categories.length} categorias</p>
        </div>
        <button className={styles.addButton} onClick={() => setShowModal(true)}>+ Nova Categoria</button>
      </div>

      <div className={styles.grid}>
        {categories.map((category) => (
          <div key={category.id} className={styles.card}>
            {category.image && <img src={category.image} alt={category.name} style={{width: "100%", height: "120px", objectFit: "cover", borderRadius: "8px", marginBottom: "12px"}} />}
            <div className={styles.cardIcon}>◉</div>
            <h3 className={styles.cardName}>{category.name}</h3>
            <p className={styles.cardSlug}>/{category.slug}</p>
            <button className={styles.deleteBtn} onClick={() => handleDelete(category.id)}>Excluir</button>
          </div>
        ))}
      </div>

      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <h2>Nova Categoria</h2>
              <button className={styles.closeBtn} onClick={() => setShowModal(false)}>✕</button>
            </div>
            <div className={styles.modalBody}>
              <div className={styles.formGroup}>
                <label>Nome</label>
                <input type="text" value={newCategory.name} onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })} placeholder="Ex: Vestuário" />
              </div>
              <div className={styles.formGroup}>
                <label>Slug (URL)</label>
                <input type="text" value={newCategory.slug} onChange={(e) => setNewCategory({ ...newCategory, slug: e.target.value })} placeholder="Ex: vestuario" />
              </div>
              <div className={styles.formGroup}>
                <label>Imagem da Categoria</label>
                <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files?.[0] || null)} />
              </div>
            </div>
            <div className={styles.modalFooter}>
              <button className={styles.cancelBtn} onClick={() => setShowModal(false)}>Cancelar</button>
              <button className={styles.saveBtn} onClick={handleAdd}>Salvar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}