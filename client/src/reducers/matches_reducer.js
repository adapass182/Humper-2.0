import { MATCHES_FETCHED } from '../actions/matches'
import { USER_LOGOUT_SUCCESS } from '../actions/users'

export default function(state = {}, action) {
  switch (action.type) {
    case MATCHES_FETCHED:
      return action.payload
    case USER_LOGOUT_SUCCESS:
      return {}
    default:
      return state
  }
}
