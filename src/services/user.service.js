const httpStatus = require('http-status');
const { Op } = require('sequelize');
const { User, Player, Games } = require('../models');
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
    return Player.create({ name: `ANONIM-${id}` });
  }
  if (await Player.findOne({ where: { name: userBody.name } })) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Name already taken');
  }
  return Player.create(userBody);
};

const createGame = async (id, game) => {
  return Games.create({
    userId: id,
    result: game.result,
    sumDice: game.sumDice,
  });
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
  const user = await Player.findOne({ where: { id } });
  if (!user) throw new ApiError(httpStatus.BAD_REQUEST, "User doesn't exsist");
  return user;
};

const updateNameUser = async (userBody, userParams) => {
  if (await Player.findOne({ where: { name: userBody.name } })) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User already taken');
  }

  const user = await Player.findOne({ where: { id: userParams.id } });

  if (await Player.findOne({ where: { name: user.name } })) {
    if (user.name === 'admin') throw new ApiError(httpStatus.BAD_REQUEST, "Can't modify admin name");
    await Player.update({ name: userBody.name }, { where: { name: user.name } });
    return Player.findOne({ where: { id: userParams.id } });
  }
  throw new ApiError(httpStatus.BAD_REQUEST, "User doesn't exsist");
};

const getUserByName = async (name) => {
  const user = await User.findOne({ name });
  if (!user) throw new ApiError(httpStatus.BAD_REQUEST, "User doesn't exsist");
  return user;
};

// TODO: UPDATE SUCCES_RATE

const updateGames = async (id, newUser = { lost: 0, won: 0, succes_rate: 0 }) => {
  const user = await Player.findOne({ where: { id } });
  if (!user) throw new ApiError(httpStatus.BAD_REQUEST, "User doesn't exsist");
  user.lost = newUser.lost;
  user.won = newUser.won;
  user.succes_rate = `${newUser.succes_rate}`;

  await user.save();
  return Player.findOne({ where: { id } });
};

const deleteGames = async (id) => {
  return Games.destroy({
    where: {
      userId: id,
    },
  });
};

const getAllUsers = async () => {
  return Player.findAll({
    raw: true,
    where: {
      name: {
        [Op.ne]: 'admin',
      },
    },
  });
};

const getPlayersGames = async (id) => {
  return Games.findAll({
    raw: true,
    where: {
      userId: id,
    },
  });
};

module.exports = {
  createUser,
  getUserById,
  updateNameUser,
  updateGames,
  getAllUsers,
  getUserByName,
  createGame,
  deleteGames,
  getPlayersGames,
};
