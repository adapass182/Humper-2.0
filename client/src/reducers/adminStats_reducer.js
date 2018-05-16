import { FETCHED_USER_STATS } from '../actions/users'
import { FETCHED_DOG_STATS } from '../actions/rateDog'

export default (state = { totalUsers: 0, totalDogs: 0 }, { type, payload }) => {
  switch (type) {
    case FETCHED_USER_STATS:
      return {
        totalUsers: state.totalUsers,
        totalDogs: state.totalDogs
      }
    case FETCHED_DOG_STATS:
      return {
        totalUsers: state.totalUsers,
        totalDogs: state.totalDogs
      }
    default:
      return state
  }
}
