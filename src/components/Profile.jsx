import React from 'react';
import { connect } from 'react-redux';
import * as Actions from '../actions';
import { Link } from 'react-router-dom';

class Profile extends React.Component {

	//get user information to display on the page 
	componentWillMount() {
		this.props.fetchUserInfo();
	}

	renderUserError(){
		if(this.props.Error){
			return <div className = "alert alert-danger"> { this.props.Error } </div>
		}
	}

	render(){
		return (
			<div className = "container">
				<div className = "col-md-12">
					<h2 className = "text-center"> Profile Page </h2>
					{ this.renderUserError() }
					<img className = "profilepic" src = { this.props.Pic } />
					<div > { this.props.Name } </div>
					<div > Email: { this.props.Email } </div>
					<Link to = "/editprofile"><button className = "btn btn-primary btn-lg"> Edit Profile</button></Link> 
				</div>
			</div>
		);
	}
}

function mapStateToProps(state){
	return {
		Name: state.user.displayName,
		Email: state.user.email,
		Pic: state.user.profileURL,
		Error: state.user.error
	};
}





export default connect(mapStateToProps, Actions)(Profile);