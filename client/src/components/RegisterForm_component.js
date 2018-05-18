import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { register } from '../actions/users'

class RegisterForm extends PureComponent {
  state = {}

  handleSubmit = e => {
    e.preventDefault()
    if (
      this.state.email &&
      this.state.password &&
      this.state.password_confirm
    ) {
      this.props.register(
        this.state.firstname,
        this.state.lastname,
        this.state.email,
        this.state.password,
        this.state.password_confirm
      )
    }
  }

  handleChange = event => {
    const { name, value } = event.target
    event.target.setCustomValidity('')
    if (!event.target.validity.valid) {
      event.target.setCustomValidity(
        'Password must be at least 8 characters long, with at least one letter and one number'
      )
    }
    this.setState({
      [name]: value
    })
  }

  handleChangeEmail = event => {
    const { name, value } = event.target
    event.target.setCustomValidity('')
    if (!event.target.validity.valid) {
      event.target.setCustomValidity(
        'Please enter a valid email address'
      )
    }
    this.setState({
      [name]: value
    })
  }

  handleChangeConfirm = event => {
    const { name, value } = event.target
    event.target.setCustomValidity('')
    if (!event.target.validity.valid) {
      event.target.setCustomValidity(
        'Please confirm your password'
      )
    }
    this.setState({
      [name]: value
    })
  }

  handleChangeName = event => {
    const { name, value } = event.target
    event.target.setCustomValidity('')
    if (!event.target.validity.valid) {
      event.target.setCustomValidity(
        'Please enter your name'
      )
    }
    this.setState({
      [name]: value
    })
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div>
            <p htmlFor="firstname">First Name:</p>
            <input
              type="text"
              name="firstname"
              id="firstname"
              required="required"
              value={this.state.firstname || ''}
              onChange={this.handleChangeName}
            />
          </div>

          <div>
            <p htmlFor="lastname">Last Name:</p>
            <input
              type="text"
              name="lastname"
              id="lastname"
              required="required"
              value={this.state.lastname || ''}
              onChange={this.handleChangeName}
            />
          </div>

          <div>
            <p htmlFor="email">Email</p>
            <input
              type="email"
              pattern="(?!(^[.-].*|[^@]*[.-]@|.*\.{2,}.*)|^.{254}.)([a-zA-Z0-9!#$%&'*+\/=?^_`{|}~.-]+@)(?!-.*|.*-\.)([a-zA-Z0-9-]{1,63}\.)+[a-zA-Z]{2,15}"
              name="email"
              id="email"
              required="required"
              value={this.state.email || ''}
              onChange={this.handleChangeEmail}
            />
          </div>

          <div>
            <p htmlFor="password">Password</p>
            <input
              type="password"
              pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"
              name="password"
              id="password"
              required="required"
              value={this.state.password || ''}
              onChange={this.handleChange}
            />
          </div>

          <div>
            <p htmlFor="password_confirm">Confirm Password</p>
            <input
              type="password"
              name="password_confirm"
              id="password_confirm"
              required="required"
              value={this.state.password_confirm || ''}
              onChange={this.handleChangeConfirm}
            />
          </div>
          <button id="button" className="SubmitButton" type="submit">
            Register
          </button>
        </form>
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
