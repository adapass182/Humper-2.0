const Router = require('express').Router
const Preference = require('./model')

const router = new Router()

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
    where: { userId: preference.userId }
  })
    .then(result => {
      res.send({
        preferences: result
      })
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

router.put('/preferences/:id', requireUser, (req, res) => {
  const preferenceId = Number(req.params.id)
  const updates = req.body

  console.log(`The user that's editing this product has ID = ${req.user.id}`)
  Preference.findById(req.params.id)
    .then(entity => {
      if (entity.userId !== req.user.id) {
        res.status(403).send({
          message: "You're not allowed to edit this preference!"
        })
      } else {
        return entity.update(updates)
      }
    })
    .then(final => {
      res.send(final)
    })
    .catch(error => {
      res.status(500).send({
        message: `Something went wrong`,
        error
      })
    })
})

module.exports = router
