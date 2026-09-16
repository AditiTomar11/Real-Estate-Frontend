import request from './client';

export function getFeaturedCities() {
  return request('/featured-cities');
}
export function createFeaturedCity(data) {
  return request('/featured-cities', { method: 'POST', body: data, auth: true });
}
export function updateFeaturedCity(id, data) {
  return request(`/featured-cities/${id}`, { method: 'PUT', body: data, auth: true });
}
export function deleteFeaturedCity(id) {
  return request(`/featured-cities/${id}`, { method: 'DELETE', auth: true });
}