import { FETCHED_USERS } from '../actions/users'

export default function(state = [], action) {
  switch (action.type) {
    case FETCHED_USERS:
      return action.payload
    default:
      return state
  }
}
