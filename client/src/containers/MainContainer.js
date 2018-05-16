import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Main from './Main'
import Test from './Test'
import { setCurrentPage } from '../actions/setCurrentPage'
import { connect } from 'react-redux'
import Viewer from './Viewer'
import LoginForm_component from '../components/LoginForm_component'
import MatchesPage_component from '../components/MatchesPage_component'
import ProfilePage_component from '../components/ProfilePage_component'
// import { setCurrentPage } from '../actions/setCurrentPage'

class MainContainer extends PureComponent {
  constructor(props) {
    super(props)
    this.state = { currentPage: 'main' }
  }
  // state = {
  //   currentPage: 'main'
  // }

  // PROP-TYPES are only related to props passed in from state, either Redux state or parent state.

  // static propTypes = {
  //   currentPage: PropTypes.string.isRequired
  // }

  pageview = () => {
    if (!this.props.loginSuccess) {
      return <LoginForm_component />
    }
    if (this.state.currentPage === 'login') {
      return <LoginForm_component />
    }
    if (this.state.currentPage === 'main') {
      return <Viewer />
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

  render() {
    return (
      <div className="Hcontainer">
        <header className="App-header">
          <h1 className="App-title">HUMPER</h1>
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
            <button name="login" onClick={this.handleClick}>
              login
            </button>
          )}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return { loginSuccess: state.loginSuccess }
}

export default connect(mapStateToProps)(MainContainer)
