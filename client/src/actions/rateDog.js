import * as request from 'superagent'

const dogApiUrl = 'https://dog.ceo/api/breeds/image/random'
//const baseUrl = ( process.env.BASEURL ? process.env.BASEURL : 'http://localhost:8080' )
const baseUrl = process.env.API_URL
  ? process.env.API_URL
  : 'http://localhost:8080'

export const FETCHED_IMAGE = 'FETCHED_IMAGE'
export const LIKE_DOG = 'LIKE_DOG'
export const DISLIKE_DOG = 'DISLIKE_DOG'
export const POSTED_BREED = 'POSTED_BREED'
export const FETCHED_PREFS = 'FETCHED_PREFS'
export const FETCHED_DOG_STATS = 'FETCHED_DOG_STATS'

export const getDog = () => dispatch => {
  request
    .get(`${dogApiUrl}`)
    .then(response =>
      dispatch({
        type: FETCHED_IMAGE,
        payload: {
          img: response.body.message,
          breed: response.body.message.split('/')[4]
        }
      })
    )
    .catch(err => alert(err))
}

export const getPrefs = () => (dispatch, getState) => {
  const state = getState()
  const jwt = state.loginSuccess.jwt

  request
    .get(`${baseUrl}/preferences`)
    .set('Authorization', `Bearer ${jwt}`)
    .then(response => {
      response => console.log(response),
        dispatch({
          type: FETCHED_PREFS,
          payload: response.body
        })
    })
    .catch(err => alert(err))
}

export const rateDog = (breed, opinion) => (dispatch, getState) => {
  const state = getState()
  const jwt = state.loginSuccess.jwt
  const likeOrDislike = opinion === 'Like' ? LIKE_DOG : DISLIKE_DOG
  const val = opinion === 'Like' ? 1 : -1

  request
    .post(`${baseUrl}/preferences`)
    .set('Authorization', `Bearer ${jwt}`)
    .send({ breed, val })
    .then(response => console.log(response))
}

export const getDogStats = () => (dispatch, getState) => {
  const state = getState()
  const jwt = state.loginSuccess.jwt

  request
    .get(`${baseUrl}/preferences`)
    .set('Authorization', `Bearer ${jwt}`)
    .then(response => {
      console.log(response)
      dispatch({
        type: FETCHED_DOG_STATS,
        payload: response.body
      })
    })
}
