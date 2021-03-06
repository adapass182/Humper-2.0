const express = require('express')
const bodyParser = require('body-parser')
const preferenceRouter = require('./preferences/router')
const usersRouter = require('./users/router')
const matchesRouter = require('./matches/router')
const verify = require('./jwt').verify
const User = require('./users/model')

const port = process.env.PORT || 8080

const app = express()
app.use(bodyParser.json())

// instruct node to serve client/build on heroku
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

app.listen(port, () => console.log(`Express API listening on port ${port}`))

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  )
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE')
  next()
})

app.use(function(req, res, next) {
  if (!req.headers.authorization) return next()

  const auth = req.headers.authorization.split(' ')
  if (auth[0] === 'Bearer') {
    verify(auth[1], function(err, jwt) {
      if (err) {
        console.error(err)
        res.status(400).send({
          message: 'JWT token invalid'
        })
      } else {
        User.findById(jwt.id)
          .then(entity => {
            req.user = entity
            next()
          })
          .catch(err => {
            console.error(err)
            res.status(500).send({
              message: 'Something went horribly wrong'
            })
          })
      }
    })
  } else next()
})

app.use(preferenceRouter)
app.use(usersRouter)
app.use(matchesRouter)
