const pool = require('./db');

function generateSpeed() {
  return Math.floor(Math.random() * 120); // 0–120 km/h
}

async function startSpeedGenerator(broadcast) {
  setInterval(async () => {
    const speed = generateSpeed();
    await pool.query(
      'INSERT INTO speed_readings(speed) VALUES($1)',
      [speed]
    );
    broadcast(speed);
  }, 1000);
}

module.exports = startSpeedGenerator;
