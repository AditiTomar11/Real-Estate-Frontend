import { useEffect, useState } from 'react';
import * as featuredCityApi from '../../api/featuredCityApi';
import '../admin/AdminPropertyModal.css';

const EMPTY_FORM = { name: '', optionsCount: '', imageUrl: '', displayOrder: 0 };

export default function FeaturedCityFormModal({ mode, onClose, onSaved }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const isEdit = mode?.type === 'edit';

  useEffect(() => {
    if (mode?.type === 'edit') setForm({ ...EMPTY_FORM, ...mode.item });
    else if (mode?.type === 'add') setForm(EMPTY_FORM);
  }, [mode]);

  useEffect(() => {
    function handleKey(e) {
      if (e.key === 'Escape') onClose();
    }
    if (mode) {
      window.addEventListener('keydown', handleKey);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [mode, onClose]);

  if (!mode) return null;

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const payload = { ...form, displayOrder: Number(form.displayOrder) };
    try {
      const saved = isEdit
        ? await featuredCityApi.updateFeaturedCity(mode.item.id, payload)
        : await featuredCityApi.createFeaturedCity(payload);
      onSaved(saved, isEdit);
      onClose();
    } catch (err) {
      alert(err.message || 'Failed to save');
    }
  }

  function handleBackdropClick(e) {
    if (e.target === e.currentTarget) onClose();
  }

  return (
    <div className="admin-modal-backdrop" onClick={handleBackdropClick}>
      <div className="admin-modal-card">
        <button type="button" className="admin-modal-close" aria-label="Close" onClick={onClose}>×</button>
        <h2 className="admin-modal-title">{isEdit ? 'Edit city' : 'Add featured city'}</h2>

        <form className="admin-form" onSubmit={handleSubmit}>
          <label>
            City name
            <input type="text" name="name" value={form.name} onChange={handleChange} required />
          </label>
          <label>
            Options count (e.g. 1225)
            <input type="text" name="optionsCount" value={form.optionsCount} onChange={handleChange} required />
          </label>
          <label>
            Image URL
            <input type="text" name="imageUrl" value={form.imageUrl} onChange={handleChange} required />
          </label>
          <label>
            Display order
            <input type="number" name="displayOrder" value={form.displayOrder} onChange={handleChange} />
          </label>

          <div className="admin-form__actions">
            <button type="button" className="btn btn-outline" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary">{isEdit ? 'Save changes' : 'Add city'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}