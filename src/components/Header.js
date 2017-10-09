import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as Actions from '../actions';

class Header extends React.Component {
	handleSignout(){
		this.props.signOutUser();
	}

	renderAuthLinks(){

		//the link is because we're not routing anywehre we jsut need it to call our signOutUser action creator from handleSignout
		if (this.props.authenticated){
			return [

			<li className = "nav-item" key= {1}>
				<a className = "nav-link" href= "#" onClick= {() => this.handleSignout()}> <h5> Sign Out </h5> </a>

			</li>
			]
		}
		//returning an array of comma-separeted <li>s will make React list them in order (you jsut have to give them a key)
		else {
			return [
				<li className = "nav-item" key = {1}>
					<Link className = "headerLink" to = "/login"> Log in </Link>
				</li>,

				<li className = "nav-item" key= {2}>
					<Link className = "headerLink" to = "/signup"> Sign Up </Link>

				</li>
			]
		}
	}

	render(){
		return(
			<nav className = "navbar navbar-default">
				<div className = "container-fluid">
					<div className = "navbar-header">

						<Link className = "title" to = "/"> tossUp </Link>

					</div>

					<ul className = "nav navbar-nav navbar-right">
						{ this.renderAuthLinks() }
					</ul>
				</div>
			</nav>

			);
	}
}

function mapStateToProps(state){
	return {
		authenticated: state.auth.authenticated
	}
}


export default connect(mapStateToProps, Actions)(Header);

