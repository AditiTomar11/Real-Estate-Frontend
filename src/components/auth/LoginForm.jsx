import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useAuthModal } from '../../context/AuthModalContext';
import './AuthForm.css';

export default function LoginForm() {
  const { login } = useAuth();
  const { openRegister, close } = useAuthModal();
  const [form, setForm] = useState({ email: '', password: '' });

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }
  async function handleSubmit(e) {
  e.preventDefault();
  const success = await login(form.email, form.password);
  if (success) {
    close();
  } else {
    setError('Incorrect email or password.');
  }
}

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <label>
        Email
        <input type="email" name="email" value={form.email} onChange={handleChange} required />
      </label>
      <label>
        Password
        <input type="password" name="password" value={form.password} onChange={handleChange} required />
      </label>
      <button type="submit" className="btn btn-primary auth-form__submit">
        Log in
      </button>
      <p className="auth-form__switch">
        New here?{' '}
        <button type="button" className="auth-form__link" onClick={openRegister}>
          Create an account
        </button>
      </p>
    </form>
  );
}