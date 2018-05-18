import * as request from 'superagent'

const dogApiUrl = 'https://dog.ceo/api/breeds/image/random'
const baseUrl = process.env.API_URL
  ? process.env.API_URL
  : 'http://localhost:8080'

export const FETCHED_IMAGE = 'FETCHED_IMAGE'
export const POSTED_BREED = 'POSTED_BREED'
export const FETCHED_PREFS = 'FETCHED_PREFS'
export const FETCHED_DOG_STATS = 'FETCHED_DOG_STATS'
export const FETCHED_USER_PREFS = 'FETCHED_USER_PREFS'

export const getDog = () => dispatch => {
  request
    .get(`${dogApiUrl}`)
    .then(response =>
      dispatch({
        type: FETCHED_IMAGE,
        payload: {
          img: response.body.message,
          breed: response.body.message.split('/')[4].split('-')[0]
        }
      })
    )
    .catch(err => alert(err))
}

export const getPrefs = () => (dispatch, getState) => {
  const state = getState()
  const jwt = state.loginSuccess.jwt

  request
    .get(`${baseUrl}/preferences/top10`)
    .set('Authorization', `Bearer ${jwt}`)
    .then(response => {
      dispatch({
        type: FETCHED_PREFS,
        payload: response.body
      })
    })
    .catch(err => alert(err))
}

export const getUsersPrefs = () => (dispatch, getState) => {
  const state = getState()
  const jwt = state.loginSuccess.jwt
  const users = state.users
  if (state.userPrefs.length === 0) {
    users.forEach(user => {
      request
        .get(`${baseUrl}/preferences/${user.id}`)
        .set('Authorization', `Bearer ${jwt}`)
        .then(response => {
          let breeds = []
          let responses = [...response.body]
          responses.forEach(element => breeds.push(element.breed))
          dispatch({
            type: FETCHED_USER_PREFS,
            payload: {
              user: `${user.firstname} ${user.lastname}`,
              breeds: breeds
            }
          })
        })
        .catch(err => alert(err))
    })
  }
}

export const rateDog = (breed, opinion) => (dispatch, getState) => {
  const state = getState()
  const jwt = state.loginSuccess.jwt
  const val = opinion === 'Like' ? 1 : -1

  request
    .post(`${baseUrl}/preferences`)
    .set('Authorization', `Bearer ${jwt}`)
    .send({ breed, val })
    .end()
}

export const getDogStats = () => (dispatch, getState) => {
  const state = getState()
  const jwt = state.loginSuccess.jwt

  request
    .get(`${baseUrl}/preferences`)
    .set('Authorization', `Bearer ${jwt}`)
    .then(result => {
      dispatch({
        type: FETCHED_DOG_STATS,
        payload: result.body.length
      })
    })
}
