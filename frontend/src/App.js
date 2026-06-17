import React, { useState } from 'react';
import Login from './Login';

function App() {
  const [user, setUser] = useState(null);
  const [tremorLevel, setTremorLevel] = useState('--');
  const [score, setScore] = useState('--');

  if (!user) return <Login onLogin={setUser} />;
  const analyzeDemo = async () => {
  try {
    const response = await fetch('http://127.0.0.1:8000/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        readings: [1.2, 3.4, 2.1, 5.6, 1.8, 4.2, 2.9, 3.7]
      })
    });
    const data = await response.json();
    setTremorLevel(data.tremor_level);
    setScore(data.severity_score);
  } catch (error) {
    setTremorLevel('Error');
    setScore('Check AI');
  }
};

  return (
    <div style={{
      backgroundColor: '#0a0a2e',
      minHeight: '100vh',
      color: 'white',
      fontFamily: 'Arial, sans-serif',
      padding: '20px'
    }}>
      <h1 style={{ color: '#00d4ff', textAlign: 'center' }}>
        🤝 CalmHands
      </h1>
      <p style={{ textAlign: 'center', color: '#aaa' }}>
        AI-Powered Hand Tremor Tracking
      </p>

      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '20px',
        marginTop: '30px',
        flexWrap: 'wrap'
      }}>
        <div style={{
          backgroundColor: '#1a1a4e',
          padding: '20px',
          borderRadius: '15px',
          textAlign: 'center',
          width: '150px'
        }}>
          <h2 style={{ color: '#00d4ff' }}>{tremorLevel}</h2>
          <p style={{ color: '#aaa' }}>Tremor Level</p>
        </div>

        <div style={{
          backgroundColor: '#1a1a4e',
          padding: '20px',
          borderRadius: '15px',
          textAlign: 'center',
          width: '150px'
        }}>
          <h2 style={{ color: '#00d4ff' }}>{score}</h2>
          <p style={{ color: '#aaa' }}>Severity Score</p>
        </div>
      </div>

      <div style={{ textAlign: 'center', marginTop: '40px' }}>
        <button
          onClick={analyzeDemo}
          style={{
            backgroundColor: '#00d4ff',
            color: '#0a0a2e',
            border: 'none',
            padding: '15px 40px',
            borderRadius: '25px',
            fontSize: '1rem',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}>
          🔍 Analyze Tremor
        </button>
      </div>

      <div style={{
        backgroundColor: '#1a1a4e',
        padding: '20px',
        borderRadius: '15px',
        marginTop: '30px',
        maxWidth: '500px',
        margin: '30px auto'
      }}>
        <h3 style={{ color: '#00d4ff' }}>Features</h3>
        <p>📊 Real-time tremor detection</p>
        <p>🔐 Secure JWT Authentication</p>
        <p>📄 Doctor-ready PDF Reports</p>
        <p>🤖 AI Pattern Recognition</p>
      </div>
    </div>
  );
}

export default App;