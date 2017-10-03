import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../actions';
import { BrowserRouter, Redirect } from 'react-router-dom';

import BetItem from './betItem';
import BetDetail from './BetDetail';

class betList extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      fetched: false,
      selected: false
    }

    this.props.actions.fetchBetInfo();

  }

  componentWillReceiveProps(nextProps) {

    if (nextProps.currentBet){
      this.setState({fetched: true});
    }

  }

  showBetDetails(){
    this.setState({ selected: true });
  }

  exitBetDetails(){
    this.setState({ selected: false });
  }

  currentBets() {
    var bItem = this.props.currentBet.map((bet) => {
      return <BetItem key = { bet.title }
                      bets = { bet }
                      SelectBet = { () => { this.props.actions.onSelectBet({ bet }) } }
                      ShowBet = { () => { this.showBetDetails() } }
              />

    });
    
    return bItem;
  }

  render(){
      if (this.state.fetched === false){
        return <img src = '../style/images/loading.jpg'/>
      }

      if (this.state.selected === true){
        console.log("its true");
        return <BetDetail fetchDetails = { () => { this.props.actions.fetchSelectedBet( this.props.selectedBet ) } }
                          exOut = { () => { this.exitBetDetails() } }
               />
      }
      else{
          return(
         <div>
           <h2> Current Bets </h2>

             { this.currentBets() }

            </div>
         );
      }
      
  }
}

function mapStateToProps(state) {

    return {
      currentBet: state.bets.currentBets,
      selectedBet: state.bets.selectedBet
    };
}

function mapDispatchToProps(dispatch){
  
  return{
    actions: bindActionCreators(Actions, dispatch)
  };
}
export default connect (mapStateToProps, mapDispatchToProps) (betList);
