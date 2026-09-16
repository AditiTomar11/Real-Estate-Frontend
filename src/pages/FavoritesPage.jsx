import { Link } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';
import { useProperties } from '../context/PropertiesContext';
import PropertyGrid from '../components/property/PropertyGrid';
import './FavoritesPage.css';


export default function FavoritesPage() {
  const { favoriteIds } = useFavorites();
  const { properties } = useProperties();
  const saved = properties.filter((p) => favoriteIds.includes(p.id));

  return (
    <div className="container favorites-page">
      <h1>Saved properties</h1>
      <p className="favorites-page__count">{saved.length} saved</p>

      {saved.length === 0 ? (
        <div className="favorites-page__empty">
          <p>Nothing saved yet. Tap the heart on any listing to keep it here.</p>
          <Link to="/listings" className="btn btn-gold">
            Browse listings
          </Link>
        </div>
      ) : (
        <PropertyGrid properties={saved} />
      )}
    </div>
  );
}