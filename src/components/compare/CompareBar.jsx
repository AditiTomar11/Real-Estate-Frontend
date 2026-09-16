import { useNavigate } from 'react-router-dom';
import { useCompare } from '../../context/CompareContext';
import './CompareBar.css';
import { useProperties } from '../../context/PropertiesContext';

export default function CompareBar() {
  const { compareIds, toggleCompare, clearCompare } = useCompare();
  const navigate = useNavigate();
  const { properties } = useProperties();

  if (compareIds.length === 0) return null;

  const selected = properties.filter((p) => compareIds.includes(p.id));

  return (
    <div className="comparebar">
      <div className="container comparebar__row">
        <div className="comparebar__thumbs">
          {selected.map((p) => (
            <div key={p.id} className="comparebar__thumb">
              <img src={p.images[0]} alt={p.title} />
              <button
                type="button"
                className="comparebar__remove"
                aria-label={`Remove ${p.title} from compare`}
                onClick={() => toggleCompare(p.id)}
              >
                ×
              </button>
            </div>
          ))}
        </div>
        <div className="comparebar__actions">
          <button type="button" className="comparebar__clear" onClick={clearCompare}>
            Clear
          </button>
          <button
            type="button"
            className="btn btn-gold"
            disabled={selected.length < 2}
            onClick={() => navigate('/compare')}
          >
            Compare ({selected.length})
          </button>
        </div>
      </div>
    </div>
  );
}