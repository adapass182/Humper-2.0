import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {getMatch} from '../actions/matches'
import MatchesList from './MatchesList_component'
import UserCardComponent from './UserCardComponent'

class MatchesPage extends PureComponent {
  // <p>Hey there, {props.currUser ?  props.currUser.firstname : null} !</p>

  componentWillMount() {
    this.props.getMatch()
  }

	render() {
    const props = this.props
		return (
			<div className="matchesPageContainer">
				<h2>Your matches!</h2>

          <p>Wow! You have liked</p>
          <p id="matchScore">{props.currUser ? props.currUser.ct : null} </p>
          <p>dogs already!</p>
          <p>A user with a similar love of dogs is:</p>
          <UserCardComponent/>
        <p>{props.match ? props.match.firstname : null} who liked {props.match ? props.match.ct : null} dogs.</p>
        <p>Send a mail here to get in touch: {props.match ? props.match.email : null} </p>
  			</div>
		)
	}
}

const mapStateToProps = function (state) {
	return {
    currUser: state.matches.currentUser,
    match: state.matches.matchingUser
	}
}

export default connect(mapStateToProps, {getMatch})(MatchesPage)
