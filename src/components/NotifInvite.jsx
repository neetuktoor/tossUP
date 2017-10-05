import React from 'react';

class NotifInvite extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			responded: false
		}

	}

	acceptInvite(){
		this.setState({ responded: true });
		//calling action creator to accept invite (change in database)

		this.props.AcceptInvite(this.props.notif.betid);
	}

	declineInvite(notif){
		this.setState({ responded: true });
		//calling action creator to accept invite (change in database)

		this.props.DeclineInvite(this.props.notif);
	}

	renderNotifInvited = () => {


		if ( this.props.notif.bet === ''){
			return <div> You were not recently invited to any bets.</div>
		}

		else if (this.state.responded === false){
			return <div>
				You were invited to <i>{ this.props.notif.bet }</i> by <i>{ this.props.notif.inviter }</i>
				<button className="acceptBTN" onClick = { () => { this.acceptInvite() } }  > ACCEPT  </button>
				<button className="declineBTN" onClick = { () => { this.declineInvite() } } > DECLINE  </button></div>

		}
		return <div> </div>
	}

	render(){
		return <div>{ this.renderNotifInvited() }</div>
	}



}

export default NotifInvite;
