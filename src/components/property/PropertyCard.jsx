import { Link } from 'react-router-dom';
import { formatPrice } from '../../utils/formatPrice';
import FavoriteButton from '../favorites/FavoriteButton';
import { useCompare } from '../../context/CompareContext';
import { useAuth } from '../../context/AuthContext';
import AdminControls from '../admin/AdminControls';
import './PropertyCard.css';

export default function PropertyCard({ property }) {
  const { id, title, city, locality, bhk, price, areaSqft, status, images } = property;
  const { isComparing, toggleCompare, compareIds, maxCompare } = useCompare();
  const { isAdmin } = useAuth();
  const checked = isComparing(id);
  const disabled = !checked && compareIds.length >= maxCompare;

  return (
    <Link to={`/listings/${id}`} className="pcard">
      <div className="pcard__image-wrap">
        <img src={images[0]} alt={title} className="pcard__image" />
        {status === 'SOLD' && <span className="pcard__badge">Sold</span>}

        {isAdmin ? (
          <div className="pcard__admin">
            <AdminControls property={property} />
          </div>
        ) : (
          <div className="pcard__fav">
            <FavoriteButton propertyId={id} size="sm" />
          </div>
        )}

        <label
          className={`pcard__compare ${disabled ? 'pcard__compare--disabled' : ''}`}
          onClick={(e) => e.stopPropagation()}
        >
          <input
            type="checkbox"
            checked={checked}
            disabled={disabled}
            onChange={(e) => {
              e.preventDefault();
              toggleCompare(id);
            }}
          />
          Compare
        </label>
      </div>
      <div className="pcard__body">
        <p className="pcard__price">{formatPrice(price)}</p>
        <h3 className="pcard__title">{title}</h3>
        <p className="pcard__location">
          {locality}, {city}
        </p>
        <div className="pcard__meta">
          {bhk > 0 && <span>{bhk} BHK</span>}
          <span>{areaSqft.toLocaleString('en-IN')} sq.ft</span>
        </div>
      </div>
    </Link>
  );
}