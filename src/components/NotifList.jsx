import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../actions';
import { BrowserRouter, Redirect } from 'react-router-dom';
import NotifInvite from './NotifInvite';
import NotifAccepted from './NotifAccepted';


class NotifList extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			invitefetched: false,
			acceptedfetched: false
		}

		//fetches invite notifications
		this.props.actions.fetchInviteNotifs();
		this.props.actions.fetchAcceptedNotifs();

		this.invited = this.invited.bind(this);

	}

	componentWillReceiveProps(nextProps) {

		if (nextProps.notifInvited){

			this.setState({invitedfetched: true});
		}
		if (nextProps.notifAccepted){

			this.setState({acceptedfetched: true});
		}

	}

	invited (){
		console.log(this.props.notifInvited);
		var arr = this.props.notifInvited.map((notif) => {

		return <NotifInvite key = { notif.bet }
							notif = { notif }
							AcceptInvite = { () => { this.props.actions.acceptInvite({notif}) } }
							DeclineInvite = { () => { this.props.actions.declineInvite( {notif} ) } }
				/>
		});
		return arr;
	}

	accepted(){
		var accarr = this.props.notifAccepted.map((notif) =>{

			return<NotifAccepted key = { notif.bet }
								 notif = { notif }
								 ClearNotification = { () => { this.props.actions.clearAccepted({notif}) } }

				 />
		});
		return accarr;
	}


	render(){

		if (this.state.invitedfetched === false || this.state.acceptedfetched === false){
			return <img src = '../style/images/loading.jpg'/>
		}

		return (
			<div className = "notif-list">
				<h2 className = "text-center" > Notifications </h2>
				{ this.invited() }

				{ this.accepted() }

			</div>
		);
	}
}

function mapStateToProps(state){
	return{
		notifInvited: state.notifs.invited,
		notifAccepted: state.notifs.accepted
	};
}

function mapDispatchToProps(dispatch){
	return{
		actions: bindActionCreators(Actions, dispatch)
	};
}
export default connect (mapStateToProps, mapDispatchToProps) (NotifList);
