import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { setCurrentPage } from '../actions/setCurrentPage'
import { connect } from 'react-redux'
import RateADog_component from '../components/RateADog_component'
import LoginForm_component from '../components/LoginForm_component'
import RegisterForm_component from '../components/RegisterForm_component'
import MatchesPage_component from '../components/MatchesPage_component'
import ProfilePage_component from '../components/ProfilePage_component'
import { login, noUser } from '../actions/users'


class MainContainer extends PureComponent {
  constructor(props) {
    super(props)
    this.state = { currentPage: 'main' }
  }

  componentWillMount() {
    this.props.login('secondUser@humper.com', 'password')
  }

  pageview = () => {
    if (!this.props.loginSuccess && this.props.userExists) {
      return <LoginForm_component />
    }
    if (!this.props.loginSuccess && !this.props.userExists) {
      return <RegisterForm_component />
    }

    if (this.state.currentPage === 'main') {
      return <RateADog_component />
    }
    if (this.state.currentPage === 'profile') {
      return <ProfilePage_component />
    }
    if (this.state.currentPage === 'matches') {
      return <MatchesPage_component />
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
      <div className="Hcontainer">
        <header className="App-header">
          <h1 className="App-title">Humper</h1>
        </header>

        <div id="leftSpace" />
        {this.pageview()}

        <div id="rightSpace" />
        <div id="footer">
          {this.props.loginSuccess && (
            <div>
              <button name="profile" onClick={this.handleClick}>
                profile
              </button>
              <button name="main" onClick={this.handleClick}>
                dogs
              </button>
              <button name="matches" onClick={this.handleClick}>
                matches
              </button>
            </div>
          )}
          {!this.props.loginSuccess && (
            <button name="register" onClick={this.handleClickUser}>
              register
            </button>
          )}
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ loginSuccess, userExists }) => {
  return { loginSuccess, userExists }
}

export default connect(mapStateToProps, { login, noUser })(MainContainer)
