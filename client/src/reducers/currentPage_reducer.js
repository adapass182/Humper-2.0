
export default (state = 'login', { type, payload } = {}) => {
  switch (type) {
  case 'SET_CUR_PAGE':
    return payload
  default:
    return state
  }
}
