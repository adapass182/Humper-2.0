export default (state = [], { type, payload } = {}) => {
  switch (type) {
  case 'FETCHED_IMAGE':
    return payload
  default:
    return state
  }
}
