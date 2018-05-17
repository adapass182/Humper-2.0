const Sequelize = require('sequelize')
const sequelize = require('../db')

const User = sequelize.define(
  'user',
  {
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    },
    firstname: {
      type: Sequelize.STRING,
      allowNull: true
    },
    lastname: {
      type: Sequelize.STRING,
      allowNull: true
    },
    admin: {
      type: Sequelize.BOOLEAN,
      allowNull: true
    }
  },
  {
    tableName: 'users',
    timestamps: false
  }
)

module.exports = User
