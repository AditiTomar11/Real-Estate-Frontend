import request from './client';

export function getTestimonials() {
  return request('/testimonials');
}
export function createTestimonial(data) {
  return request('/testimonials', { method: 'POST', body: data, auth: true });
}
export function updateTestimonial(id, data) {
  return request(`/testimonials/${id}`, { method: 'PUT', body: data, auth: true });
}
export function deleteTestimonial(id) {
  return request(`/testimonials/${id}`, { method: 'DELETE', auth: true });
}