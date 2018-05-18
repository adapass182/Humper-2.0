import {
  NO_USER,
  USER_REGISTER_SUCCESS,
  TO_LOGIN,
  USER_LOGOUT_SUCCESS
} from '../actions/users'

export default function(state = true, action) {
  switch (action.type) {
    case NO_USER:
      return false
    case USER_REGISTER_SUCCESS:
      return true
    case TO_LOGIN:
      return true
    case USER_LOGOUT_SUCCESS:
      return true
    default:
      return state
  }
}
