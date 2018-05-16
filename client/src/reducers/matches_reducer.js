import { MATCHES_FETCHED } from '../actions/matches'

export default function(state = {}, action) {
  switch (action.type) {
    case MATCHES_FETCHED:
      return action.payload
    default:
      return state
  }
}
