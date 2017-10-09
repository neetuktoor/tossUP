import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';


class Footer extends React.Component {
	

	renderAuthLinks(){
		//if not authenticated, take them to login page
		if (!this.props.authenticated){
			return(
				<div>

  					// <Link className="navbar-brand" to = "/login"><img src = "../style/images/homepage.jpg"/></Link>
  					// <Link className="navbar-brand" to = "/login"><img src = "../style/images/notification.png"/></Link>
  					// <Link className="navbar-brand" to = "/login"><img src = "../style/images/profile.jpg"/></Link>

				</div>
				);
		}


		//if authenticated, render components if clicked on
		else {
			return(
				<div>
  					<Link className="footerbrand2" to = "/login"><img className="icon1" src = "../style/images/homepage.png"/></Link>
            <Link className="footerbrand2" to = "/profile"><img className="icon1" src = "../style/images/profile.png"/></Link>
            <Link className="footerbrand23" to = "/login"><img className="icon1" src = "../style/images/cointoss.png"/></Link>
            <Link className="footerbrand2" to = "/notifications"><img className="icon2" src = "../style/images/notification.png"/></Link>
            <Link className="footerbrand2" to = "/createbet"><img className="icon2" src = "../style/images/add.png"/></Link>

				</div>
				);
		}
	}

	render(){
		return (

			<nav className="footer">

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

