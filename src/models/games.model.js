const { DataTypes } = require('sequelize');
const { connection } = require('../db');

const Games = connection.define(
  'games',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    result: {
      type: DataTypes.INTEGER,
      allowNull: false,
      required: true,
      unique: true,
    },
    sumDice: {
      type: DataTypes.INTEGER,
      allowNull: false,
      required: true,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Games;
