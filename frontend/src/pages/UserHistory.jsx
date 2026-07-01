import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { request } from '../utils/api';

const UserHistory = () => {
  const { id } = useParams();
  const [entries, setEntries] = useState([]);
  const token = localStorage.getItem('admin_token');
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) return navigate('/admin/login');
    (async () => {
      try {
        const res = await request(`/admin/user/${id}/history`, 'GET', null, token);
        setEntries(res);
      } catch (err) {
        console.error(err);
      }
    })();
  }, [id, token, navigate]);

  return (
    <div style={{ maxWidth: 900, margin: '20px auto' }}>
      <button onClick={() => navigate('/admin')}>Back</button>
      <h2>User Diet History</h2>
      {entries.length === 0 && <p>No history found.</p>}
      <ul>
        {entries.map(e => (
          <li key={e._id}>
            <strong>{new Date(e.createdAt).toLocaleString()}</strong><br/>
            BMI: {e.bmi} | Height: {e.height} | Weight: {e.weight}<br/>
            Plan: <pre style={{whiteSpace:'pre-wrap'}}>{e.plan}</pre>
            {e.notes && <div>Notes: {e.notes}</div>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserHistory;
