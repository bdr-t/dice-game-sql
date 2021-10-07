const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { toJSON } = require('./plugins');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  lost: {
    type: Number,
    default: 0,
  },
  won: {
    type: Number,
    default: 0,
  },
  games: [{ sumDice: Number, result: String }],
  succes_rate: {
    type: Number,
    default: 0,
  },
  password: {
    type: String,
    trim: true,
    minlength: 8,
    validate(value) {
      if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
        throw new Error('Password must contain at least one letter and one number');
      }
    },
    private: true, // used by the toJSON plugin
  },
});

// add plugin that converts mongoose to json
userSchema.plugin(toJSON);

/**
 * Check if userName is taken
 * @param {string} user - The user's name
 * @param {ObjectId} [excludeUserId] - The id of the user to be excluded
 * @returns {Promise<boolean>}
 */
userSchema.statics.isNameTaken = async function (name) {
  const user = await this.findOne({ name });
  return !!user;
};

userSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
