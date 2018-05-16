import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { login } from '../actions/users'

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
      <form onSubmit={this.handleSubmit}>
        <div>
          <label htmlFor="email"><p>Email</p></label>
          <input
            type="email"
            name="email"
            id="email"
            value={this.state.email || ''}
            onChange={this.handleChange}
          />
        </div>

        <div>
          <label htmlFor="password"><p>Password</p></label>
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
    )
  }
}

export default connect(null, { login })(LoginForm)
