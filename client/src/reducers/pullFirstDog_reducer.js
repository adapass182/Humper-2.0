import { PULL_FIRST_DOG } from '../actions/users'

export default function(state = true, action) {
  switch (action.type) {
    case PULL_FIRST_DOG:
      return state = false
    default:
      return state
  }
}
