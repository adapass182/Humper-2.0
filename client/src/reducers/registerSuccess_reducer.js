import { USER_REGISTER_SUCCESS, USER_LOGOUT_SUCCESS } from '../actions/users'

export default function(state = false, action) {
  switch (action.type) {
    case USER_REGISTER_SUCCESS:
      return true
    case USER_LOGOUT_SUCCESS:
      return false
    default:
      return state
  }
}
