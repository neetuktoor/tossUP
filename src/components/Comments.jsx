import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../actions';

class Comments extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			fetchedBet: false,
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

	renderComments(){

		if (this.props.Comments[0].comment === ''){

			return <li></li>
		}
		var commentItems = this.props.Comments.map((item) =>
			<li key= { item.id }>
      {/* <div className = "commentname"> { item.username } </div> */}
      <span> <img className = "commentpic" src ={ item.userpic }/> <div className = "thecomment"> { item.comment } </div> </span>

			</li>
		);

		return commentItems;
	}

	render(){
		if (this.state.fetchedBet === true){
			return <div className = "comments">
					<h4 className="chatTitle"> { this.props.betDetails.title } </h4>

					<ul> { this.renderComments() } </ul>

					<span>
						<form onSubmit = { this.handleSubmit }>
							<input className= "chatBar" onChange = { this.handleChange } />
							<input className= "chatBtn" type = "submit" value= "Send"/>
						</form>
					</span>
				</div>
		}
		return <div> </div>
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
