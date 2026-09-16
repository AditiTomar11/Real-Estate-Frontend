import { useEffect, useState } from 'react';
import * as trendingProjectApi from '../../api/trendingProjectApi';
import '../admin/AdminPropertyModal.css';

const EMPTY_FORM = {
  name: '', builder: '', location: '', type: '', area: '', price: '',
  imageUrl: '', isNew: false, displayOrder: 0,
};

export default function TrendingProjectFormModal({ mode, onClose, onSaved }) {
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
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const payload = { ...form, displayOrder: Number(form.displayOrder) };
    try {
      const saved = isEdit
        ? await trendingProjectApi.updateTrendingProject(mode.item.id, payload)
        : await trendingProjectApi.createTrendingProject(payload);
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
        <h2 className="admin-modal-title">{isEdit ? 'Edit trending project' : 'Add trending project'}</h2>

        <form className="admin-form" onSubmit={handleSubmit}>
          <label>
            Project name
            <input type="text" name="name" value={form.name} onChange={handleChange} required />
          </label>
          <div className="admin-form__row">
            <label>
              Builder
              <input type="text" name="builder" value={form.builder} onChange={handleChange} required />
            </label>
            <label>
              Location
              <input type="text" name="location" value={form.location} onChange={handleChange} required />
            </label>
          </div>
          <div className="admin-form__row">
            <label>
              Type (e.g. 2, 3 & 4.5 BHK)
              <input type="text" name="type" value={form.type} onChange={handleChange} required />
            </label>
            <label>
              Area (e.g. 2678 SQ. FT.)
              <input type="text" name="area" value={form.area} onChange={handleChange} required />
            </label>
          </div>
          <label>
            Price range (e.g. ₹ 1.43 Cr - 3.02 Cr)
            <input type="text" name="price" value={form.price} onChange={handleChange} required />
          </label>
          <label>
            Image URL
            <input type="text" name="imageUrl" value={form.imageUrl} onChange={handleChange} required />
          </label>
          <div className="admin-form__row">
            <label style={{ flexDirection: 'row', alignItems: 'center', gap: '8px' }}>
              <input
                type="checkbox"
                name="isNew"
                checked={form.isNew}
                onChange={handleChange}
                style={{ width: 'auto' }}
              />
              Mark as "New launch"
            </label>
            <label>
              Display order
              <input type="number" name="displayOrder" value={form.displayOrder} onChange={handleChange} />
            </label>
          </div>

          <div className="admin-form__actions">
            <button type="button" className="btn btn-outline" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary">{isEdit ? 'Save changes' : 'Add project'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}