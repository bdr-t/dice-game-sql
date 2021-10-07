const httpStatus = require('http-status');
const { User } = require('../models');
const ApiError = require('../utils/ApiError');
const anonimId = require('../utils/anonimId');

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */

const createUser = async (userBody) => {
  if (Object.keys(userBody).length === 0) {
    const id = anonimId();
    return User.create({ name: `ANONIM-${id}` });
  }
  if (await User.isNameTaken(userBody.name)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Name already taken');
  }
  return User.create(userBody);
};

/**
 * Update a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */

/**
 * Get user by name
 * @param {string} name
 * @returns {Promise<User>}
 */
const getUserById = async (id) => {
  const user = await User.findById(id);
  if (!user) throw new ApiError(httpStatus.BAD_REQUEST, "User doesn't exsist");
  return user;
};

const updateNameUser = async (userBody, userParams) => {
  if (await User.isNameTaken(userBody.name)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User already taken');
  }

  const user = await User.findById(userParams.id);

  if (await User.isNameTaken(user.name)) {
    if (user.name === 'admin') throw new ApiError(httpStatus.BAD_REQUEST, "Can't modify admin name");
    await User.updateOne({ name: user.name }, { name: userBody.name });
    return User.findOne({ name: userBody.name });
  }
  throw new ApiError(httpStatus.BAD_REQUEST, "User doesn't exsist");
};

const getUserByName = async (name) => {
  const user = await User.findOne({ name });
  if (!user) throw new ApiError(httpStatus.BAD_REQUEST, "User doesn't exsist");
  return user;
};

const updateGames = async (id, newUser = { games: [], lost: 0, won: 0, succes_rate: 0 }) => {
  const { name } = await User.findById(id);
  if (!name) throw new ApiError(httpStatus.BAD_REQUEST, "User doesn't exsist");
  await User.updateOne({ name }, { games: newUser.games });
  await User.updateOne({ name }, { lost: newUser.lost });
  await User.updateOne({ name }, { won: newUser.won });
  await User.updateOne({ name }, { succes_rate: newUser.succes_rate });
  return User.findOne({ name });
};

const getAllUsers = async () => {
  return User.find({ name: { $ne: 'admin' } });
};

module.exports = {
  createUser,
  getUserById,
  updateNameUser,
  updateGames,
  getAllUsers,
  getUserByName,
};
