import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { getPrefs } from '../actions/rateDog'

class ProfilePage extends PureComponent {
  componentWillMount() {
    this.props.getPrefs()
  }
  s

  render() {
    return (
      <div className="profilePageContainer">
        <div className="accountInfoContainer">
          <h2>Account info</h2>
          <ul>
            <li>Name: {this.props.userDetails.name}</li>
            <li>Email: {this.props.userDetails.username}</li>
          </ul>
        </div>
        <h2>Top dogs</h2>
        <ul>
          {this.props.userDetails.preferences.map(element => {
            return (
              <li key={element.breed}>
                <p>
                  {' '}
                  <a className="breed"> {element.breed}</a>, Likes:{' '}
                  {element.count}
                </p>
              </li>
            )
          })}
        </ul>
        {this.props.userDetails.admin && (
          <button
            name="admin"
            id="button"
            onClick={this.props.onClickAdmin}>
            Admin
          </button>
        )}
        <button
          id="button"
          name="logout"
          onClick={this.props.onClickLogout}>
          Log Out
        </button>
      </div>
    )
  }
}

const mapStateToProps = ({ userDetails }) => {
  return { userDetails }
}

export default connect(mapStateToProps, { getPrefs })(ProfilePage)
