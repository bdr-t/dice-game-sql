const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { userService, tokenService, authService } = require('../services');
const { User } = require('../models');
const ApiError = require('../utils/ApiError');

const register = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  const tokens = await tokenService.generateAuthTokens(user);
  res.status(httpStatus.CREATED).send({
    user: {
      id: user._id,
      name: user.name,
    },
    tokens,
  });
});

// const login = catchAsync(async (req, res) => {
//   const { name, password } = req.body;
//   const user = await authService.loginUserWithNameAndPassword(name, password);
//   const tokens = await tokenService.generateAuthTokens(user);
//   res.send({ user, tokens });
// });

const loginAdmin = catchAsync(async (req, res) => {
  const { name, password } = req.body;
  if (name !== 'admin') throw new ApiError(httpStatus.UNAUTHORIZED, 'Only admin can login');
  const userRegistred = await User.findOne({ name: req.body.name });
  if (!userRegistred) {
    const userReg = await userService.createUser(req.body);
    await tokenService.generateAuthTokens(userReg);
  }
  const user = await authService.loginUserWithNameAndPasswordAdmin(name, password);
  const tokens = await tokenService.generateAuthTokens(user);
  res.send({
    user: {
      id: user.id,
      name: user.name,
    },
    tokens,
  });
});

module.exports = {
  register,
  loginAdmin,
};
