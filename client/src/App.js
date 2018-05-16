import React, { Component } from 'react'
// import './styling/App.css'
import Viewer from './containers/Viewer'
import MainContainer from './containers/MainContainer'
class App extends Component {
  render() {
    return (
      <div className="App">
        <MainContainer className="MainContainer"/>
      </div>
    )
  }
}

export default App
