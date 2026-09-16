import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import * as enquiryApi from '../api/enquiryApi';
import { useAuth } from './AuthContext';

const EnquiriesContext = createContext(null);

// Talks to the real backend. Admins get every enquiry (/api/enquiries with an
// admin token); a logged-in user gets only the ones sent from their own email
// (/api/enquiries?email=...). Guests get nothing until they log in.
export function EnquiriesProvider({ children }) {
  const { user, isAdmin, isAuthenticated } = useAuth();
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const loadEnquiries = useCallback(async () => {
    if (!isAuthenticated) {
      setEnquiries([]);
      return;
    }

    setLoading(true);
    setError('');
    try {
      const data = isAdmin
        ? await enquiryApi.getAllEnquiries()
        : await enquiryApi.getEnquiriesByEmail(user.email);
      const list = Array.isArray(data) ? data : [];
      setEnquiries(
        [...list].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
      );
    } catch (err) {
      setError(err.message || 'Could not load enquiries');
      setEnquiries([]);
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated, isAdmin, user]);

  useEffect(() => {
    loadEnquiries();
  }, [loadEnquiries]);

  async function addReply(enquiryId, message) {
    const trimmed = message?.trim();
    if (!trimmed) return null;

    await enquiryApi.replyToEnquiry(enquiryId, trimmed);
    await loadEnquiries(); // refresh so the new reply and status show up
    return enquiries.find((item) => item.id === enquiryId) || null;
  }

  return (
    <EnquiriesContext.Provider
      value={{ enquiries, loading, error, loadEnquiries, addReply }}
    >
      {children}
    </EnquiriesContext.Provider>
  );
}

export function useEnquiries() {
  const ctx = useContext(EnquiriesContext);
  if (!ctx) throw new Error('useEnquiries must be used inside an EnquiriesProvider');
  return ctx;
}
