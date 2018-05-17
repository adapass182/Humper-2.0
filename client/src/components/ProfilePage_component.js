import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { getPrefs } from '../actions/rateDog'

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
            return (
              <li key={element.breed}>
                Breed: {element.breed}, Score: {element.count}
              </li>
            )
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
