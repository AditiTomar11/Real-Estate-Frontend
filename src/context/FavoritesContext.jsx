import { createContext, useContext, useEffect, useState } from 'react';
import * as favoritesApi from '../api/favoritesApi';
import { useAuth } from './AuthContext';

const FavoritesContext = createContext(null);

export function FavoritesProvider({ children }) {
  const { isAuthenticated } = useAuth();
  const [favoriteIds, setFavoriteIds] = useState([]);

  useEffect(() => {
    if (isAuthenticated) {
      favoritesApi.getFavorites().then((props) => {
        setFavoriteIds(props.map((p) => p.id));
      });
    } else {
      setFavoriteIds([]); // logged out — clear local favorites
    }
  }, [isAuthenticated]);

  async function toggleFavorite(propertyId) {
    if (!isAuthenticated) return; // caller should prompt login instead

    const isFav = favoriteIds.includes(propertyId);
    if (isFav) {
      await favoritesApi.removeFavorite(propertyId);
      setFavoriteIds((prev) => prev.filter((id) => id !== propertyId));
    } else {
      await favoritesApi.addFavorite(propertyId);
      setFavoriteIds((prev) => [...prev, propertyId]);
    }
  }

  function isFavorite(propertyId) {
    return favoriteIds.includes(propertyId);
  }

  return (
    <FavoritesContext.Provider value={{ favoriteIds, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error('useFavorites must be used inside a FavoritesProvider');
  return ctx;
}