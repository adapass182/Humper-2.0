import { USER_REGISTER_FAILED, USER_LOGOUT_SUCCESS } from '../actions/users'

export default function(state = null, action) {
  switch (action.type) {
    case USER_REGISTER_FAILED:
      return {
        error: action.payload
      }
    case USER_LOGOUT_SUCCESS:
      return null
    default:
      return state
  }
}
