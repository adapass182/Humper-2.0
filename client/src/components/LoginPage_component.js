import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

import LoginForm from './LoginForm_component'

class LoginPage extends PureComponent {

	handleSubmit = (data) => {
    console.log(data)
		this.props.login(data.email, data.password)
	}

	render() {
		return (
			<div>
				<h1>Login</h1>
				<LoginForm onSubmit={this.handleSubmit} />
			</div>
		)
	}
}

const mapStateToProps = function (state) {
	return {
    login = state.login
	}
}

export default connect(mapStateToProps, {login})(LoginPage)
