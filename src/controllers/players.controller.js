const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { userService } = require('../services');
const { Game } = require('../utils/game');

const createUser = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  res.status(httpStatus.CREATED).send({ user });
});

const updateUser = catchAsync(async (req, res) => {
  const user = await userService.updateNameUser(req.body, req.params);
  res.status(httpStatus.OK).send({ user });
});

const createGame = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.params.id);
  const game = await Game(user.won, user.lost);

  const newUser = {
    succes_rate: game.succes_rate,
    games: [...user.games, game.game],
    won: game.won,
    lost: game.lost,
  };

  await userService.updateGames(req.params.id, newUser);

  res.status(httpStatus.OK).send({
    dice1: game.dice1,
    dice2: game.dice2,
    succes_rate: game.succes_rate,
    result: game.resultText,
  });
});

const deleteGames = catchAsync(async (req, res) => {
  const user = await userService.updateGames(req.params.id);
  res.status(httpStatus.OK).send({ user });
});

const getAllUsers = catchAsync(async (req, res) => {
  const users = await userService.getAllUsers();
  res.status(httpStatus.OK).send({ users });
});

const getUser = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.params.id);
  res.status(httpStatus.OK).send({ user });
});

module.exports = {
  createUser,
  updateUser,
  createGame,
  deleteGames,
  getAllUsers,
  getUser,
};
