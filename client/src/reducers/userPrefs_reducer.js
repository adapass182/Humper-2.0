import { FETCHED_USER_PREFS } from '../actions/rateDog'
import { USER_LOGOUT_SUCCESS } from '../actions/users'

export default function(state = [], action) {
  switch (action.type) {
    case FETCHED_USER_PREFS:
      return [...state, action.payload].filter(
        element => element.breeds.length > 0
      )
    case USER_LOGOUT_SUCCESS:
      return []
    default:
      return state
  }
}
