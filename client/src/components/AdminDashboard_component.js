import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { getUserStats } from '../actions/users'
import { getDogStats } from '../actions/rateDog'
import { getTopTenLiked, getTopTenDisliked, getMostActiveUsers} from '../actions/matches'

class AdminDashboard extends PureComponent {
  componentWillMount() {
    this.props.getUserStats()
    this.props.getDogStats()
  }
  componentDidMount() {

    this.props.getTopTenLiked()
    this.props.getTopTenDisliked()
    this.props.getMostActiveUsers()
  }
  
  render() {
    const admin = this.props.adminStats
    return (
      <div>
        <h2>Admin Dashboard</h2>
        <ul>
          <li>Total Users: {this.props.adminStats.totalUsers}</li>
          <li>Total Dogs Liked: {this.props.adminStats.totalDogs}</li>
        </ul>

        <p>Top ten liked breeds: </p>
        <table>
          <tbody>
          <tr>
            <th>Breed</th>
            <th>Likes</th>
          </tr>
          { admin.topTenLike && 
              admin.topTenLike.map((e,i) => (
                <tr key={i}>
                  <td>{e.breed}</td>
                  <td>{e.count}</td>
                </tr>
              )) 
          }
          </tbody>
        </table>


        <p>Top ten disliked breeds: </p>
        <table>
          <tbody>
          <tr>
            <th>Breed</th>
            <th>Dislikes</th>
          </tr>
          { admin.topTenDislike && 
              admin.topTenDislike.map((e,i) => (
                <tr key={i}>
                  <td>{e.breed}</td>
                  <td>{e.count}</td>
                </tr>
              )) 
          }
        </tbody>
        </table>


        <p>Most active users:</p>
        <table>
          <tbody>
          <tr>
            <th>Name</th>
            <th>e-mail</th>
            <th># of likes</th>
          </tr>
          { admin.mostActive &&
              admin.mostActive.map((e,i) => {
                <tr key={i}>
                  <td>{e}</td>
                  <td>{e.firstname} {e.lastname}</td>
                  <td>{e.email}</td>
                  <td>{e.ct}</td>
                </tr>
              })
          }
        </tbody>
        </table>
      </div>
    )
  }
}

const mapStateToProps = ({ adminStats }) => {
  return { adminStats }
}

export default connect(mapStateToProps, { getUserStats, getDogStats, getTopTenLiked, getTopTenDisliked, getMostActiveUsers})(
  AdminDashboard
)
