
import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import * as Actions from '../actions';
import { BrowserRouter, Redirect } from 'react-router-dom';


 const validate = values => {

		const errors = {};

		if (!values.title){
			errors.title = "Please enter a title for the bet.";
		}

		if (!values.prize){
			errors.prize = "Please enter a prize for what is at stake.";
		}

    if(!values.description){
      errors.description = "Please enter a short description."
    }

    if (!values.date){
			errors.date = "Please enter an end date for the bet.";
		} else if(values.date < Date.now()) {
      errors.date = "This date has already passed.";
    }

    if (!values.addUser){
      errors.addUser = "Please add another user to the bet.";
    }


		return errors;
	};

class createBetForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      redirect: false
    }
  }

  handleFormSubmit = (values) => {
		console.log(values);
		this.props.createBet(values);
    this.setState({ redirect: true })
	};

  render() {
    if (this.state.redirect) {
      <Redirect to = "/" />
    }
  }

  renderField = ({ input, label, type, meta: { touched, error } }) => (
    	<fieldset className={`form-group ${touched && error ? 'has-error' : ''}`}>
      		<label className="loginText">{label}</label>


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

  render() {
      const { redirect } = this.state;

      if(redirect){
        return <Redirect to = '/' />;
      }

      return (
        <div className= "container">
          <div className = "createBet">
            <h2 className = "beepbeep"> Create a New Bet </h2>


            <form onSubmit = { this.props.handleSubmit(this.handleFormSubmit) } >

              <fieldset className = "form-group">
                <label className="loginText"> Title </label>


                <Field
                  name = "title"
                  component = {this.renderField}
                  className = "form-control"
                  type= "text"
                  placeholder = "Title"
                />
              </fieldset>

              <fieldset className = "form-group">
                <label className="loginText"> Description </label>

                <Field
                  name = "description"
                  component = {this.renderField}
                  className = "form-control"
                  type= "text"
                  placeholder = "Enter a short description."
                />
              </fieldset>

              <fieldset className = "form-group">
                <label className="loginText"> Prize </label>


                <Field
                  name = "prize"
                  component = {this.renderField}
                  className = "form-control"
                  type= "prize"
                  placeholder = "Prize"
                />
              </fieldset>

              <fieldset className = "form-group">
                <label className="loginText"> End Date </label>


                <Field
                  name = "date"
                  component = {this.renderField}
                  className = "form-control"
                  type= "date"
                  placeholder = "End Date"
                />
              </fieldset>

              <fieldset className = "form-group">
                <label className="loginText"> Add User by Email </label>


              <Field
                  name = "addUser"
                  component = {this.renderField}
                  className = "form-control"
                  type= "email"
                  placeholder = "Add User to Bet"
                />
              </fieldset>

              <button
                action="submit"
                className= "btn btn-primary"
              > Create </button>

            </form>
          </div>
        </div>
      );
  }
}

function mapStateToProps(state){
	return {
		Name: state.user.displayName,
		Email: state.user.email,
		Pic: state.user.profileURL,
		Error: state.user.error
	};
}

export default connect(null, Actions)(reduxForm({
	form: 'createBet',
	validate
})(createBetForm));
