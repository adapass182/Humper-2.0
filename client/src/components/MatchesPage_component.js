import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {getMatch} from '../actions/matches'
import {getPrefs} from '../actions/rateDog'

import MatchesList from './MatchesList_component'

class MatchesPage extends PureComponent {


	render() {
		return (
			<div>
				<h1>Your matches</h1>
      <h2>Matches page!</h2>
      <p>Current username: {this.props.currentUser}</p>
      <p>You have liked x dog breeds so far.</p>
      <button onClick={() => this.props.getMatch()}>get mached</button>
			</div>
		)
	}
}

const mapStateToProps = function (state) {
	return {
    currentUser: state.userDetails.username,
	}
}

export default connect(mapStateToProps, {getMatch})(MatchesPage)
