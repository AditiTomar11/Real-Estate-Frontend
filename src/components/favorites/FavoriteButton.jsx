import { useFavorites } from '../../context/FavoritesContext';
import './FavoriteButton.css';

export default function FavoriteButton({ propertyId, size = 'md' }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const active = isFavorite(propertyId);

  return (
    <button
      type="button"
      className={`fav-btn fav-btn--${size} ${active ? 'fav-btn--active' : ''}`}
      aria-label={active ? 'Remove from favorites' : 'Save to favorites'}
      aria-pressed={active}
      onClick={(e) => {
        e.preventDefault(); // stop the click bubbling into a Link when used on a card
        e.stopPropagation();
        toggleFavorite(propertyId);
      }}
    >
      <svg viewBox="0 0 24 24" width="18" height="18">
        <path
          d="M12 20.5s-7.5-4.6-10-9.2C.4 8.1 1.8 4.5 5.2 3.6c2-.5 4 .3 5.2 2 .3.4.4.6.6 1 .2-.4.3-.6.6-1 1.2-1.7 3.2-2.5 5.2-2 3.4.9 4.8 4.5 3.2 7.7-2.5 4.6-10 9.2-10 9.2z"
          fill={active ? 'currentColor' : 'none'}
          stroke="currentColor"
          strokeWidth="1.6"
        />
      </svg>
    </button>
  );
}