const BASE_URL = import.meta.env.VITE_API_BASE_URL;

async function request(path, { method = 'GET', body, auth = false } = {}) {
  const headers = { 'Content-Type': 'application/json' };

  if (auth) {
    const token = localStorage.getItem('token');
    if (token) headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    const errorBody = await res.json().catch(() => ({}));
    throw new Error(errorBody.message || `Request failed: ${res.status}`);
  }

  // Several endpoints (enquiry submit, favourites add/remove, deletes) return a
  // success status with an empty body. Calling res.json() on an empty response
  // throws "Unexpected end of JSON input", so read as text and only parse if
  // there is something to parse.
  const responseText = await res.text();
  if (!responseText) return null;
  return JSON.parse(responseText);
}

export default request;
