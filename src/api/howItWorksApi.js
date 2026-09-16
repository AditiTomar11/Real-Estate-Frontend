import request from './client';

export function getHowItWorksSteps() {
  return request('/how-it-works');
}
export function createHowItWorksStep(data) {
  return request('/how-it-works', { method: 'POST', body: data, auth: true });
}
export function updateHowItWorksStep(id, data) {
  return request(`/how-it-works/${id}`, { method: 'PUT', body: data, auth: true });
}
export function deleteHowItWorksStep(id) {
  return request(`/how-it-works/${id}`, { method: 'DELETE', auth: true });
}