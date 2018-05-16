import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { getDog, rateDog } from '../actions/rateDog'
import { pullFirstDog } from '../actions/users'

class RateADog extends PureComponent {

  componentWillMount() {
    if (this.props.pullFirstDogState) {
      console.log(`First dog:` + this.props.pullFirstDogState)
      this.props.getDog()
      this.props.pullFirstDog()
      console.log(`First dog pls`)
    }
    if (!this.props.pullFirstDogState) {
      console.log(`No more dog pls`)
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
      <div className="dogPicContainer">

        <img className="dogPic"src={this.props.fetchedImage.img} alt="current dog" />

      <div>
        <div className="voteButtonContainer">
          <button
            className="voteButton"
            id="dislikeButton"
            onClick={this.handleDislike.bind(this)}>
            No Like
          </button>
          <button
            className="voteButton"
            id="likeButton"
            onClick={this.handleLike.bind(this)}>
            Like
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

export default connect(mapStateToProps, { getDog, rateDog, pullFirstDog })(RateADog)
