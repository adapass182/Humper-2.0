import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { getMatch, getMatches } from '../actions/matches'
import { getUsers } from '../actions/users'
import { getPrefs, getUsersPrefs } from '../actions/rateDog'
import UserCardComponent from './UserCardComponent'

class MatchesPage extends PureComponent {
  constructor() {
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
    this.state = {
      stats: 'activity'
    }
  }

  handleSubmit(e) {
    e.preventDefault()
    this.setState({
      stats: e.target.value
    })
    if (e.target.value === 'activity') {
      this.props.getMatch()
    }
    if (e.target.value === 'breed') {
      this.props.getMatches(this.props.userPrefs)
    }
  }

  componentWillMount() {
    this.props.getMatch()
    this.props.getPrefs()
    this.props.getUsersPrefs()
  }

  handleClick(e) {
    e.preventDefault()
    this.props.getMatches(this.props.userPrefs)
  }

  render() {
    const props = this.props
    return (
      <div className="matchesPageContainer">
        <div>
          <div className="matchAmountContainer">
            <h2>Your matches:</h2>
            <p>Wow! You have liked</p>
            <p id="matchScore">{props.currUser ? props.currUser.ct : null} </p>
            <p>dogs already!</p>
          </div>

          <form onSubmit={this.handleSubmit}>
            <select
              id="adminDropDown"
              name="stats"
              onChange={this.handleSubmit}>
              <option value="activity">Top activity match</option>
              <option value="breed">Top breed matches</option>
            </select>
          </form>
          {this.state.stats === 'activity' && (
            <div className="matchedUserContainer">
              <p>A user with a similar love of dogs is:</p>
              <UserCardComponent
                className="test"
                name={
                  props.match
                    ? `${props.match.firstname} ${props.match.lastname}`
                    : null
                }
                dogLikes={props.match ? props.match.ct : null}
              />
            </div>
          )}

          {this.state.stats === 'breed' && (
            <div className="matchedListContainer">
              <p>Users who like the same breeds are:</p>
              <div className="matchedUsersContainer">
                {this.props.myMatches.map(match => {
                  return (
                    <li key={match.name}>
                      <p className="parashrink">
                        {' '}
                        <a className="breed"> {match.name}</a> Top Breeds in
                        Common: {match.score}
                      </p>
                    </li>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }
}

const mapStateToProps = function(state) {
  return {
    currUser: state.matches.currentUser,
    match: state.matches.matchingUser,
    userDetails: state.userDetails,
    userPrefs: state.userPrefs,
    myMatches: state.myMatches
  }
}

export default connect(mapStateToProps, {
  getMatch,
  getMatches,
  getUsers,
  getPrefs,
  getUsersPrefs
})(MatchesPage)
