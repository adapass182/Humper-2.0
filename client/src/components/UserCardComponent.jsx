import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

class UserCardComponent extends PureComponent {

  	render() {
  		return (
        <div className="userCardContainer" >
          <img
            src={require('../images/profileIcon.png')}
            className="userAvatar"
          />
          <div className= "userInfo">
            <p>name:</p>
            <p>dogs liked: </p>
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
