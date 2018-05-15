const Sequelize = require('sequelize')
const sequelize = require('../db')

const Preference = sequelize.define(
  'preference',
  {
    breed: {
      type: Sequelize.STRING,
      allowNull: false
    },
    val: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    userId: {
      type: Sequelize.INTEGER,
      field: 'userId'
    }
  },
  {
    tableName: 'preferences',
    timestamps: false
  }
)

module.exports = Preference
