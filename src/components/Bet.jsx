import React from 'react';
import { connect } from 'react-redux';
import * as Actions from '../actions';
import { Link } from 'react-router-dom';

class Bet extends React.Component {

	//get user information to display on the page
	componentWillMount() {
		this.props.fetchBetInfo();
	}

	render(){
