const httpStatus = require('http-status');
const userService = require('./user.service');
const ApiError = require('../utils/ApiError');

/**
 * Login with username and password
 * @param {string} name
 * @param {string} password
 * @returns {Promise<User>}
 */

const loginUserWithNameAndPasswordAdmin = async (name, password) => {
  const user = await userService.getUserByName(name);
  if (!user || !(password === 'password1')) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect name or password');
  }
  return user;
};

module.exports = {
  loginUserWithNameAndPasswordAdmin,
};
