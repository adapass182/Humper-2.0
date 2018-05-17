import { USER_REGISTER_SUCCESS, USER_REGISTER_FAILED } from '../actions/users'

export default function(state = false, action) {
  switch (action.type) {
    case USER_REGISTER_SUCCESS:
      return true
    default:
      return state
  }
}
