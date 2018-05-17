import { FETCHED_USER_STATS } from '../actions/users'
import { FETCHED_DOG_STATS } from '../actions/rateDog'
import { TOP_TEN_LIKED_FETCHED, TOP_TEN_DISLIKED_FETCHED, MOST_ACTIVE_USERS } from '../actions/matches'

export default (state = { totalUsers: 0, totalDogs: 0, topTenLike: [], topTenDislike: [], mostActive: [{}, {}] }, { type, payload }) => {
  switch (type) {
    case FETCHED_USER_STATS:
      return {
        totalUsers: payload,
        totalDogs: state.totalDogs
      }
    case FETCHED_DOG_STATS:
      return {
        totalUsers: state.totalUsers,
        totalDogs: payload
      }
    case TOP_TEN_LIKED_FETCHED:
      return {
        ...state,
        topTenLike: payload.topTenLiked
      }
    case TOP_TEN_DISLIKED_FETCHED:
      return {
        ...state,
        topTenDislike: payload.topTenDisliked
      }
    case MOST_ACTIVE_USERS:
      return {
        ...state,
        mostActive: payload.mostActiveUsers
      }
    default:
      return state
  }
}
