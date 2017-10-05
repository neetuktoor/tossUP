import React from 'react';

class NotifDeclined extends React.Component {
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

	renderNotifDeclined = () => {
		if ( this.props.notif.bet === ''){
			return <div> </div>
		}

		else if (this.state.responded === false){
			return <div>
				<i>{ this.props.notif.invited }</i> declined your bet to <i>{ this.props.notif.bet }</i>
				<button className="clearBTN" onClick = { () => { this.clear() } }  > X  </button>
				</div>

		}
		return <div> </div>
	}

	render(){
		return <div>{ this.renderNotifDeclined() }</div>
	}
}

export default NotifDeclined;
