require('dotenv').config();
const { Client } = require('pg');

const client = new Client();

async function connectAndQuery() {
  try {
    await client.connect();
    console.log('Connected to PostgreSQL');

    const res = await client.query('SELECT NOW()');
    console.log('Server time:', res.rows[0]);

    await client.end();
  } catch (err) {
    console.error('Connection error:', err.stack);
  }
}

connectAndQuery();