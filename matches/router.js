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
  const preference = req.body
  preference.userId = req.user.id

  // get total number of likes of current user 
  //sequelize.query(`select "userId", val, count(*) as ct from preferences where "userId" = ${req.user.id} AND val = 1 group by "userId", val`,{ type: sequelize.QueryTypes.SELECT})   
//sequelize.query(`select "userId", val, breed, count(*) as ct from preferences where "userId" = 2 AND val = 1 group by "userId", breed, val order by ct desc`, { type: sequelize.QueryTypes.SELECT})
  // get total number of likes of all users 
  //`select "userId", val, count(*) as ct from preferences where val = 1 group by "userId", val`  
  //
  // get total likes per user
  //const pgQuery = `select a."userId", a.val, b.email, count(*) as ct from preferences a join users b on a."userId" = b.id where val = 1 group by a."userId", a.val, b.email order by ct desc`

  const likesPerUserQuery = `select "userId", val, count(*) as ct from preferences where val = 1 group by "userId", val` 
  const mailPerId = `select id, email from users`

  sequelize.query(likesPerUserQuery, {type: sequelize.QueryTypes.SELECT})
    .then(likesPerUser => {
      console.log(likesPerUser)
      
      sequelize.query(mailPerId, {type: sequelize.QueryTypes.SELECT})
        .then(mailPerId => {
          console.log(mailPerId)
        
          const mapIdToMail = likesPerUser.map(user => {
            return mailPerId.find(elem => {
              
              return elem.id === user.userId ? {...elem, ...user} : null


            })
          })
          console.log(JSON.stringify(mapIdToMail))

        })
        .catch(err => {
          console.log(err)
          res.status(500).send({ error: 'Something went wrong with Postgres' })
        })



      res.send(likesPerUser)
    })
    .catch(err => {
      console.log(err)
      res.status(500).send({ error: 'Something went wrong with Postgres' })
    })




})

module.exports = router
