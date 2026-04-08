"use client";

import { useState } from "react";
import styles from "./banners.module.css";

interface Banner { id: string; title: string; subtitle: string; image: string; link: string; }

export default function AdminBanners() {
  const [banners, setBanners] = useState<Banner[]>([{ id: "1", title: "Nova Coleção", subtitle: "Crochê Artesanal", image: "/banner/Carrossel01.png", link: "/shop" }]);
  const [showModal, setShowModal] = useState(false);
  const [editingBanner, setEditingBanner] = useState<Banner | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({ title: "", subtitle: "", image: "", link: "" });

  const handleImageUpload = async (file: File): Promise<string> => {
    const formDataUpload = new FormData();
    formDataUpload.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: formDataUpload });
    const data = await res.json();
    return data.url;
  };

  const handleSave = async () => {
    if (!formData.title) return;

    let imageUrl = formData.image;
    if (imageFile) {
      imageUrl = await handleImageUpload(imageFile);
    }

    if (editingBanner) setBanners(banners.map(b => b.id === editingBanner.id ? { ...b, title: formData.title, subtitle: formData.subtitle, image: imageUrl, link: formData.link } : b));
    else setBanners([...banners, { ...formData, image: imageUrl, id: Date.now().toString() }]);
    setShowModal(false); setEditingBanner(null); setFormData({ title: "", subtitle: "", image: "", link: "" }); setImageFile(null);
  };

  const handleDelete = (id: string) => { if (confirm("Excluir este banner?")) setBanners(banners.filter(b => b.id !== id)); };
  const openEdit = (banner: Banner) => { setEditingBanner(banner); setFormData({ title: banner.title, subtitle: banner.subtitle, image: banner.image, link: banner.link }); setShowModal(true); };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div><h1 className={styles.title}>Banners</h1><p className={styles.subtitle}>{banners.length} banners configurados</p></div>
        <button className={styles.addButton} onClick={() => { setEditingBanner(null); setFormData({ title: "", subtitle: "", image: "", link: "" }); setImageFile(null); setShowModal(true); }}>+ Novo Banner</button>
      </div>
      <div className={styles.grid}>
        {banners.map(banner => (
          <div key={banner.id} className={styles.card}>
            <img src={banner.image} alt={banner.title} className={styles.bannerImg} />
            <div className={styles.cardBody}>
              <h3>{banner.title}</h3><p>{banner.subtitle}</p>
              <div className={styles.cardActions}>
                <button onClick={() => openEdit(banner)}>Editar</button><button onClick={() => handleDelete(banner.id)}>Excluir</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}><h2>{editingBanner ? "Editar Banner" : "Novo Banner"}</h2><button className={styles.closeBtn} onClick={() => setShowModal(false)}>✕</button></div>
            <div className={styles.modalBody}>
              <div className={styles.formGroup}><label>Título</label><input type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} placeholder="Ex: Nova Coleção" /></div>
              <div className={styles.formGroup}><label>Subtítulo</label><input type="text" value={formData.subtitle} onChange={e => setFormData({...formData, subtitle: e.target.value})} placeholder="Ex: Crochê Artesanal" /></div>
              <div className={styles.formGroup}>
                <label>Imagem do Banner</label>
                <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files?.[0] || null)} />
                {editingBanner?.image && !imageFile && <img src={editingBanner.image} alt="Preview" style={{maxWidth: "100px", marginTop: "8px"}} />}
              </div>
              <div className={styles.formGroup}><label>Link</label><input type="text" value={formData.link} onChange={e => setFormData({...formData, link: e.target.value})} placeholder="/shop" /></div>
            </div>
            <div className={styles.modalFooter}><button className={styles.cancelBtn} onClick={() => setShowModal(false)}>Cancelar</button><button className={styles.saveBtn} onClick={handleSave}>Salvar</button></div>
          </div>
        </div>
      )}
    </div>
  );
}