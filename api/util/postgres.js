require('dotenv').config();
const { Client } = require('pg');


const client = new Client(process.env.CONNECTION_STRING);

client.connect();

module.exports = client;