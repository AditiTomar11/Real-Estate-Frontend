import request from './client';

export function getTrendingProjects() {
  return request('/trending-projects');
}
export function createTrendingProject(data) {
  return request('/trending-projects', { method: 'POST', body: data, auth: true });
}
export function updateTrendingProject(id, data) {
  return request(`/trending-projects/${id}`, { method: 'PUT', body: data, auth: true });
}
export function deleteTrendingProject(id) {
  return request(`/trending-projects/${id}`, { method: 'DELETE', auth: true });
}