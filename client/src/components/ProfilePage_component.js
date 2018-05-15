import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

import LoginForm from './LoginForm_component'

class ProfilePage extends PureComponent {

	render() {
		return (
			<div>
				<h1>UserName</h1>
        <h2>Account info</h2>
        <ul>
          <li>Name</li>
          <li>Email</li>
          <li>Some other user info</li>
        </ul>
        <h2>Top dogs</h2>
        <ul>
          {this.state.likeOrDislike.map( object =>
            <TopDogs
              key={}
              breed={object.breed}
              value={object.value}
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

export default connect(mapStateToProps, {})(ProfilePage)
