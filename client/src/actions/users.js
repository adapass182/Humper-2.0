import * as request from 'superagent'

//const baseUrl = ( process.env.BASEURL ? process.env.BASEURL : 'http://localhost:8080' )
const baseUrl = process.env.API_URL
  ? process.env.API_URL
  : 'http://localhost:8080'

export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS'
export const USER_LOGIN_FAILED = 'USER_LOGIN_FAILED'
export const USER_LOGOUT_SUCCESS = 'USER_LOGOUT_SUCCESS'
export const USER_REGISTER_SUCCESS = 'USER_REGISTER_SUCCESS'
export const USER_REGISTER_FAILED = 'USER_REGISTER_FAILED'
export const NO_USER = 'NO_USER'
export const TO_LOGIN = 'TO_LOGIN'
export const FETCHED_USER_STATS = 'FETCHED_USER_STATS'
export const FETCHED_USERS = 'FETCHED_USERS'
export const PULL_FIRST_DOG = 'PULL_FIRST_DOG'

export const login = (email, password) => dispatch => {
  request
    .post(`${baseUrl}/logins`)
    .send({ email, password })
    .then(result => {
      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: result.body
      })
    })
    .catch(err => {
      console.log('Catch error: ', err)
      dispatch({
        type: USER_LOGIN_FAILED,
        payload: err.response.body.message || 'Unknown error'
      })
    })
}

export const logout = () => {
  return {
    type: USER_LOGOUT_SUCCESS
  }
}

export const pullFirstDog = () => {
  return {
    type: PULL_FIRST_DOG
  }
}

export const register = (
  firstname,
  lastname,
  email,
  password,
  password_confirm
) => dispatch => {
  if (password === password_confirm) {
    request
      .post(`${baseUrl}/users`)
      .send({ firstname, lastname, email, password })
      .then(result => {
        dispatch({
          type: USER_REGISTER_SUCCESS,
          payload: result.body
        })
      })
      .catch(err => {
        console.log('Catch error: ', err)
        dispatch({
          type: USER_REGISTER_FAILED,
          payload: err.response.body.message || 'Unknown error'
        })
      })
  } else {
    dispatch({
      type: USER_REGISTER_FAILED,
      payload: "Passwords don't match. Please try again"
    })
  }
}

export const noUser = () => {
  return {
    type: NO_USER
  }
}

export const toLoginPage = () => {
  return {
    type: TO_LOGIN
  }
}

export const getUserStats = () => (dispatch, getState) => {
  const state = getState()
  const jwt = state.loginSuccess.jwt

  request
    .get(`${baseUrl}/users`)
    .set('Authorization', `Bearer ${jwt}`)
    .then(result => {
      dispatch({
        type: FETCHED_USER_STATS,
        payload: result.body.length
      })
    })
}

export const getUsers = () => (dispatch, getState) => {
  const state = getState()
  const jwt = state.loginSuccess.jwt

  request
    .get(`${baseUrl}/users`)
    .set('Authorization', `Bearer ${jwt}`)
    .then(result => {
      dispatch({
        type: FETCHED_USERS,
        payload: result.body
      })
    })
}
