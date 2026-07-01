const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:5000/api';

export async function request(path, method = 'GET', body = null, token = null) {
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = 'Bearer ' + token;

  const opts = { method, headers };
  if (body) opts.body = JSON.stringify(body);

  const res = await fetch(`${API_BASE}${path}`, opts);
  const data = await res.json().catch(()=>null);
  if (!res.ok) throw new Error(data?.message || 'Request failed');
  return data;
}
