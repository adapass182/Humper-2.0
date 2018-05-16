const User = require('../users/model')
const Preference = require('../preferences/model')
const Router = require('express').Router
const sequelize = require('../db')

const router = new Router()


const requireUser = (req, res, next) => {
  if (req.user) next()
  else
    res.status(401).send({
      message: 'Please login'
    })
}

router.get('/matches', requireUser, (req, res) => {
  
  // MVP version user story:
  // As a doglover I want to be matched to another “random” user that has liked a similar number of dogs so I can find a person who is as interested in dogs as I am
  //
  // get sum of likes per user
  sequelize.query(
    `SELECT a."userId", a.val, b.email, b.firstname, b.lastname, COUNT(*) AS ct
    FROM preferences a
    JOIN users b
    ON a."userId" = b.id
    WHERE val = 1
    GROUP BY a."userId", a.val, b.email, b.firstname, b.lastname
    ORDER BY ct DESC`,
    { type: sequelize.QueryTypes.SELECT }
  )
    .then(result => {
      console.log(result)
    })
    .catch(err => {
      console.log(err)
    })
})

module.exports = router
