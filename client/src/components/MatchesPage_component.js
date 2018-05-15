import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

import MatchesList from './MatchesList_component'

class MatchesPage extends PureComponent {

	render() {
		return (
			<div>
				<h1>Your matches</h1>
        <ul>
          {this.state.usersMatches.map( object =>
            <MatchesList
              key={}
              name={object.name}
              topDog={object.topDog}
            />)}
        </ul>
			</div>
		)
	}
}

const mapStateToProps = function (state) {
	return {

	}
}

export default connect(mapStateToProps, {})(MatchesPage)
