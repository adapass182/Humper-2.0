import {
  USER_LOGIN_FAILED,
  USER_REGISTER_SUCCESS,
  USER_LOGOUT_SUCCESS
} from '../actions/users'

export default function(state = null, action) {
  switch (action.type) {
    case USER_LOGIN_FAILED:
      return {
        error: action.payload
      }
    case USER_REGISTER_SUCCESS:
      return null
    case USER_LOGOUT_SUCCESS:
      return null
    default:
      return state
  }
}
