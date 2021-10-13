// const Sequelize = require('sequelize');
// const mysql2 = require('mysql2');
// const logger = require('./config/logger');
// const app = require('./app');
// const config = require('./config/config');

// const conn = mysql2.createConnection({
//   host: config.mysql.host,
//   user: config.mysql.user,
//   password: config.mysql.password,
// });

// // creating database and table
// conn.connect((error) => {
//   const query = `CREATE DATABASE IF NOT EXISTS ${config.mysql.name}`;
//   if (error) throw error;
//   conn.query((query) => {
//     if (error) throw error;
//     // console.log('Database created');
//     conn.end();
//   });
// });

// const mysql = new Sequelize(config.mysql.name, config.mysql.user, config.mysql.password, {
//   host: config.mysql.host,
//   dialect: 'mysql',
//   define: {
//     freezeTableName: true,
//   },
// });

// let server;
// mysql
//   .authenticate()
//   // eslint-disable-next-line no-unused-vars
//   .then(function (err) {
//     server = app.listen(config.port, () => {
//       logger.info(`Listening to port ${config.port}`);
//     });
//     logger.info('DB is Connected');
//   })
//   .catch(function (err) {
//     // console.log('Unable to connect to the database:', err);
//   });

// // mysql.getConnection((err, connection) => {
// //   if (err) {
// //     if (err.code === 'PROTOCOL_CONNECTION_LOST') {
// //       logger.info('Database connection was closed.');
// //     }
// //     if (err.code === 'ER_CON_COUNT_ERROR') {
// //       logger.info('Database has to many connections');
// //     }
// //     if (err.code === 'ECONNREFUSED') {
// //       logger.info('Database connection was refused');
// //     }
// //   }

// //   if (connection) connection.release();
// // server = app.listen(config.port, () => {
// //   logger.info(`Listening to port ${config.port}`);
// // });
// // logger.info('DB is Connected');
// // });

// const exitHandler = () => {
//   if (server) {
//     server.close(() => {
//       logger.info('Server closed');
//       process.exit(1);
//     });
//   } else {
//     process.exit(1);
//   }
// };

// const unexpectedErrorHandler = (error) => {
//   logger.error(error);
//   exitHandler();
// };

// process.on('uncaughtException', unexpectedErrorHandler);
// process.on('unhandledRejection', unexpectedErrorHandler);

// module.exports = mysql;
