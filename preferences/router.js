const Router = require('express').Router
const Preference = require('./model')
const router = new Router()
const sequelize = require('../db')

const requireUser = (req, res, next) => {
  if (req.user) next()
  else
    res.status(401).send({
      message: 'Please login'
    })
}

router.get('/preferences', requireUser, (req, res) => {
  const preference = req.body
  preference.userId = req.user.id

  Preference.findAll({
    attributes: ['breed', 'val', 'id'],
    where: { userId: preference.userId }
  })
    .then(result => {
      res.send(result)
    })
    .catch(err => {
      res.status(500).send({ error: 'Something went wrong with Postgres' })
    })
})

router.post('/preferences', requireUser, (req, res) => {
  const preference = req.body
  preference.userId = req.user.id

  Preference.create(preference).then(entity => {
    res.status(201).send(entity)
  })
})

router.get('/preferences/top10', requireUser, (req, res) => {
  const preference = req.body
  preference.userId = req.user.id

  sequelize
    .query(
      `select "userId", breed, count(*) as count from preferences where "userId" = ${
        preference.userId
      } AND val = 1 group by "userId", breed order by count desc limit 10`,
      { type: sequelize.QueryTypes.SELECT }
    )
    .then(result => {
      res.send(result)
    })
    .catch(err => {
      res.status(500).send({ error: 'Something went wrong with Postgres' })
    })
})

// NOT IMPLEMENTING AN UPDATE SINCE WE CAN REDUCE THE VALS FOR DUPLICATE RECORDS ON THE GET

// router.put('/preferences', requireUser, (req, res) => {
//   const preference = req.body
//   preference.userId = req.user.id
//   const updateVal = req.params.val

//   Preference.update(
//     { val: sequelize.literal('val+${updateVal}') },
//     { where: { userId: preference.userId, breed: preference.breed } }
//   )
//     .then(entity => {
//       res.status(201).send(entity)
//     })
//     .catch(error => {
//       res.status(500).send({
//         message: `Something went wrong`,
//         error
//       })
//     })
// })

//   console.log(`The user that's editing this product has ID = ${req.user.id}`)
//   Preference.findById(req.params.id)
//     .then(entity => {
//       if (entity.userId !== req.user.id) {
//         res.status(403).send({
//           message: "You're not allowed to edit this preference!"
//         })
//       } else {
//         return entity.update(updates)
//       }
//     })
//     .then(final => {
//       res.send(final)
//     })
//     .catch(error => {
//       res.status(500).send({
//         message: `Something went wrong`,
//         error
//       })
//     })
// })

module.exports = router
