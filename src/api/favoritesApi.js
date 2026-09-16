import request from './client';

export function getFavorites() {
  return request('/favorites', { auth: true });
}

export function addFavorite(propertyId) {
  return request('/favorites', { method: 'POST', body: { propertyId }, auth: true });
}

export function removeFavorite(propertyId) {
  return request(`/favorites/${propertyId}`, { method: 'DELETE', auth: true });
}