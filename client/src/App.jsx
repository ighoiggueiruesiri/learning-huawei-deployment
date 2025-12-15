import { useEffect, useState } from 'react';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Adjust URL if testing locally vs production
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
    fetch(apiUrl)
      .then(res => res.json())
      .then(data => setMessage(data.message));
  }, []);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>React + Node App</h1>
      <p>Backend says: {message}</p>
    </div>
  );
}
export default App;