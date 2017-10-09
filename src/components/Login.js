import React from 'react';

//The Field component makes it easy to connect individual inputs to the Redux store
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
			errors.password = "Please enter a password.";
		}

		return errors;
	};

class Login extends React.Component {

	handleFormSubmit = (values) => {
		console.log(values);
		this.props.signInUser(values);
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

	renderAuthenticationError(){
		if(this.props.authenticationError){
			return <div className = "alert alert-danger"> { this.props.authenticationError } </div>
		}

		return <div></div>;
	}


	//handleSubmit is a redux-form method! so using this.props. When we click onSubmit redux-form intercepts and run validation first
	//will also call handleFormSubmit which will just log our values
	render() {
    	return (
    		<div className= "container">

    			<div className = "loginContainer">
            {/* <img className="logoImg" src="../style/images/logo.png"/> */}
    				<h2 className = "beep"> LOG IN </h2>


    				{ this.renderAuthenticationError() }

    				<form onSubmit = { this.props.handleSubmit(this.handleFormSubmit) } >

    					<fieldset className = "form-group">
    						<label className="loginText"> Email </label>


    						<Field
    							name = "email"
    							component = {this.renderField}
    							className = "form-control"
    							type= "text"
    							placeholder = "Email"
    						/>
    					</fieldset>

    					<fieldset className = "form-group">
    						<label className="loginText"> Password </label>


    						<Field
    							name = "password"
    							component = {this.renderField}
    							className = "form-control"
    							type= "password"
    							placeholder = "Password"
    						/>
    					</fieldset>

    					<button
    						action="submit"
    						className= "btn btn-primary"
    					> Sign In </button>


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

//because component doesn't currently care about any state outside of form itself, we are going to hold off
//on adding the react-reduc connect

//reduxForm connects our form to redux --> unique name for the form called login (this will be set as key
// on the store objeect returned to Formreducer)

//Tje reason why we're not using mapDispatchToProps or bindActionCreators is because we're passing
//actions directly and login and signup don't have child components so we dont' need
// to pass action creatos down as props from container to component
export default connect(mapStateToProps, Actions)(reduxForm({
	form: 'login',
	validate
})(Login));
