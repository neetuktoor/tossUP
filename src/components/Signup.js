import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import * as Actions from '../actions';

const validate = values => {
	const errors = {};

	if (!values.email){
		errors.email = "Please enter an email";
	} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
		errors.email = "Invalid email address"
	}

	if (!values.password){
		errors.password = "Please enter a password";
	}

	if (!values.passwordConfirmation){
		errors.passwordConfirmation = "Please enter a password confirmation";
	}

	if (values.password !== values.passwordConfirmation){
		errors.password = "Passwords do not match";
	}

	return errors;
}

class Signup extends React.Component {

  handleFormSubmit = (values) => {
  	console.log(values);
  	this.props.signUpUser(values);
   
  }

  //by using ...input we are deconstructuring the value of input prop and merging in
  //values provided by Field component


  //condition: if touched and if there is error, display error and add has-error on fieldset
  //also added control-label and help-block to actual error text
  renderField = ({ input, label, type, meta: {touched, error } }) => (
  	<fieldset className = {`form-group ${touched && error ? 'has-error' : ''}`}>
  		<label className="loginText">{ label }</label>
  		<div>
  			<input
  				{...input}
  				// placeholder = { label }

  				className = "form-control"
  				type= { type }
  			/>
  				{ touched && error && <div className="help-block">{ error }</div> }
  		</div>
  	</fieldset>

  	);

  renderAuthenticationError(){

  	if (this.props.authenticationError){
  		return <div className = "alert alert-danger"> { this.props.authenticationError } </div>
  	}
  	return <div></div>;
  }

  render() {
    return (
    	<div className = "container">
    		<div className = "loginContainer">
    			<h2 className = "beep"> SIGN UP </h2>


    			{ this.renderAuthenticationError()}

    			<form onSubmit = {this.props.handleSubmit(this.handleFormSubmit)}>

    			<Field
            className="loginText"
    				name = "email"

    				type = "text"
    				component = {this.renderField}
    				label = "Email"
    			/>

    			<Field
    				name = "password"

    				type = "password"
    				component = {this.renderField}
    				label = "Password"
    			/>

    			<Field
    				name = "passwordConfirmation"

    				type = "password"
    				component = {this.renderField}
    				label = "Password Confirmation"
    			/>

    			<button action = "submit" className= "btn btn-primary"> Sign up </button>

    			</form>
    		</div>
    	</div>


    );

  }
}

function mapStateToProps(state){
	return{
		authenticationError: state.auth.error
	}
}

export default connect(mapStateToProps, Actions)(reduxForm({
	form: 'signup',
	validate
})(Signup));

