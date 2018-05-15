import React, { Component } from 'react'
import './App.css'
import Viewer from './containers/Viewer'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to Humper</h1>

        </header>
        <Viewer />

      </div>
    )
  }
}

export default App
