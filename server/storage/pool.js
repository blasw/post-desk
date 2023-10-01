const { Pool } = require('pg');

//Creating a connection pool to postgreSQL db, admin user provided
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "post_desk",
  password: "5321",
  port: 5432
});

module.exports = pool;