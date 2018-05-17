import { FETCHED_TOP_10_MATCHES } from '../actions/matches'

export default function(state = [], action) {
  switch (action.type) {
    case FETCHED_TOP_10_MATCHES:
      return action.payload
    default:
      return state
  }
}
