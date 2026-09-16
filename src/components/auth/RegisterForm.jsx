import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useAuthModal } from '../../context/AuthModalContext';
import './AuthForm.css';

export default function RegisterForm() {
  const { register } = useAuth();
  const { openLogin, close } = useAuthModal();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (error) setError('');
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const success = await register(form.name, form.email, form.password);
    if (success) {
      close();
    } else {
      setError('Could not create account. Try a different email.');
    }
  }

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <label>
        Name
        <input type="text" name="name" value={form.name} onChange={handleChange} required />
      </label>
      <label>
        Email
        <input type="email" name="email" value={form.email} onChange={handleChange} required />
      </label>
      <label>
        Password
        <input type="password" name="password" value={form.password} onChange={handleChange} required />
      </label>
      {error && <p className="auth-form__error">{error}</p>}
      <button type="submit" className="btn btn-primary auth-form__submit">
        Create account
      </button>
      <p className="auth-form__switch">
        Already have an account?{' '}
        <button type="button" className="auth-form__link" onClick={openLogin}>
          Log in
        </button>
      </p>
    </form>
  );
}