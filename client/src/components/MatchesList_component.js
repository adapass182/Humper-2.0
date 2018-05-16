import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

class MatchesList extends PureComponent {
  render() {
    return (
      <li className="Matches">
        <p>TopDogs!</p>
      </li>
    )
  }
}

const mapStateToProps = function(state) {
  return {}
}

export default connect(mapStateToProps, {})(MatchesList)
