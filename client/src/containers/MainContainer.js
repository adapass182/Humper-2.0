import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import AdminDashboard from '../components/AdminDashboard_component'
import { login, noUser } from '../actions/users'
// import humperIcon from "../images/humperIcon"

import LoginForm from '../components/LoginForm_component'
import RegisterForm from '../components/RegisterForm_component'
import MatchesPage from '../components/MatchesPage_component'
import ProfilePage from '../components/ProfilePage_component'
import RateADog from '../components/RateADog_component'

class MainContainer extends PureComponent {
  constructor(props) {
    super(props)
    this.state = { currentPage: 'rateADog' }
  }

  componentWillMount() {
    this.props.login('secondUser@humper.com', 'password')
  }

  pageview = () => {
    if (!this.props.loginSuccess && this.props.userExists) {
      return <LoginForm className="content" />
    }
    if (!this.props.loginSuccess && !this.props.userExists) {
      return <RegisterForm className="content" />
    }
    if (this.state.currentPage === 'rateADog') {
      return <RateADog className="content" id="dogPic" />
    }
    if (this.state.currentPage === 'profile') {
      return <ProfilePage className="content" />
    }
    if (this.state.currentPage === 'matches') {
      return <MatchesPage className="content" />
    }
    if (this.state.currentPage === 'admin') {
      return <AdminDashboard />
    }
  }

  handleClick = e => {
    const { name } = e.target
    this.setState({
      currentPage: name
    })
  }

  handleClickUser = () => {
    console.log("I've been clicked!")
    this.props.noUser()
  }

  render() {
    return (
      <div className="MainContainer">
        <header className="headerContainer">
          <h1 className="App-title">Humper</h1>
          <img
            src={require('../images/humperIcon.png')}
            alt="humper icon"
            className="humperIcon"
          />
        </header>

        <div id="leftSpace" />

        {this.pageview()}

        <div id="rightSpace" />

        <div className="footer">
          {this.props.loginSuccess && (
            <div>
              <button
                className="navButton"
                name="profile"
                onClick={this.handleClick}>
                profile
              </button>
              <button
                className="navButton"
                id="rateADogButton"
                name="rateADog"
                onClick={this.handleClick}>
                rate a dog
              </button>
              <button
                className="navButton"
                name="matches"
                onClick={this.handleClick}>
                matches
              </button>
              {this.props.userDetails.admin && (
                <button
                  name="admin"
                  className="navButton"
                  onClick={this.handleClick}>
                  admin
                </button>
              )}
            </div>
          )}
          {!this.props.loginSuccess &&
            this.props.userExists && (
              <button
                name="register"
                className="navButton"
                onClick={this.handleClickUser}>
                Create Account
              </button>
            )}
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ loginSuccess, userExists, userDetails }) => {
  return { loginSuccess, userExists, userDetails }
}

export default connect(mapStateToProps, { login, noUser })(MainContainer)
