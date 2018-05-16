import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { register } from '../actions/users'

class FirstLogin extends PureComponent {

  registerpageview = () => {
    if (this.props.registerSuccess === true) {
      console.log(this.props.registerSuccess)
      return <p>Registration successful, please login:</p>
    } else {
      console.log(this.props.registerSuccess)
      return <p>Please enter your login information:</p>
    }
  }

  render() {
    return (
      <div>
        {this.registerpageview()}
      </div>
    )
  }
}

const mapStateToProps = ({ registerSuccess }) => {
  return { registerSuccess }
}

export default connect(mapStateToProps, { register })(FirstLogin)
