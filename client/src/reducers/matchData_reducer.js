import { FETCHED_USER_TOP10 } from '../actions/rateDog'

export default function(state = null, action) {
  switch (action.type) {
    case FETCHED_USER_TOP10:
      return action.payload
    default:
      return state
  }
}
