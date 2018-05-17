// import React, { PureComponent } from 'react'
// import { connect } from 'react-redux'

// class MatchesList extends PureComponent {
//   getMatches = (myPrefs, userPrefs) => {
//     const scores = []
//     userPrefs.forEach(user => {
//       let result = {}
//       result.name = user.name
//       result.score = user.breeds
//         .map(breed => (myPrefs.includes(breed) ? 1 : 0))
//         .reduce((a, b) => a + b, 0)
//       scores.push(result)
//     })
//     return scores.sort((a, b) => b.score - a.score).slice(0, 10)
//   }

//   render() {
//     const myPrefs = this.props.userDetails.preferences.map(
//       element => element.breed
//     )
//     const myMatches = getMatches(myPrefs, userPrefs)

//     return (
//       <div className="matchesList-container">
//         {myMatches.map(match => {
//           return (
//             <li key={match.name}>
//               <p>
//                 {' '}
//                 <a className="breed"> {match.name}</a>, Top Breeds in Common:{' '}
//                 {match.score}
//               </p>
//             </li>
//           )
//         })}
//       </div>
//     )
//   }
// }

// const mapStateToProps = ({ userDetails, userPrefs }) => {
//   return { userDetails, userPrefs }
// }

// export default connect(mapStateToProps, {})(MatchesList)
