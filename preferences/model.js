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
      field: 'user_id'
    }
  },
  {
    tableName: 'preferences',
    timestamps: false
  }
)

module.exports = Preference
