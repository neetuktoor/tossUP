import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../actions';
import { BrowserRouter, Redirect } from 'react-router-dom';
import { betItem } from './betItem';

class betList extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      fetched: false
    }

  this.props.actions.fetchBetInfo();


  }

  componentWillReceiveProps(nextProps) {

    if (nextProps.currentBet){
      this.setState({fetched: true});
    }

  }

  currentBets() {
    var betItem = this.props.currentBet.map((bet) => {

      return <betItem
                key = {bet.bet}
                bets = { bet }

              />

  });
    return betItem;
  }

  render(){
      if (this.state.fetched === false){
        return <img src = '../style/images/loading.jpg'/>
      }

      return (
        <div className = "bet-list">
          <h2 className = "bet-text"> Current Bets </h2>
          { this.currentBets() }
        </div>
      );
  }
}

function mapStateToProps(state) {
    return {
      currentBet: state.bets.currentBets
    };
}

function mapDispatchToProps(dispatch){
  return{
    actions: bindActionCreators(Actions, dispatch)
  };
}
export default connect (mapStateToProps, mapDispatchToProps) (betList);
