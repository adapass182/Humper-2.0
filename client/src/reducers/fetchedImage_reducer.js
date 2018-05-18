import { FETCHED_IMAGE } from '../actions/rateDog'
import { USER_LOGOUT_SUCCESS } from '../actions/users'

export default (state = [], { type, payload } = {}) => {
  switch (type) {
    case FETCHED_IMAGE:
      return payload
    case USER_LOGOUT_SUCCESS:
      return []
    default:
      return state
  }
}
