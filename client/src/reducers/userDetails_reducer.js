import { USER_LOGIN_SUCCESS } from '../actions/users'
import { FETCHED_PREFS } from '../actions/rateDog'

export default function(state = null, action) {
  switch (action.type) {
    case USER_LOGIN_SUCCESS:
      return { username: action.payload.username, preferences: [] }
    case FETCHED_PREFS:
      return { username: state.username, preferences: [...action.payload] }
    default:
      return state
  }
}
