import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

class TopDogs extends PureComponent {
  render() {
    return (
      <li className="TopDogs">
        <p className="breed">breed</p>
        <p className="value">value</p>
      </li>
    )
  }
}

const mapStateToProps = function(state) {
  return {}
}

export default connect(mapStateToProps, {})(TopDogs)
