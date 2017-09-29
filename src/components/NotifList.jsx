import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../actions';
import { BrowserRouter, Redirect } from 'react-router-dom';
import NotifInvite from './NotifInvite';
import NotifAccepted from './NotifAccepted';
import NotifDeclined from './NotifDeclined';


class NotifList extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			invitefetched: false,
			acceptedfetched: false,
			declinedfetched:false
		}

		//fetch all the notifications
		this.props.actions.fetchInviteNotifs();
		this.props.actions.fetchAcceptedNotifs();
		this.props.actions.fetchDeclinedNotifs();

<<<<<<< HEAD
		this.invited = this.invited.bind(this);

=======
		// this.invited = this.invited.bind(this);
		
>>>>>>> 19bdba714e4442daf19d04d416379da49f3354c4
	}

	componentWillReceiveProps(nextProps) {

		if (nextProps.notifInvited){

			this.setState({invitedfetched: true});
		}
		if (nextProps.notifAccepted){

			this.setState({acceptedfetched: true});
<<<<<<< HEAD
		}
=======
		} 
		if (nextProps.notifDeclined){

			this.setState({declinedfetched: true});
		}	
>>>>>>> 19bdba714e4442daf19d04d416379da49f3354c4

	}

	invited (){
		
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

	declined(){
		var decarr = this.props.notifDeclined.map((notif) =>{

			return<NotifDeclined key = { notif.bet }
								 notif = { notif }
								 ClearNotification = { () => { this.props.actions.clearDeclined({notif}) } }

				 />
		});
		return decarr;
	}


	render(){
<<<<<<< HEAD

		if (this.state.invitedfetched === false || this.state.acceptedfetched === false){
=======
		
		if (this.state.invitedfetched === false || this.state.acceptedfetched === false || this.state.declinedfetched === false){
>>>>>>> 19bdba714e4442daf19d04d416379da49f3354c4
			return <img src = '../style/images/loading.jpg'/>
		}

		return (
			<div className = "notif-list">
				<h2 className = "text-center" > Notifications </h2>
				{ this.invited() }

				{ this.accepted() }

				{ this.declined() }

			</div>
		);
	}
}

function mapStateToProps(state){
	return{
		notifInvited: state.notifs.invited,
<<<<<<< HEAD
		notifAccepted: state.notifs.accepted
	};
=======
		notifAccepted: state.notifs.accepted,
		notifDeclined: state.notifs.declined
	};	
>>>>>>> 19bdba714e4442daf19d04d416379da49f3354c4
}

function mapDispatchToProps(dispatch){
	return{
		actions: bindActionCreators(Actions, dispatch)
	};
}
export default connect (mapStateToProps, mapDispatchToProps) (NotifList);
