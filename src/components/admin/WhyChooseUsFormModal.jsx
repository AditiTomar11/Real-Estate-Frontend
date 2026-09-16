import { useEffect, useState } from 'react';
import * as whyChooseUsApi from '../../api/whyChooseUsApi';
import '../admin/AdminPropertyModal.css';

const EMPTY_FORM = { icon: '', title: '', description: '', displayOrder: 0 };

export default function WhyChooseUsFormModal({ mode, onClose, onSaved }) {
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
        ? await whyChooseUsApi.updateWhyChooseUsItem(mode.item.id, payload)
        : await whyChooseUsApi.createWhyChooseUsItem(payload);
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
        <h2 className="admin-modal-title">{isEdit ? 'Edit item' : 'Add "Why Choose Us" item'}</h2>

        <form className="admin-form" onSubmit={handleSubmit}>
          <label>
            Icon (emoji, e.g. 🏠)
            <input type="text" name="icon" value={form.icon} onChange={handleChange} required />
          </label>
          <label>
            Title
            <input type="text" name="title" value={form.title} onChange={handleChange} required />
          </label>
          <label>
            Description
            <textarea name="description" rows={3} value={form.description} onChange={handleChange} required />
          </label>
          <label>
            Display order
            <input type="number" name="displayOrder" value={form.displayOrder} onChange={handleChange} />
          </label>

          <div className="admin-form__actions">
            <button type="button" className="btn btn-outline" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary">{isEdit ? 'Save changes' : 'Add item'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}