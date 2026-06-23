import React, { useState } from 'react';

const API_URL = process.env.REACT_APP_API_URL;

function Login({ onLogin }) {
  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!email || !password) return;
    setLoading(true);
    setError('');
    try {
      const endpoint = isSignup ? '/api/auth/register' : '/api/auth/login';
      const body = isSignup ? { name, email, password } : { email, password };
      const res = await fetch(`${API_URL}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Something went wrong');
      onLogin({ name: data.name || name, email, token: data.token });
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <div style={{ backgroundColor: '#0a0a2e', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white' }}>
      <div style={{ background: '#1a1a4e', padding: '2rem', borderRadius: '12px', width: '300px' }}>
        <h2>{isSignup ? 'Sign Up' : 'Login'}</h2>
        {isSignup && <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} style={inputStyle} />}
        <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} style={inputStyle} />
        <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} style={inputStyle} />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button onClick={handleSubmit} disabled={loading} style={btnStyle}>
          {loading ? 'Loading...' : isSignup ? 'Sign Up' : 'Login'}
        </button>
        <p style={{ cursor: 'pointer', color: '#aaa', marginTop: '1rem' }} onClick={() => setIsSignup(!isSignup)}>
          {isSignup ? 'Already have account? Login' : 'No account? Sign Up'}
        </p>
      </div>
    </div>
  );
}

const inputStyle = { display: 'block', width: '100%', margin: '0.5rem 0', padding: '0.5rem', borderRadius: '6px', border: 'none' };
const btnStyle = { width: '100%', padding: '0.7rem', background: '#4a90e2', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', marginTop: '0.5rem' };

export default Login;