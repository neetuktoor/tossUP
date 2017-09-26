import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../actions';
import { BrowserRouter, Redirect } from 'react-router-dom';
import NotifInvite from './NotifInvite';


class NotifList extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			fetched: false
		}

		this.props.actions.fetchInviteNotifs();


		this.invited = this.invited.bind(this);
		
	}
	
	componentDidMount(){
		// this.props.actions.fetchInviteNotifs();
		this.setState({fetched: true})
	}
	
	invited (){
		var arr = this.props.notifInvited.map((notif) => {
		console.log("whatishits", notif);
		return <NotifInvite key = { notif.bet }
							notif = { notif }
							
				/>
		});
		return arr;
	}


	render(){
		if (!this.state.fetched){
			return <img src = '../style/images/loading.jpg'/>
		}

		return (
			<div className = "notif-list"> 
				<h2 className = "text-center" > Notifications </h2>
				{ this.invited() }

			</div>
		);
	}
}

function mapStateToProps(state){
	return{
		notifInvited: state.notifs.invited
	};	
}

function mapDispatchToProps(dispatch){
	return{
		actions: bindActionCreators(Actions, dispatch)
	};
}
export default connect (mapStateToProps, mapDispatchToProps) (NotifList);