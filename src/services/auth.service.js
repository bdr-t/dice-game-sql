const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');

/**
 * Login with username and password
 * @param {string} name
 * @param {string} password
 * @returns {Promise<User>}
 */

const loginUserWithNameAndPasswordAdmin = async (name, password) => {
  if (!(name === 'admin') || !(password === 'password1')) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect name or password');
  }
  return !(name === 'admin') || !(password === 'password1');
};

module.exports = {
  loginUserWithNameAndPasswordAdmin,
};
