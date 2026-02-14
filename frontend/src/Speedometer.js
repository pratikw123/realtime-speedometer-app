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

  const getColor = () => {
    if (speed < 40) return "#4CAF50";
    if (speed < 80) return "#FFC107";
    return "#F44336";
  };

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      background: "#1e1e2f",
      color: "white"
    }}>
      <h1>Real-Time Speedometer</h1>
      <div style={{
        width: "200px",
        height: "200px",
        borderRadius: "50%",
        border: `10px solid ${getColor()}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "2rem",
        fontWeight: "bold",
        background: "#2c2c3e"
      }}>
        {speed} km/h
      </div>
    </div>
  );
}

export default Speedometer;
