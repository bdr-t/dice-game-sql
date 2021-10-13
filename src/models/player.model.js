const { DataTypes } = require('sequelize');
const { connection } = require('../db');

const Player = connection.define(
  'player',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true,
      unique: true,
    },
    lost: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    won: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    succes_rate: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Player;
