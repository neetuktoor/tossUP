import React from 'react';

class NotifInvite extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			responded: false
		}
	}

	acceptInvite(notif){
		//this.setState({ responded: true });
		//calling action creator to accept invite (change in database)
		//this.props.acceptInvite(notif);
	}

	declineInvite(notif){
		//this.setState({ responded: true });
		//calling action creator to accept invite (change in database)
		//this.props.declineInvite(notif);
	}

	renderNotifInvited = () => {
		console.log("responded", this.state.responded)
		if (!this.state.responded){
			return <div> 
				You were invited to { this.props.notif.bet } by { this.props.notif.inviter }
				<button onClick = {this.acceptInvite(this.props.notif)} > Accept invite </button>
				<button onClick = {this.declineInvite(this.props.notif)} > Decline invite </button></div>
			
		}
		return <div>somethingelse</div>
	}

	render(){
		return <div>{ this.renderNotifInvited() }</div>
	}
		
	
	
}

export default NotifInvite;