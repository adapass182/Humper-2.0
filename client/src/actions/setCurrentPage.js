export const SET_CUR_PAGE =  'SET_CUR_PAGE'

export const setCurrentPage = (currentPage) => {
console.log(currentPage);
  return {
    type: 'SET_CUR_PAGE',
    payload:
      currentPage
  }
}
