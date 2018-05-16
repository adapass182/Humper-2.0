import React, { PureComponent } from 'react'

import { connect } from 'react-redux'
import { login } from '../actions/users'

import FirstLogin from './FirstLogin_component'

class LoginForm extends PureComponent {
  state = {}

  handleSubmit = e => {
    e.preventDefault()
    console.log(this.state.email, this.state.password)
    this.props.login(this.state.email, this.state.password)
  }

  handleChange = event => {
    const { name, value } = event.target

    this.setState({
      [name]: value
    })
  }

  render() {
    return (
      <div>
        <FirstLogin />
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={this.state.email || ''}
              onChange={this.handleChange}
            />
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              value={this.state.password || ''}
              onChange={this.handleChange}
            />
          </div>
          <button type="submit">Login</button>
        </form>
        <p>Need to create an account? Use the button below!</p>
      </div>
    )
  }
}

export default connect(null, { login })(LoginForm)
