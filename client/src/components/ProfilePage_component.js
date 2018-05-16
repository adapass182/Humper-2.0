import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { getPrefs } from '../actions/rateDog'

import TopDogs from './TopDogs_component'

class ProfilePage extends PureComponent {
  componentWillMount() {
    this.props.getPrefs()
  }

  render() {
    return (
      <div>
        <h2>Account info</h2>
        <ul>
          <li>Name: {this.props.userDetails.name}</li>
          <li>Email: {this.props.userDetails.username}</li>
        </ul>
        <h2>Top dogs</h2>
        <ul>
          {this.props.userDetails.preferences.map(element => {
            return <li key={element.id}>{element.breed}</li>
          })}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = ({ loginSuccess, userDetails }) => {
  return { loginSuccess, userDetails }
}

export default connect(mapStateToProps, { getPrefs })(ProfilePage)
