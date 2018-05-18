import { PULL_FIRST_DOG, USER_LOGOUT_SUCCESS } from '../actions/users'

export default function(state = true, action) {
  switch (action.type) {
    case PULL_FIRST_DOG:
      return (state = false)
    case USER_LOGOUT_SUCCESS:
      return true
    default:
      return state
  }
}
