import request from './client';

// Public — anyone can submit an enquiry, logged in or not.
export function submitEnquiry(data) {
  return request('/enquiries', { method: 'POST', body: data });
}

// Admin inbox — returns every enquiry with its replies. Requires an admin token.
export function getAllEnquiries() {
  return request('/enquiries', { auth: true });
}

// Self-service lookup — a user sees only the enquiries sent from their email.
export function getEnquiriesByEmail(email) {
  return request(`/enquiries?email=${encodeURIComponent(email)}`);
}

export function getEnquiryById(id) {
  return request(`/enquiries/${id}`, { auth: true });
}

// Admin replies to an enquiry. The reply is stored in the DB.
export function replyToEnquiry(enquiryId, message) {
  return request(`/admin/enquiries/${enquiryId}/replies`, {
    method: 'POST',
    body: { message },
    auth: true,
  });
}
