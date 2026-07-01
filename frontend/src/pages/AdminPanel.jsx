import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const AdminPanel = () => {
  const logout = () => { localStorage.removeItem('admin_token'); window.location.href = '/admin/login'; };

  return (
    <div style={{ padding: 20 }}>
      <header style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
        <h1>Admin Panel</h1>
        <div>
          <Link to="/admin">Users</Link> {' | '}
          <button onClick={logout}>Logout</button>
        </div>
      </header>
      <main style={{ marginTop: 20 }}>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminPanel;
