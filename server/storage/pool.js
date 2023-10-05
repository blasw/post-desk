const { Pool } = require('pg');
require ('dotenv').config();

//Creating a connection pool to postgreSQL db, admin user provided
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_USER_PASS,
  port: process.env.DB_PORT
});

module.exports = pool;