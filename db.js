const Sequelize = require('sequelize')

const pgUrl = ( process.env.DATABASE_URL ? process.env.DATABASE_URL : 'postgres://gukthoqhvggrsg:621c81a1aa388a033d64c3c9e5d82658aeb0f59d1284079aeecc701c2d739f97@ec2-79-125-12-48.eu-west-1.compute.amazonaws.com:5432/d7b9alq02898m3')

const sequelize = new Sequelize(pgUrl, {
  dialect: 'postgres',
  protocol: 'postgres',
  dialectOptions: {
    ssl: true
  }
})

// 'postgres://gukthoqhvggrsg:621c81a1aa388a033d64c3c9e5d82658aeb0f59d1284079aeecc701c2d739f97@ec2-79-125-12-48.eu-west-1.compute.amazonaws.com:5432/d7b9alq02898m3'

module.exports = sequelize
