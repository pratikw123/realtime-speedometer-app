const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const pool = require('./db');
const startSpeedGenerator = require('./speedGenerator');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

let clients = [];

wss.on('connection', ws => {
  clients.push(ws);
  ws.on('close', () => {
    clients = clients.filter(c => c !== ws);
  });
});

function broadcast(speed) {
  clients.forEach(client => {
    client.send(JSON.stringify({ speed }));
  });
}

async function initDB(retries = 5) {
  while (retries) {
    try {
      await pool.query(`
        CREATE TABLE IF NOT EXISTS speed_readings (
          id SERIAL PRIMARY KEY,
          speed INT NOT NULL,
          recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `);
      console.log("Database connected successfully");
      break;
    } catch (err) {
      console.log("Database not ready, retrying...");
      retries--;
      await new Promise(res => setTimeout(res, 5000));
    }
  }
}

async function startApp() {
  await initDB();
  console.log("Database connected successfully");
  startSpeedGenerator(broadcast);
}

startApp();

app.get('/history', async (req, res) => {
  const result = await pool.query(
    'SELECT * FROM speed_readings ORDER BY recorded_at DESC LIMIT 10'
  );
  res.json(result.rows);
});

server.listen(3001, () =>
  console.log('Backend running on port 3001')
);
