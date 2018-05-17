import { USER_REGISTER_FAILED } from '../actions/users'

export default function(state = null, action) {
  switch (action.type) {
    case USER_REGISTER_FAILED:
      console.log('Reducer: ', action.payload)
      return {
        error: action.payload
      }

    default:
      return state
  }
}
