import { USER_REGISTER_SUCCESS, USER_REGISTER_FAILED } from '../actions/users'

export default function(state = false, action) {
  switch (action.type) {
    case USER_REGISTER_SUCCESS:
      return true
    case USER_REGISTER_FAILED:
      console.log(action.payload)
      return false
    default:
      return state
  }
}
