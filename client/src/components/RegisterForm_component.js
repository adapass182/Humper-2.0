import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { register } from '../actions/users'

class RegisterForm extends PureComponent {
  state = {}

  handleSubmit = e => {
    e.preventDefault()
    console.log(
      this.state.email,
      this.state.password,
      this.state.password_confirm
    )
    this.props.register(
      this.state.email,
      this.state.password,
      this.state.password_confirm
    )
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

        <div>
          <label htmlFor="password_confirm">Confirm Password</label>
          <input
            type="password"
            name="password_confirm"
            id="password_confirm"
            value={this.state.password_confirm || ''}
            onChange={this.handleChange}
          />
        </div>

        <button type="submit">Register</button>
      </form>
    )
  }
}

export default connect(null, { register })(RegisterForm)