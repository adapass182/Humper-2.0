import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

class MatchesList extends PureComponent {

	render() {
		return (
      <li className="Matches">
        <p>TopDogs!</p>
      </li>
		)
	}
}

const mapStateToProps = function (state) {
	return {

	}
}

export default connect(mapStateToProps, {})(MatchesList)
