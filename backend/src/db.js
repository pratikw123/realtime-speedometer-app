const { Pool } = require('pg');

const pool = new Pool({
  host: 'db',
  user: 'postgres',
  password: 'postgres',
  database: 'speed_db'
});

module.exports = pool;
