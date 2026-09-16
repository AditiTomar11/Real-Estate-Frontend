import { useAdminModal } from '../../context/AdminModalContext';
import { useProperties } from '../../context/PropertiesContext';
import './AdminControls.css';

export default function AdminControls({ property, size = 'sm' }) {
  const { openEdit } = useAdminModal();
  const { deleteProperty } = useProperties();

  return (
    <div className={`admin-controls admin-controls--${size}`} onClick={(e) => e.stopPropagation()}>
      <button
        type="button"
        className="admin-controls__btn"
        aria-label="Edit property"
        onClick={(e) => {
          e.preventDefault();
          openEdit(property);
        }}
      >
        <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M4 20h4L18.5 9.5a2.1 2.1 0 0 0-3-3L5 17v3z" />
        </svg>
      </button>
      <button
        type="button"
        className="admin-controls__btn admin-controls__btn--danger"
        aria-label="Delete property"
        onClick={(e) => {
          e.preventDefault();
          if (window.confirm(`Delete "${property.title}"? This can't be undone.`)) {
            deleteProperty(property.id);
          }
        }}
      >
        <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M5 6h14M9 6V4h6v2m-8 0 1 14h8l1-14" />
        </svg>
      </button>
    </div>
  );
}