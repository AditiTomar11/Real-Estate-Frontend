import './SectionAdminControls.css';

export default function SectionAdminControls({ onEdit, onDelete, itemLabel }) {
  return (
    <div className="sac" onClick={(e) => e.stopPropagation()}>
      <button type="button" className="sac__btn" aria-label="Edit" onClick={onEdit}>
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M4 20h4L18.5 9.5a2.1 2.1 0 0 0-3-3L5 17v3z" />
        </svg>
      </button>
      <button
        type="button"
        className="sac__btn sac__btn--danger"
        aria-label="Delete"
        onClick={() => {
          if (window.confirm(`Delete "${itemLabel}"? This can't be undone.`)) {
            onDelete();
          }
        }}
      >
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M5 6h14M9 6V4h6v2m-8 0 1 14h8l1-14" />
        </svg>
      </button>
    </div>
  );
}