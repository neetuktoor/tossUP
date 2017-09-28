import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';


class Footer extends React.Component {

	renderAuthLinks(){
		//if not authenticated, take them to login page
		if (!this.props.authenticated){
			return(
				<div>
  					<Link className="navbar-brand" to = "/login"><img src = "../style/images/homepage.jpg"/></Link>
  					<Link className="navbar-brand" to = "/login"><img src = "../style/images/notification.png"/></Link>
  					<Link className="navbar-brand" to = "/login"><img src = "../style/images/profile.jpg"/></Link>
				</div>
				);
		}

		//if authenticated, render components if clicked on
		else {
			return(
				<div>
  					<Link className="navbar-brand" to = "/login"><img src = "../style/images/homepage.jpg"/></Link>
  					<Link className="navbar-brand" to = "/notifications"><img src = "../style/images/notification.png"/></Link>
  					<Link className="navbar-brand" to = "/profile"><img src = "../style/images/profile.jpg"/></Link>
            <Link className="navbar-brand" to = "/createbet"><img src = "../style/images/add.png"/></Link>
				</div>
				);
		}
	}

	render(){
		return (
			<nav className="navbar fixed-bottom navbar-light bg-faded">
				{ this.renderAuthLinks() }
			</nav>
			);

			}
	}

	function mapStateToProps(state){
		return {
			authenticated: state.auth.authenticated
		}
	}

	export default connect (mapStateToProps, null) (Footer);
