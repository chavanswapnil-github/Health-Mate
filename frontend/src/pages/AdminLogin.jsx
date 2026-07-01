import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { request } from '../utils/api';

const AdminLogin = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [err, setErr] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => setForm({...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr('');
    try {
      const data = await request('/auth/login', 'POST', form);
      if (!data.user.isAdmin) {
        setErr('Admin credentials required');
        return;
      }
      // store token
      localStorage.setItem('admin_token', data.token);
      navigate('/admin');
    } catch (err) {
      setErr(err.message);
    }
  };

  return (
    <div style={{ maxWidth: 420, margin: '40px auto' }}>
      <h2>Admin Login</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
        <input name="email" placeholder="Email" onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit">Login</button>
      </form>
      {err && <p style={{ color: 'red' }}>{err}</p>}
    </div>
  );
};

export default AdminLogin;
