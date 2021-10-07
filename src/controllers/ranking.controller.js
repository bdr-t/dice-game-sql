const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { rankingService } = require('../services');
const formatRanking = require('../utils/formatRanking');

const getAllUsers = catchAsync(async (req, res) => {
  const users = await rankingService.getAllUsers();
  const formatedRankings = formatRanking(users);

  res.status(httpStatus.OK).send({ users: formatedRankings });
});

const getLoser = catchAsync(async (req, res) => {
  const users = await rankingService.getAllUsers();
  if (!users.length) {
    res.status(httpStatus.OK).send({ users });
    return;
  }
  const loser = formatRanking([users[users.length - 1]]);

  const mutlipleLosers = await rankingService.getUserBySuccesRate(loser[0].succes_rate);

  if (mutlipleLosers.length > 1) {
    const newLosers = formatRanking(mutlipleLosers);
    res.status(httpStatus.OK).send({ users: newLosers });
  } else {
    res.status(httpStatus.OK).send({ users: loser });
  }
});

const getWinner = catchAsync(async (req, res) => {
  const users = await rankingService.getAllUsers();
  if (!users.length) {
    res.status(httpStatus.OK).send({ users });
    return;
  }

  const winner = formatRanking([users[0]]);

  const mutlipleWinners = await rankingService.getUserBySuccesRate(winner[0].succes_rate);

  if (mutlipleWinners.length > 1) {
    const newWinners = formatRanking(mutlipleWinners);
    res.status(httpStatus.OK).send({ users: newWinners });
  } else {
    res.status(httpStatus.OK).send({ users: winner });
  }
});

module.exports = {
  getAllUsers,
  getLoser,
  getWinner,
};
