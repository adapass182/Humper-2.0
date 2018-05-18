import * as request from 'superagent'

// change this on heroku-prod branch
 const baseUrl = 'https://humper.herokuapp.com'
//const baseUrl = 'http://localhost:8080'

export const MATCHES_FETCHED = 'MATCHES_FETCHED'
export const TOP_TEN_LIKED_FETCHED = 'TOP_TEN_LIKED_FETCHED'
export const TOP_TEN_DISLIKED_FETCHED = 'TOP_TEN_DISLIKED_FETCHED'
export const MOST_ACTIVE_USERS = 'MOST_ACTIVE_USERS'
export const FETCHED_TOP_10_MATCHES = 'FETCHED_TOP_10_MATCHES'

export const getMatch = () => (dispatch, getState) => {
  const state = getState()
  const jwt = state.loginSuccess.jwt
  request
    .get(`${baseUrl}/matches`)
    .set('Authorization', `Bearer ${jwt}`)
    .then(response => {
      dispatch({
        type: MATCHES_FETCHED,
        payload: response.body
      })
    })
    .catch(err => alert(err))
}

export const getTopTenLiked = () => (dispatch, getState) => {
  const state = getState()
  const jwt = state.loginSuccess.jwt
  request
    .get(`${baseUrl}/adminstats/toptenliked`)
    .set('Authorization', `Bearer ${jwt}`)
    .then(response => {
      dispatch({
        type: TOP_TEN_LIKED_FETCHED,
        payload: response.body
      })
    })
}

export const getTopTenDisliked = () => (dispatch, getState) => {
  const state = getState()
  const jwt = state.loginSuccess.jwt
  request
    .get(`${baseUrl}/adminstats/toptendisliked`)
    .set('Authorization', `Bearer ${jwt}`)
    .then(response => {
      dispatch({
        type: TOP_TEN_DISLIKED_FETCHED,
        payload: response.body
      })
    })
}

export const getMostActiveUsers = () => (dispatch, getState) => {
  const state = getState()
  const jwt = state.loginSuccess.jwt
  request
    .get(`${baseUrl}/adminstats/mostactiveusers`)
    .set('Authorization', `Bearer ${jwt}`)
    .then(response => {
      dispatch({
        type: MOST_ACTIVE_USERS,
        payload: response.body
      })
    })
}

export const getMatches = userPrefs => (dispatch, getState) => {
  const state = getState()
  const myPrefs = state.userDetails.preferences.map(element => element.breed)

  const scores = []
  userPrefs.forEach(user => {
    let result = {}
    result.name = user.user
    result.score = user.breeds
      .map(breed => (myPrefs.includes(breed) ? 1 : 0))
      .reduce((a, b) => a + b, 0)
    scores.push(result)
  })
  dispatch({
    type: FETCHED_TOP_10_MATCHES,
    payload: scores
      .filter(score => score.name !== state.userDetails.name)
      .sort((a, b) => b.score - a.score)
      .slice(0, 5)
  })
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
