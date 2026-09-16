import request from './client';

export function getWhyChooseUsItems() {
  return request('/why-choose-us');
}
export function createWhyChooseUsItem(data) {
  return request('/why-choose-us', { method: 'POST', body: data, auth: true });
}
export function updateWhyChooseUsItem(id, data) {
  return request(`/why-choose-us/${id}`, { method: 'PUT', body: data, auth: true });
}
export function deleteWhyChooseUsItem(id) {
  return request(`/why-choose-us/${id}`, { method: 'DELETE', auth: true });
}