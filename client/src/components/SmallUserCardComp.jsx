import React, {PureComponent} from 'react'
import {connect} from 'react-redux'

class UserCardComponent extends PureComponent {


  	render() {
  		return (
        <div className="smallUserCardContainer" >
          <img
            src={require('../images/profileIcon.png')}
            alt="User avatar"
            className="smallUserAvatar"
          />
          <div className= "smallUserInfo">
            <p className="smallUserCardText" id="smallUserName">{this.props.name}</p>
            <p className="smallUserCardText">Same breeds liked: {this.props.dogLikes}</p>
          </div>
        </div>
  		)
  	}
  }

const mapStateToProps = function (state) {
	return {
	}
}

export default connect(mapStateToProps, {})(UserCardComponent)
