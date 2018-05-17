import { FETCHED_USER_PREFS } from '../actions/rateDog'

export default function(state = [], action) {
  switch (action.type) {
    case FETCHED_USER_PREFS:
      return [...state, action.payload].filter(
        element => element.breeds.length > 0
      )
    default:
      return state
  }
}
