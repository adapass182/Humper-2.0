
export default (state = 'main', { type, payload } = {}) => {
  switch (type) {
  case 'SET_CUR_PAGE':
    return payload
  default:
    return state
  }
}
