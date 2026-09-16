import { createContext, useContext, useState } from 'react';

const AuthModalContext = createContext(null);

export function AuthModalProvider({ children }) {
  const [mode, setMode] = useState(null); // null | 'login' | 'register'

  function openLogin() {
    setMode('login');
  }

  function openRegister() {
    setMode('register');
  }

  function close() {
    setMode(null);
  }

  return (
    <AuthModalContext.Provider value={{ mode, openLogin, openRegister, close }}>
      {children}
    </AuthModalContext.Provider>
  );
}

export function useAuthModal() {
  const ctx = useContext(AuthModalContext);
  if (!ctx) {
    throw new Error('useAuthModal must be used inside an AuthModalProvider');
  }
  return ctx;
}