import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Main from './Main'
import Test from './Test'
import { setCurrentPage } from '../actions/setCurrentPage'
import { connect } from 'react-redux'
import Viewer from './Viewer'
import LoginForm_component from '../components/LoginForm_component'
// import { setCurrentPage } from '../actions/setCurrentPage'


class MainContainer extends PureComponent {
  state = {
    currentPage: 'main'
  }
  static propTypes = {
    currentPage: PropTypes.string.isRequired
  }

pageview = () => {
  if (this.state.currentPage === 'main'){
    return <Viewer/>
  } if (this.state.currentPage === 'test'){
    return <LoginForm_component/>
  }
}

handleClick = (e) => {
  const {name} = e.target
  this.setState ({
    currentPage: name
  })
}

  render() {

    return (
      <div className="Hcontainer">

        <header className="App-header">
          <h1 className="App-title">
            HUMPER
          </h1>
        </header>

        <div id="leftSpace"></div>
        {this.pageview()}

        <div id="rightSpace"></div>
        <div id="footer">
          <button name="test" onClick={this.handleClick}>matches</button>
          <button name="main" onClick={this.handleClick}>dogs</button>

        </div>

      </div>
    )}
  }




  const mapStateToProps = (reduxState) => {
    return {
      currentPage: reduxState.currentPage,
    }
  }


export default connect(mapStateToProps, { setCurrentPage })(MainContainer)
