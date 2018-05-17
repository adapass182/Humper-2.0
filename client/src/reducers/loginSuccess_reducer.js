import { USER_LOGIN_SUCCESS } from '../actions/users'
import { USER_LOGOUT_SUCCESS } from '../actions/users'

export default function(state = null, action) {
  switch (action.type) {
    case USER_LOGIN_SUCCESS:
      return { jwt: action.payload.jwt }
    case USER_LOGOUT_SUCCESS:
      return state = null
    default:
      return state
  }
}
