import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {getMatch} from '../actions/matches'

import MatchesList from './MatchesList_component'

class MatchesPage extends PureComponent {

  componentWillMount() {
    this.props.getMatch()
  }

	render() {
    const props = this.props

		return (
			<div>
				<h1>Your matches</h1>
      <h2>Matches page!</h2>
      <p>Hey there, {props.currUser ?  props.currUser.firstname : null} !</p>
      <p>You have liked {props.currUser ? props.currUser.ct : null} dogs so far.</p>
      <p>We've found the below user who likes dogs almost as much as you do: </p>
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
