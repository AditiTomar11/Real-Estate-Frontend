import { useEffect, useState } from 'react';
import * as testimonialApi from '../../api/testimonialApi';
import '../admin/AdminPropertyModal.css';

const EMPTY_FORM = { name: '', role: '', avatarUrl: '', quote: '', rating: 5, displayOrder: 0 };

export default function TestimonialFormModal({ mode, onClose, onSaved }) {
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
    const payload = { ...form, rating: Number(form.rating), displayOrder: Number(form.displayOrder) };
    try {
      const saved = isEdit
        ? await testimonialApi.updateTestimonial(mode.item.id, payload)
        : await testimonialApi.createTestimonial(payload);
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
        <h2 className="admin-modal-title">{isEdit ? 'Edit testimonial' : 'Add testimonial'}</h2>

        <form className="admin-form" onSubmit={handleSubmit}>
          <div className="admin-form__row">
            <label>
              Name
              <input type="text" name="name" value={form.name} onChange={handleChange} required />
            </label>
            <label>
              Role (e.g. Bought a 3BHK in Bangalore)
              <input type="text" name="role" value={form.role} onChange={handleChange} required />
            </label>
          </div>
          <label>
            Avatar image URL
            <input type="text" name="avatarUrl" value={form.avatarUrl} onChange={handleChange} required />
          </label>
          <label>
            Quote
            <textarea name="quote" rows={3} value={form.quote} onChange={handleChange} required />
          </label>
          <div className="admin-form__row">
            <label>
              Rating (1-5)
              <input type="number" name="rating" min="1" max="5" value={form.rating} onChange={handleChange} />
            </label>
            <label>
              Display order
              <input type="number" name="displayOrder" value={form.displayOrder} onChange={handleChange} />
            </label>
          </div>

          <div className="admin-form__actions">
            <button type="button" className="btn btn-outline" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary">{isEdit ? 'Save changes' : 'Add testimonial'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}