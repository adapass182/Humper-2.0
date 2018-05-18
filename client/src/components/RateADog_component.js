import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { getDog, rateDog, getPrefs } from '../actions/rateDog'
import { pullFirstDog, getUsers } from '../actions/users'
import { getTopTenLiked } from '../actions/matches'

class RateADog extends PureComponent {
  componentWillMount() {
    if (this.props.pullFirstDogState) {
      this.props.getDog()
      this.props.pullFirstDog()
      this.props.getUsers()
      this.props.getPrefs()
      this.props.getTopTenLiked()
    }
  }

  handleLike() {
    this.props.rateDog(this.props.fetchedImage.breed, 'Like')
    this.props.getDog()
  }

  handleDislike() {
    this.props.rateDog(this.props.fetchedImage.breed, 'Dislike')
    this.props.getDog()
  }

  render() {
    return (
      <div>
        <div className="dogPicContainer">
          <img
            className="dogPic"
            src={this.props.fetchedImage.img}
            alt="current dog"
          />
        </div>

        <div>
          <div className="voteButtonContainer">
            <button
              className="voteButton"
              id="dislikeButton"
              onClick={this.handleDislike.bind(this)}>
              <p>Bad Boy</p>
            </button>
            <button
              className="voteButton"
              id="likeButton"
              onClick={this.handleLike.bind(this)}>
              Good Boy
            </button>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps({ fetchedImage, pullFirstDogState }) {
  return { fetchedImage, pullFirstDogState }
}

export default connect(mapStateToProps, {
  getDog,
  rateDog,
  pullFirstDog,
  getUsers,
  getPrefs,
  getTopTenLiked
})(RateADog)
