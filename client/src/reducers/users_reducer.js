import { FETCHED_USERS, USER_LOGOUT_SUCCESS } from '../actions/users'

export default function(state = [], action) {
  switch (action.type) {
    case FETCHED_USERS:
      return action.payload
    case USER_LOGOUT_SUCCESS:
      return []
    default:
      return state
  }
}
