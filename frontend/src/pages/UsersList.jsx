import React, { useEffect, useState } from 'react';
import { request } from '../utils/api';
import { useNavigate } from 'react-router-dom';

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem('admin_token');
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) return navigate('/admin/login');
    (async () => {
      try {
        const res = await request('/admin/users', 'GET', null, token);
        setUsers(res);
      } catch (err) {
        console.error(err);
      }
    })();
  }, [token, navigate]);

  return (
    <div style={{ maxWidth: 900, margin: '24px auto' }}>
      <h2>Users</h2>
      <table width="100%" border="1" cellPadding="8">
        <thead>
          <tr><th>Name</th><th>Email</th><th>Joined</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u._id}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{new Date(u.createdAt).toLocaleString()}</td>
              <td>
                <button onClick={() => navigate(`/admin/user/${u._id}/history`)}>View History</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersList;
