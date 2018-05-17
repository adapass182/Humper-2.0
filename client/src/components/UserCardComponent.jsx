import React, {PureComponent} from 'react'
import {connect} from 'react-redux'

class UserCardComponent extends PureComponent {


  	render() {
  		return (
        <div className="userCardContainer" >
          <img
            src={require('../images/profileIcon.png')}
            alt="User avatar"
            className="userAvatar"
          />
          <div className= "userInfo">
            <p className="userCardText" id="userName">{this.props.name}</p>
            <p className="userCardText">Good boys: {this.props.dogLikes}</p>
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
