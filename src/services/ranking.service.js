const { Op } = require('sequelize');
const { Player } = require('../models');

const getAllUsers = async () => {
  return Player.findAll({
    where: {
      name: {
        [Op.ne]: 'admin',
      },
    },
    order: [
      ['succes_rate', 'DESC'],
      ['name', 'ASC'],
    ],
  });
};

const getUserBySuccesRate = async (succesRate) => {
  return Player.findAll({
    where: {
      succes_rate: succesRate,
      name: {
        [Op.ne]: 'admin',
      },
    },
  });
};

module.exports = {
  getAllUsers,
  getUserBySuccesRate,
};
