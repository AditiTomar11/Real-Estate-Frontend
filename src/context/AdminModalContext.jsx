import { createContext, useContext, useState } from 'react';

const AdminModalContext = createContext(null);

export function AdminModalProvider({ children }) {
  const [mode, setMode] = useState(null); // null | { type: 'add' } | { type: 'edit', property }

  const openAdd = () => setMode({ type: 'add' });
  const openEdit = (property) => setMode({ type: 'edit', property });
  const close = () => setMode(null);

  return (
    <AdminModalContext.Provider value={{ mode, openAdd, openEdit, close }}>
      {children}
    </AdminModalContext.Provider>
  );
}

export function useAdminModal() {
  const ctx = useContext(AdminModalContext);
  if (!ctx) {
    throw new Error('useAdminModal must be used inside an AdminModalProvider');
  }
  return ctx;
}