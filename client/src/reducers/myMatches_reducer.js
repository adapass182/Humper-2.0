import { FETCHED_TOP_10_MATCHES } from '../actions/matches'
import { USER_LOGOUT_SUCCESS } from '../actions/users'

export default function(state = [], action) {
  switch (action.type) {
    case FETCHED_TOP_10_MATCHES:
      return action.payload
    case USER_LOGOUT_SUCCESS:
      return []
    default:
      return state
  }
}
