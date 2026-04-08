"use client";

import { useEffect, useState } from "react";
import styles from "./produtos.module.css";

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  stock: number;
  is_featured: boolean;
  description?: string;
}

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => { fetchProducts(); }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/products");
      const data = await res.json();
      setProducts(data.products || []);
    } catch (error) { console.error("Error:", error); }
    finally { setLoading(false); }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Excluir este produto?")) return;
    try {
      await fetch(`/api/admin/products/${id}`, { method: "DELETE" });
      fetchProducts();
    } catch (error) { console.error("Error:", error); }
  };

  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleImageUpload = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: formData });
    const data = await res.json();
    if (data.error) {
      throw new Error(data.error);
    }
    return data.url;
  };

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    let imageUrl = "";
    if (imageFile) {
      try {
        imageUrl = await handleImageUpload(imageFile);
      } catch (error) {
        console.error("Erro no upload:", error);
        alert("Erro ao fazer upload da imagem");
        return;
      }
    }

    const productData = {
      name: formData.get("name"),
      price: parseFloat(formData.get("price") as string),
      category: formData.get("category"),
      description: formData.get("description"),
      image: imageUrl,
      stock: parseInt(formData.get("stock") as string),
      is_featured: formData.get("is_featured") === "on",
    };
    try {
      const url = editingProduct ? `/api/admin/products/${editingProduct.id}` : "/api/admin/products";
      const method = editingProduct ? "PUT" : "POST";
      await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(productData) });
      setShowModal(false);
      setEditingProduct(null);
      setImageFile(null);
      fetchProducts();
    } catch (error) { console.error("Error:", error); }
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className={styles.loading}>Carregando...</div>;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Produtos</h1>
          <p className={styles.subtitle}>{products.length} itens no catálogo</p>
        </div>
        <div className={styles.headerActions}>
          <div className={styles.searchBox}>
            <span className={styles.searchIcon}>⌕</span>
            <input type="text" placeholder="Buscar produtos..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          </div>
          <button className={styles.addButton} onClick={() => { setEditingProduct(null); setShowModal(true); }}>
            + Adicionar
          </button>
        </div>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th style={{ width: 80 }}>Imagem</th>
              <th>Produto</th>
              <th>Categoria</th>
              <th>Preço</th>
              <th>Estoque</th>
              <th style={{ width: 140 }}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product.id}>
                <td><img src={product.image || "/banner/Decoração.png"} alt={product.name} className={styles.productImage} /></td>
                <td>
                  <div className={styles.productInfo}>
                    <span className={styles.productName}>{product.name}</span>
                    {product.is_featured && <span className={styles.featuredBadge}>Destaque</span>}
                  </div>
                </td>
                <td><span className={styles.categoryTag}>{product.category}</span></td>
                <td className={styles.price}>R$ {product.price.toFixed(2)}</td>
                <td><span className={styles.stock}>{product.stock} un</span></td>
                <td>
                  <div className={styles.actionButtons}>
                    <button className={styles.editBtn} onClick={() => { setEditingProduct(product); setShowModal(true); }}>Editar</button>
                    <button className={styles.deleteBtn} onClick={() => handleDelete(product.id)}>✕</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <h2>{editingProduct ? "Editar Produto" : "Novo Produto"}</h2>
              <button className={styles.closeBtn} onClick={() => { setShowModal(false); setEditingProduct(null); }}>✕</button>
            </div>
            <form onSubmit={handleSave}>
              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label>Nome</label>
                  <input type="text" name="name" defaultValue={editingProduct?.name} required />
                </div>
                <div className={styles.formGroup}>
                  <label>Categoria</label>
                  <select name="category" defaultValue={editingProduct?.category || "Vestuário"}>
                    <option value="Vestuário">Vestuário</option>
                    <option value="Acessórios">Acessórios</option>
                    <option value="Decoração">Decoração</option>
                    <option value="Kits">Kits</option>
                  </select>
                </div>
                <div className={styles.formGroup}>
                  <label>Preço (R$)</label>
                  <input type="number" name="price" step="0.01" defaultValue={editingProduct?.price} required />
                </div>
                <div className={styles.formGroup}>
                  <label>Estoque</label>
                  <input type="number" name="stock" defaultValue={editingProduct?.stock || 0} required />
                </div>
              </div>
              <div className={styles.formGroup}>
                <label>Imagem do Produto</label>
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                  style={{ display: "block", width: "100%", padding: "12px", border: "1px solid #EAEAEA", borderRadius: "10px" }}
                />
                {editingProduct?.image && (
                  <img src={editingProduct.image} alt="Preview" style={{ width: "80px", marginTop: "10px", borderRadius: "8px" }} />
                )}
              </div>
              <div className={styles.formGroup}>
                <label>Descrição</label>
                <textarea name="description" defaultValue={editingProduct?.description} rows={2} />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.checkbox}>
                  <input type="checkbox" name="is_featured" defaultChecked={editingProduct?.is_featured} />
                  <span>Produto em destaque</span>
                </label>
              </div>
              <div className={styles.modalFooter}>
                <button type="button" className={styles.cancelBtn} onClick={() => { setShowModal(false); setEditingProduct(null); }}>Cancelar</button>
                <button type="submit" className={styles.saveBtn}>Salvar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}