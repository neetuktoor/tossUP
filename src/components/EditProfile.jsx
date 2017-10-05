import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import * as Actions from '../actions';
import { BrowserRouter, Redirect } from 'react-router-dom';

const validate = values => {
		const errors = {};

		if (!values.email){
			errors.email = "Please enter an email";
		} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
			errors.email = "Invalid email address"
		}

		if (!values.profilepic){
			errors.profilepic = "But what you look like?";
		}

		if (!values.displayname){
			errors.displayname = "But what's your name?";
		}

		return errors;
	};


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

	renderField = ({ input, label, type, meta: { touched, error } }) => (
    	<fieldset className={`form-group ${touched && error ? 'has-error' : ''}`}>
      		<label className="control-label">{label}</label>

      		<div>
        	<input {...input}
        		placeholder={label}
        		className="form-control"
        		type={type}
        	/>
        		{ touched && error && <div className="help-block">{ error }</div> }
      		</div>

    	</fieldset>
  );

	render(){
		const { redirect } = this.state;

		if(redirect){
			return <Redirect to = '/profile' />;
		}

		return(
			<div className = "container">
				<div className = "editProfContainer">
					<h2 className = "beepbeep"> Edit Profile </h2>

					<form onSubmit = { this.props.handleSubmit(this.handleFormSubmit)}>

						<fieldset className = "form-group">
						<label className="loginText"> New Display Name </label>
						<Field name = "displayname"
							component = {this.renderField}
							className = "form-control"
							type= "text"
							placeholder = "Possibly what your mom named you" />
						</fieldset>

						<fieldset className = "form-group">
						<label className="loginText"> Update Profile Picture </label>
						<Field name = "profilepic"
							component = {this.renderField}
							className = "form-control"
							type= "text"
							placeholder = "Paste photo url here" />
						</fieldset>

						<fieldset className = "form-group">
						<label className="loginText"> Verify Email </label>
						<Field name = "email"
							component = {this.renderField}
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
	validate
})(EditProfile));
