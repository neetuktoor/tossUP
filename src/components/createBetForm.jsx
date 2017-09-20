import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux';
import * as Actions from '../actions';

const validate = values => {
		const errors = {};

		if (!values.title){
			errors.title = "Please enter a title for the bet.";
		}

		if (!values.prize){
			errors.prize = "Please enter a prize for what is at stake.";
		}
    if (!values.date){
			errors.description = "Please enter an end date for the bet.";
		} else if(values.date < Date.now)
    if (!values.addUser){
      errors.addUser = "Please add another user to the bet.";
    }
		return errors;
	};

class createBetForm extends React.Component {

  handleFormSubmit = (values) => {
		console.log(values);
		this.props.betAdded(values);
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

  render() {
      return (
        <div className= "container">
          <div className = "col-md-6 col-md-offset-3">
            <h2 className = "text-center"> Create a New Bet </h2>

            <form onSubmit = { this.props.handleSubmit(this.handleFormSubmit) } >

              <fieldset className = "form-group">
                <label> Title </label>

                <Field
                  name = "title"
                  component = {this.renderField}
                  className = "form-control"
                  type= "text"
                  placeholder = "Title"
                />
              </fieldset>

              <fieldset className = "form-group">
                <label> Prize </label>

                <Field
                  name = "prize"
                  component = {this.renderField}
                  className = "form-control"
                  type= "prize"
                  placeholder = "Prize"
                />
              </fieldset>

              <fieldset className = "form-group">
                <label> End Date </label>

                <Field
                  name = "date"
                  component = {this.renderField}
                  className = "form-control"
                  type= "date"
                  placeholder = "End Date"
                />
              </fieldset>

              <fieldset className = "form-group">
                <label> Add User by Email </label>

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

export default connect(null, Actions)(reduxForm({
	form: 'createBet',
	validate
})(createBetForm));
