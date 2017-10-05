import React from 'react';

class NotifAccepted extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			responded: false
		}
	}

	clear(){
		this.setState({ responded: true });
		this.props.ClearNotification(this.props.notif);
	}

	renderNotifAccepted = () => {
		if ( this.props.notif.bet === ''){
			return <div> </div>
		}

		else if (this.state.responded === false){
			return <div>
				<i>{ this.props.notif.invited }</i> accepted your bet to <i>{ this.props.notif.bet }</i>
				<button className = "clearBTN" onClick = { () => { this.clear() } }  > X </button>
				</div>

		}
		return <div> </div>
	}

	render(){
		return <div>{ this.renderNotifAccepted() }</div>
	}
}

export default NotifAccepted;
