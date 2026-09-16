import { useEffect } from 'react';
import { useAuthModal } from '../../context/AuthModalContext';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import './AuthModal.css';

export default function AuthModal() {
  const { mode, close } = useAuthModal();

  useEffect(() => {
    function handleKey(e) {
      if (e.key === 'Escape') close();
    }
    if (mode) {
      window.addEventListener('keydown', handleKey);
      document.body.style.overflow = 'hidden'; // stop background scroll while modal is open
    }
    return () => {
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [mode, close]);

  if (!mode) return null;

  function handleBackdropClick(e) {
    if (e.target === e.currentTarget) close();
  }

  return (
    <div className="auth-modal-backdrop" onClick={handleBackdropClick}>
      <div className="auth-modal-card">
        <button type="button" className="auth-modal-close" aria-label="Close" onClick={close}>
          ×
        </button>
        <h2 className="auth-modal-title">{mode === 'login' ? 'Log in' : 'Create an account'}</h2>
        {mode === 'login' ? <LoginForm /> : <RegisterForm />}
      </div>
    </div>
  );
}