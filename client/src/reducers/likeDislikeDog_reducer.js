import { LIKE_DOG, DISLIKE_DOG } from '../actions/rateDog'

export default (state = [], { type, payload }) => {
  switch (type) {
    case LIKE_DOG:
      if (state.length === 0) {
        return [payload]
      } else if (state.filter(e => e.breed === payload.breed).length > 0) {
        let copy = [...state, payload]
        let filtered1 = copy.filter(e => e.breed !== payload.breed)
        let filtered2 = copy.filter(e => e.breed === payload.breed)
        let vals = []
        filtered2.forEach(v => vals.push(v.val))
        let newTotal = vals.reduce((a, b) => a + b, 0)
        let newPayload = {}
        newPayload.breed = payload.breed
        newPayload.val = newTotal
        return [...filtered1, newPayload]
      } else {
        return [...state, payload]
      }
    case DISLIKE_DOG:
      if (state.length === 0) {
        return [payload]
      } else if (state.filter(e => e.breed === payload.breed).length > 0) {
        let copy = [...state, payload]
        let filtered1 = copy.filter(e => e.breed !== payload.breed)
        let filtered2 = copy.filter(e => e.breed === payload.breed)
        let vals = []
        filtered2.forEach(v => vals.push(v.val))
        let newTotal = vals.reduce((a, b) => a + b, 0)
        let newPayload = {}
        newPayload.breed = payload.breed
        newPayload.val = newTotal
        return [...filtered1, newPayload]
      } else {
        return [...state, payload]
      }
    default:
      return [...state]
  }
}
