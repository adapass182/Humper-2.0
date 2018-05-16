import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { getUserStats } from '../actions/users'
import { getDogStats } from '../actions/rateDog'

class AdminDashboard extends PureComponent {
  componentWillMount() {
    this.props.getUserStats()
    this.props.getDogStats()
  }

  render() {
    return (
      <div>
        <h2>Admin Dashboard</h2>
        <ul>
          <li>Total Users: {this.props.adminStats.totalUsers}</li>
          <li>Total Dogs Liked: {this.props.adminStats.totalDogs}</li>
        </ul>
      </div>
    )
  }
}

const mapStateToProps = ({ adminStats }) => {
  return { adminStats }
}

export default connect(mapStateToProps, { getUserStats, getDogStats })(
  AdminDashboard
)
