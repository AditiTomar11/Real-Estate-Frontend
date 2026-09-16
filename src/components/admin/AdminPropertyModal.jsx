import { useEffect, useState } from 'react';
import { useAdminModal } from '../../context/AdminModalContext';
import { useProperties } from '../../context/PropertiesContext';
import './AdminPropertyModal.css';
import { uploadImages } from '../../api/uploadApi';

const EMPTY_FORM = {
  title: '',
  city: '',
  locality: '',
  type: 'RESIDENTIAL',
  bhk: 0,
  price: '',
  areaSqft: '',
  status: 'AVAILABLE',
  description: '',
  images: [],
};

export default function AdminPropertyModal() {
  const { mode, close } = useAdminModal();
  const { addProperty, updateProperty } = useProperties();
  const [form, setForm] = useState(EMPTY_FORM);

  const isEdit = mode?.type === 'edit';

  useEffect(() => {
    if (mode?.type === 'edit') {
      setForm({ ...EMPTY_FORM, ...mode.property });
    } else if (mode?.type === 'add') {
      setForm(EMPTY_FORM);
    }
  }, [mode]);

  useEffect(() => {
    function handleKey(e) {
      if (e.key === 'Escape') close();
    }
    if (mode) {
      window.addEventListener('keydown', handleKey);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [mode, close]);

  if (!mode) return null;

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleImageUpload(e) {
  const files = Array.from(e.target.files);
  try {
    const urls = await uploadImages(files);
    setForm((prev) => ({ ...prev, images: [...prev.images, ...urls] }));
  } catch (err) {
    alert('Image upload failed. Try again.');
  }
  e.target.value = '';
}

  function removeImage(index) {
    setForm((prev) => ({ ...prev, images: prev.images.filter((_, i) => i !== index) }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const payload = {
      ...form,
      bhk: Number(form.bhk),
      price: Number(form.price),
      areaSqft: Number(form.areaSqft),
    };

    if (isEdit) {
      updateProperty(mode.property.id, payload);
    } else {
      addProperty(payload);
    }
    close();
  }

  function handleBackdropClick(e) {
    if (e.target === e.currentTarget) close();
  }

  return (
    <div className="admin-modal-backdrop" onClick={handleBackdropClick}>
      <div className="admin-modal-card">
        <button type="button" className="admin-modal-close" aria-label="Close" onClick={close}>
          ×
        </button>
        <h2 className="admin-modal-title">{isEdit ? 'Edit property' : 'Add property'}</h2>

        <form className="admin-form" onSubmit={handleSubmit}>
          <label>
            Title
            <input type="text" name="title" value={form.title} onChange={handleChange} required />
          </label>

          <div className="admin-form__row">
            <label>
              City
              <input type="text" name="city" value={form.city} onChange={handleChange} required />
            </label>
            <label>
              Locality
              <input type="text" name="locality" value={form.locality} onChange={handleChange} required />
            </label>
          </div>

          <div className="admin-form__row">
            <label>
              Type
              <select name="type" value={form.type} onChange={handleChange}>
                <option value="RESIDENTIAL">Residential</option>
                <option value="COMMERCIAL">Commercial</option>
              </select>
            </label>
            <label>
              BHK (0 for plots/commercial)
              <input type="number" name="bhk" min="0" max="6" value={form.bhk} onChange={handleChange} />
            </label>
          </div>

          <div className="admin-form__row">
            <label>
              Price (₹)
              <input type="number" name="price" min="0" value={form.price} onChange={handleChange} required />
            </label>
            <label>
              Area (sq.ft)
              <input
                type="number"
                name="areaSqft"
                min="0"
                value={form.areaSqft}
                onChange={handleChange}
                required
              />
            </label>
          </div>

          <label>
            Status
            <select name="status" value={form.status} onChange={handleChange}>
              <option value="AVAILABLE">Available</option>
              <option value="SOLD">Sold</option>
            </select>
          </label>

          <label>
            Description
            <textarea name="description" rows={4} value={form.description} onChange={handleChange} />
          </label>

          <label>
            Images
            <input type="file" accept="image/*" multiple onChange={handleImageUpload} />
          </label>

          {form.images.length > 0 && (
            <div className="admin-form__thumbs">
              {form.images.map((src, i) => (
                <div key={i} className="admin-form__thumb">
                  <img src={src} alt={`Upload ${i + 1}`} />
                  <button type="button" onClick={() => removeImage(i)} aria-label="Remove image">
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="admin-form__actions">
            <button type="button" className="btn btn-outline" onClick={close}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {isEdit ? 'Save changes' : 'Add property'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}