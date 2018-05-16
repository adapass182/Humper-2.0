import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
// import MatchesList from './MatchesList_component'
import UserCardComponent from './UserCardComponent'
class MatchesPage extends PureComponent {

	render() {
		return (
			<div className="matchesPageContainer">
				<h2>Your matches</h2>

				<div className="matchesPage">
					<UserCardComponent/>
					<UserCardComponent/>
				</div>
			</div>
		)
	}
}

const mapStateToProps = function (state) {
	return {

	}
}

export default connect(mapStateToProps, {})(MatchesPage)
