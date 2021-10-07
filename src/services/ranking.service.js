const { User } = require('../models');

const getAllUsers = async () => {
  return User.find({ name: { $ne: 'admin' } }).sort({ succes_rate: -1 });
};

const getUserBySuccesRate = async (succesRate) => {
  return User.find({ name: { $ne: 'admin' }, succes_rate: succesRate });
};

module.exports = {
  getAllUsers,
  getUserBySuccesRate,
};
