import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../actions';

class Comments extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			fetchedBet: false,
			fetchedComments: false,
			displayComments: true,
			typed: ''
		}
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);

		this.props.fetchSelectedBet(this.props.selectedBet);
		this.props.fetchComments(this.props.selectedBet);
		
	}


	componentWillReceiveProps(nextProps){
		
		if (nextProps.betDetails){
			this.setState({ fetchedBet: true });
		}

		if (nextProps.fetchedComments){
			this.setState({ fetchedComments: true });
		}
	}

	handleChange(event){
		this.setState({typed: event.target.value})
	}

	handleSubmit(event){
		event.preventDefault();

		//store the comment into firebase
		this.props.storeComment({comment: this.state.typed, betid: this.props.selectedBet});

	}

	exitComments(){
		this.setState({ displayComments: false });
	}

	seeComments(){
		this.setState({ displayComments: true }); 
	}

	renderComments(){
		var commentItems = this.props.Comments.map((item) => 
			<li key= { item.id }>
			<span> <img className = "commentpic" src ={ item.userpic }/> <div className = "thecomment"> { item.comment } </div> </span>
			<div className = "commentname"> { item.username } </div>
			</li>
		);

		return commentItems;
	}

	render(){
		if (this.state.fetchedBet === true && this.state.displayComments === true && this.state.displayComments===true){
			return <div className = "comments">
					<h4> { this.props.betDetails.title } </h4> <button><img className = "minimize" src = '../style/images/minimize.png' onClick = { () => { this.exitComments() } } /></button>
					
					<ul> { this.renderComments() } </ul>

					<span>
						<form onSubmit = { this.handleSubmit }>
							<input onChange = { this.handleChange } />
							<input type = "submit" value= "Send"/>
						</form>
					</span>
				</div>
		}
		return <div> <h4 onClick = { () => { this.seeComments() } }> { this.props.betDetails.title } Chat Log </h4>  </div>
	}
}

function mapStateToProps(state){
	return{
		selectedBet: state.bets.selectedBet,
		betDetails: state.bets.selectedDetails,
		Comments: state.comments.comments
	};
}



export default connect (mapStateToProps, Actions)(Comments);
