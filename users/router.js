const User = require('./model')
const Router = require('express').Router
const bcrypt = require('bcrypt')
const sign = require('../jwt').sign

const router = new Router()

const requireUser = (req, res, next) => {
  if (req.user) next()
  else
    res.status(401).send({
      message: 'Please login'
    })
}

router.get('/users', requireUser, (req, res) => {
  User.findAll()
    .then(result => res.send(result))
    .catch(err => {
      res.send(err)
    })
})

router.post('/users', (req, res) => {
  const user = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10)
  }

  User.create(user)
    .then(entity => {
      res.send({
        id: entity.id,
        name: entity.firstname + ' ' + entity.lastname,
        email: entity.email
      })
    })
    .catch(err => {
      console.error(err)
      res.status(500).send({
        message: 'Something went wrong'
      })
    })
})

router.post('/logins', (req, res) => {
  User.findOne({
    where: {
      email: req.body.email
    }
  })
    .then(entity => {
      if (bcrypt.compareSync(req.body.password, entity.password)) {
        res.send({
          jwt: sign(entity.id),
          username: entity.email,
          firstname: entity.firstname,
          lastname: entity.lastname,
          admin: entity.admin
        })
      } else {
        res.status(400).send({
          message: 'Password was incorrect'
        })
      }
    })
    .catch(err => {
      console.error(err)
      res.status(500).send({
        message: 'Something went wrong'
      })
    })
})

router.get('/secret', (req, res) => {
  if (req.user) {
    res.send({
      message: `Welcome, you should be the user with email ${req.user.email}`
    })
  } else {
    res.status(401).send({
      message: 'Please login!'
    })
  }
})

module.exports = router
