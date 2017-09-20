import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import * as Actions from '../actions';
import { BrowserRouter, Redirect } from 'react-router-dom';

class EditProfile extends React.Component {
	constructor (props){
		super(props);
		this.state = {
			redirect: false
		}
	}

	handleFormSubmit = (values) => {
		console.log(values);
		this.props.editProfile(values);
		this.setState({ redirect : true })
	};

	render(){
		const { redirect } = this.state;

		if(redirect){
			return <Redirect to = '/profile' />;
		} 

		return(
			<div className = "container">
				<div className = "col-md-6 col-md-offset-3">
					<h2 className = "text-center"> Edit Profile </h2>

					<form onSubmit = { this.props.handleSubmit(this.handleFormSubmit)}>
						
						<fieldset className = "form-group">
						<label> New Display Name </label>
						<Field name = "displayname"
							component = "input"
							className = "form-control"
							type= "text"
							placeholder = "Possibly what your mom named you" />
						</fieldset>

						<fieldset className = "form-group">
						<label> Update Profile Picture </label>
						<Field name = "profilepic"
							component = "input"
							className = "form-control"
							type= "text"
							placeholder = "Paste url here" />
						</fieldset>

						<fieldset className = "form-group">
						<label> Verify Email </label>
						<Field name = "email"
							component = "input"
							className = "form-control"
							type= "text"
							placeholder = "Email to be contacted at" />
						</fieldset>


						<button action = "submit" className = "btn btn-primary"> Save Changes </button>
					</form>
				</div>
			</div>
		);
	}
}


export default connect(null, Actions) (reduxForm({
	form: 'editprofile',
})(EditProfile));