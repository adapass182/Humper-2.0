import { USER_LOGIN_SUCCESS, USER_LOGOUT_SUCCESS } from '../actions/users'
import { FETCHED_PREFS } from '../actions/rateDog'

export default function(state = null, action) {
  switch (action.type) {
    case USER_LOGIN_SUCCESS:
      return {
        name: `${action.payload.firstname} ${action.payload.lastname}`,
        username: action.payload.username,
        admin: action.payload.admin,
        preferences: []
      }
    case FETCHED_PREFS:
      return {
        name: state.name,
        username: state.username,
        admin: state.admin,
        preferences: [...action.payload]
      }
    case USER_LOGOUT_SUCCESS:
      return state = null
    default:
      return state
  }
}
