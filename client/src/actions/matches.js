import * as request from 'superagent'

// change this on heroku-prod branch
// const baseUrl = 'https://humper.herokuapp.com'
const baseUrl = 'http://localhost:8080'

export const MATCHES_FETCHED = 'MATCHES_FETCHED'

export const getMatch = () => (dispatch, getState) => {
  const state = getState()
  const jwt = state.loginSuccess.jwt
  request
    .get(`${baseUrl}/matches`)
    .set('Authorization', `Bearer ${jwt}`)
    .then(response => {
      response => 
        console.log(response)
        dispatch({
          type: MATCHES_FETCHED,
          payload: response.body
        })
    })
    .catch(err => alert(err))
}




//NOTES
//SQL queries that could help:
//
//get top 10 liked dogs per user:
//select "userId", breed, count(*) as ct
//from preferences
//where "userId" = 2
//group by "userId", breed
//order by ct desc
//
//get all likes for user with ID 2:
//select "userId", breed, count(*) as ct
//from preferences
//where "userId" = 2 AND val = 1
//group by "userId", breed
//order by ct desc
//
//
//get likes for user with matching email
//select a."userId", a.breed, a.val, b.email
//from preferences a
//join users b on a."userId" = b.id
//where b.email = 'secondUser@humper.com'
//
//get number of total likes per user
//select "userId", val, count(*) as ct
//from preferences
//where "userId" = 2 AND val = 1
//group by "userId", val


