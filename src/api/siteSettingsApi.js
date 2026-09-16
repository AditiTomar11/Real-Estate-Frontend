import request from './client';

export function getSiteSettings() {
  return request('/site-settings');
}
export function updateSiteSettings(data) {
  return request('/site-settings', { method: 'PUT', body: data, auth: true });
}