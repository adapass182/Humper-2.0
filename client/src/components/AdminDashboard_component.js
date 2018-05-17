import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { getUserStats } from '../actions/users'
import { getDogStats } from '../actions/rateDog'
import { getTopTenLiked, getTopTenDisliked, getMostActiveUsers} from '../actions/matches'

class AdminDashboard extends PureComponent {
  constructor(){
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
    this.state = {
      stats: "liked"
    }
  }

  handleSubmit(e) {
    e.preventDefault()
    this.setState({
      stats: e.target.value
    })
    if (e.target.value === "liked") {
      this.props.getTopTenLiked()
    }
    if (e.target.value === "disliked") {
      this.props.getTopTenDisliked()
    }
    if (e.target.value === "mostactive") {
      this.props.getMostActiveUsers()
    }
  }

  componentWillMount() {
    this.props.getUserStats()
    this.props.getDogStats()
    this.props.getTopTenLiked()
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

        <form onSubmit={this.handleSubmit}>
          <select name="stats" onChange={this.handleSubmit}>
            <option value="liked">Top ten liked breeds</option>
            <option value="disliked">Top ten disliked breeds</option>
            <option value="mostactive">Most active users</option>
          </select>
        </form>



        { this.state.stats === "liked" && 
            <div>
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
          </div>
        }

        { this.state.stats === "disliked" &&
            <div>
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
        </div>
        }

        { this.state.stats === "mostactive" &&
            <div>
            <p>Most active users:</p>
            <table>
              <tbody>
              <tr>
                <th>Name</th>
                <th>e-mail</th>
                <th># of likes</th>
              </tr>
              { admin.mostActive &&
                  admin.mostActive.map((e,i) => (
                    <tr key={i}>
                      <td>{e.firstname}</td>
                      <td>{e.email}</td>
                      <td>{e.ct}</td>
                    </tr>
                  ))
              }
            </tbody>
          </table>
        </div>
        }

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
