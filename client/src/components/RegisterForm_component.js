import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { register } from '../actions/users'

class RegisterForm extends PureComponent {
  state = {}

  handleSubmit = e => {
    e.preventDefault()
    this.props.register(
      this.state.firstname,
      this.state.lastname,
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
      <div>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="firstname">First Name:</label>
            <input
              type="text"
              name="firstname"
              id="firstname"
              value={this.state.firstname || ''}
              onChange={this.handleChange}
            />
          </div>

          <div>
            <label htmlFor="lastname">Last Name:</label>
            <input
              type="text"
              name="lastname"
              id="lastname"
              value={this.state.lastname || ''}
              onChange={this.handleChange}
            />
          </div>

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

          <button className="SubmitButton" type="submit">
            Register
          </button>
        </form>
        <p>Need to create an account? Use the button below!</p>
        {this.props.registerFailed && (
          <p className="error-message">{this.props.registerFailed.error}</p>
        )}
      </div>
    )
  }
}

const mapStateToProps = ({ registerFailed }) => {
  return { registerFailed }
}

export default connect(mapStateToProps, { register })(RegisterForm)
