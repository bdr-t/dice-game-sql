const mysql = require('mysql2');
const logger = require('./config/logger');
const app = require('./app');
const config = require('./config/config');

const pool = mysql.createPool({
  host: config.mysql.host,
  user: config.mysql.user,
  database: config.mysql.name,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

let server;
pool.getConnection((err, connection) => {
  if (err) {
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      logger.info('Database connection was closed.');
    }
    if (err.code === 'ER_CON_COUNT_ERROR') {
      logger.info('Database has to many connections');
    }
    if (err.code === 'ECONNREFUSED') {
      logger.info('Database connection was refused');
    }
  }

  if (connection) connection.release();
  server = app.listen(config.port, () => {
    logger.info(`Listening to port ${config.port}`);
  });
  logger.info('DB is Connected');
});

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);
