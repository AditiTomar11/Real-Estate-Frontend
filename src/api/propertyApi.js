import request from './client';

export function getProperties(filters = {}) {
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== '' && value !== null && value !== undefined) {
      params.set(key, value);
    }
  });
  const query = params.toString();
  return request(`/properties${query ? `?${query}` : ''}`);
}

export function getPropertyById(id) {
  return request(`/properties/${id}`);
}

export function compareProperties(ids) {
  return request('/properties/compare', { method: 'POST', body: { ids } });
}

export function createProperty(data) {
  return request('/properties', { method: 'POST', body: data, auth: true });
}

export function updateProperty(id, data) {
  return request(`/properties/${id}`, { method: 'PUT', body: data, auth: true });
}

export function deleteProperty(id) {
  return request(`/properties/${id}`, { method: 'DELETE', auth: true });
}