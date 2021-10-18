require('dotenv').config();
const mysql2 = require('mysql2');
const config = require('./src/config/config');
const logger = require('./src/config/logger');

const { host, user, password, name } = config.mysql;

const conn = mysql2.createConnection({
  host,
  user,
  password,
});

// creating database and table
conn.connect((error) => {
  const query = `CREATE DATABASE IF NOT EXISTS ${name}`;
  if (error) throw error;
  conn.query(query, (err) => {
    if (err) throw error;
    logger.info('Database created');
    conn.end();
  });
});
