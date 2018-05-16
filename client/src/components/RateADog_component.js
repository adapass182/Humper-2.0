import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { getDog, rateDog } from '../actions/rateDog'

class RateADog extends PureComponent {
  componentWillMount() {
    this.props.getDog()
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
        <img src={this.props.fetchedImage.img} alt="current dog" />
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
    )
  }
}

function mapStateToProps({ fetchedImage }) {
  return { fetchedImage }
}

export default connect(mapStateToProps, { getDog, rateDog })(RateADog)
