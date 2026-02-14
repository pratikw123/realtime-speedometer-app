import { useEffect, useState } from 'react';

function Speedometer() {
  const [speed, setSpeed] = useState(0);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:3001');

    ws.onopen = () => {
      console.log('WebSocket connected');
    };

    ws.onmessage = event => {
      const data = JSON.parse(event.data);
      console.log('Received raw:', event.data);
      setSpeed(data.speed);
    };

    ws.onerror = (err) => {
      console.error('WebSocket error:', err);
    };

  ws.onclose = () => {
    console.log('WebSocket closed');
  };

    return () => ws.close();
  }, []);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Speedometer</h1>
      <h2>{speed} km/h</h2>
    </div>
  );
}

export default Speedometer;
