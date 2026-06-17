import React, { useState } from 'react';

function Login({ onLogin }) {
  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    if (email && password) {
      onLogin({ name, email });
    }
  };

  return (
    <div style={{
      backgroundColor: '#0a0a2e',
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      color: 'white'
    }}>
      <div style={{
        backgroundColor: '#1a1a4e',
        padding: '40px',
        borderRadius: '15px',
        width: '300px'
      }}>
        <h2 style={{ color: '#00d4ff', textAlign: 'center' }}>
          🤝 CalmHands
        </h2>
        <h3 style={{ textAlign: 'center' }}>
          {isSignup ? 'Sign Up' : 'Login'}
        </h3>

        {isSignup && (
          <input
            placeholder="Your Name"
            value={name}
            onChange={e => setName(e.target.value)}
            style={{
              width: '100%', padding: '10px',
              marginBottom: '10px', borderRadius: '8px',
              border: 'none', backgroundColor: '#0a0a2e',
              color: 'white'
            }}
          />
        )}

        <input
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          style={{
            width: '100%', padding: '10px',
            marginBottom: '10px', borderRadius: '8px',
            border: 'none', backgroundColor: '#0a0a2e',
            color: 'white'
          }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          style={{
            width: '100%', padding: '10px',
            marginBottom: '20px', borderRadius: '8px',
            border: 'none', backgroundColor: '#0a0a2e',
            color: 'white'
          }}
        />

        <button
          onClick={handleSubmit}
          style={{
            width: '100%', padding: '12px',
            backgroundColor: '#00d4ff', color: '#0a0a2e',
            border: 'none', borderRadius: '8px',
            fontWeight: 'bold', cursor: 'pointer'
          }}>
          {isSignup ? 'Sign Up' : 'Login'}
        </button>

        <p
          onClick={() => setIsSignup(!isSignup)}
          style={{ textAlign: 'center', cursor: 'pointer',
            color: '#00d4ff', marginTop: '15px' }}>
          {isSignup ? 'Already have account? Login' : 'No account? Sign Up'}
        </p>
      </div>
    </div>
  );
}

export default Login;