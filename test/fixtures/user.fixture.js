const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../../src/models/user.model');

const password = 'password1';
const salt = bcrypt.genSaltSync(8);
const hashedPassword = bcrypt.hashSync(password, salt);

const userOne = {
  _id: mongoose.Types.ObjectId(),
  name: 'admin',
};

const userTwo = {
  _id: mongoose.Types.ObjectId(),
  name: 'userTwo',
  games: [],
  succes_rate: 0,
};

const userThree = {
  _id: mongoose.Types.ObjectId(),
  name: 'userThree',
  games: [],
  succes_rate: 0,
};

const insertUsers = async (users) => {
  await User.insertMany(users.map((user) => ({ ...user, password: hashedPassword })));
};

module.exports = {
  userOne,
  userTwo,
  userThree,
  insertUsers,
};
