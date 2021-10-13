const Sequelize = require('sequelize');
const logger = require('./config/logger');
const config = require('./config/config');

const mysql = new Sequelize(config.mysql.name, config.mysql.user, config.mysql.password, {
  host: config.mysql.host,
  dialect: 'mysql',
  define: {
    freezeTableName: true,
  },
  logging: false,
});

mysql
  .authenticate()
  .then(function () {
    logger.info('DB is Connected');
  })
  .catch(function (err) {
    logger.info('Unable to connect to the database:', err);
  });

(async () => {
  try {
    await mysql.sync({ alter: { drop: false } });
    logger.info('Schema sync ok');
  } catch (e) {
    logger.info(e);
    mysql.sync({ force: true });
  }
})();

module.exports = {
  connection: mysql,
};
