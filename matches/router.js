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

router.get('/adminstats/toptenliked', requireUser, (req,res) => {
  // get top 10 liked breeds
  sequelize.query(
    `SELECT breed, COUNT(breed)
    FROM preferences
    WHERE val = 1
    GROUP BY breed
    ORDER BY count DESC
    LIMIT 10`,
    { type: sequelize.QueryTypes.SELECT }
  )
    .then(topTenLiked => {
      console.log(topTenLiked)
      res.send({
        topTenLiked
      })
    })
    .catch(err => console.log(err))
})

router.get('/adminstats/toptendisliked', requireUser, (req,res) => {
  // get top 10 disliked breeds
  sequelize.query(
    `SELECT breed, COUNT(breed)
    FROM preferences
    WHERE val = -1
    GROUP BY breed
    ORDER BY count DESC
    LIMIT 10`,
    { type: sequelize.QueryTypes.SELECT }
  )
    .then(topTenDisliked => {
      res.send({
        topTenDisliked
      })
    })
    .catch(err => console.log(err))
})

router.get('/adminstats/mostactiveusers', requireUser, (req,res) => {
  // get most active users
  sequelize.query(
    `SELECT a."userId", a.val, b.email, b.firstname, b.lastname, COUNT(*) AS ct
    FROM preferences a
    JOIN users b 
    ON a."userId" = b.id
    WHERE val = 1
    GROUP BY a."userId", a.val, b.email, b.firstname, b.lastname
    ORDER BY ct DESC
    LIMIT 10`,
    { type: sequelize.QueryTypes.SELECT }
  )
    .then(mostActiveUsers => {
      console.log(mostActiveUsers)
      res.send({
        mostActiveUsers
      })
    })
    .catch(err => console.log(err))
})

router.get('/matches', requireUser, (req, res) => {
  
  // MVP version user story:
  // As a doglover I want to be matched to another “random” user that has liked a similar number of dogs so I can find a person who is as interested in dogs as I am
  //
  // get sum of likes per user
  // returns arr of objs, ordered by sum of likes
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
    .then(likesPerUser => {
      console.log(likesPerUser)

      // get current user index in likesPerUser array
      const currUser = likesPerUser.findIndex( x => x.userId == req.user.id )
      const matchThreshold = 100

      // check neighbor elements, see if their number of likes is similar (max diff matchThreshold)
      //
      // check the previous only if current user is not the first elem / check next only if current user is not the last
      if (currUser !== 0 && currUser !== likesPerUser.length-1 ) {
        const prevUser = likesPerUser[currUser - 1]
        const nextUser = likesPerUser[currUser + 1]
        console.log(prevUser)
        console.log(nextUser)
        // get diff between neighboring elements
        const prevDiff = Math.abs( Number(likesPerUser[currUser].ct) - Number(prevUser.ct) )
        const nextDiff = Math.abs( Number(likesPerUser[currUser].ct) - Number(nextUser.ct) )
        console.log(prevDiff)
        console.log(nextDiff)
        // get the better match - neighbor that is closer to the current user likes if both are within limits
        if (prevDiff < matchThreshold && nextDiff < matchThreshold) {
          const matchingUser = prevDiff < nextDiff ? prevUser : nextUser
          console.log(matchingUser)
          res.send({
            currentUser: likesPerUser[currUser],
            matchingUser
          })
        }
        // get the neighbor which is within limits if only one of them is close enough
        if (prevDiff < matchThreshold || nextDiff < matchThreshold) {
          const matchingUser = matchThreshold < prevDiff ? nextUser : prevUser
          console.log(matchingUser)
          res.send({
            currentUser: likesPerUser[currUser],
            matchingUser
          })
        }
        // final fallback - if there's no user matching within the configured limits, 
        // get the nearest user to show someone
        if (!matchingUser) {
          if ( currUser === 0 ) {
            const matchingUser = currUser+1
            res.send({
              currentUser: likesPerUser[currUser],
              matchingUser
            })
          } else if ( currUser = likesPerUser.length-1 ) {
            const matchingUser = currUser-1
            res.send({
              currentUser: likesPerUser[currUser],
              matchingUser
            })
          } else {
            const matchingUser = prevDiff < nextDiff ? currUser-1 : currUser+1
            res.send({
              currentUser: likesPerUser[currUser],
              matchingUser
            })
          }

        }
      }
      // check only the next if curr user is the first elem
      if (currUser === 0) {
        const nextUser = likesPerUser[currUser + 1]
        const nextDiff = Math.abs( Number(likesPerUser[currUser].ct) - Number(nextUser.ct) )
        if (nextDiff < matchThreshold) {
          const matchingUser = nextUser
          res.send({
            currentUser: likesPerUser[currUser],
            matchingUser
          })
        }
      }
      // check only the prev if curr user is the last elem
      if (currUser === likesPerUser.length-1) {
        const prevUser = likesPerUser[currUser - 1]
        const prevDiff = Math.abs( Number(likesPerUser[currUser].ct) - Number(prevUser.ct) )
        if (prevDiff < matchThreshold) {
          const matchingUser = prevUser
          res.send({
            currentUser: likesPerUser[currUser],
            matchingUser
          })
        }
      }
      

    })
    .catch(err => {
      console.log(err)
    })

  console.log(`current user id from request: ${req.user.id}`)
})

module.exports = router
