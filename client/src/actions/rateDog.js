import * as request from 'superagent'

const dogApiUrl = 'https://dog.ceo/api/breeds/image/random'

export const FETCHED_IMAGE = 'FETCHED_IMAGE'
export const LIKE_DOG = 'LIKE_DOG'
export const DISLIKE_DOG = 'DISLIKE_DOG'

export const getDog = () => (dispatch) => {
  request 
    .get(`${dogApiUrl}`)
    .then(response => dispatch({
      type: 'FETCHED_IMAGE',
      payload: {
        img: response.body.message,
        breed: response.body.message.split('/')[4]
      }
    }))
    .catch(err => alert(err))
}

export const rateDog = (breed, opinion) => dispatch => {
  const likeOrDislike = (opinion) === 'Like' ? LIKE_DOG : DISLIKE_DOG 
  const val = ( (opinion) === 'Like' ? 1 : -1 )
  dispatch({
    type: likeOrDislike,
    payload: {
      breed,
      val
    }
  })
}

