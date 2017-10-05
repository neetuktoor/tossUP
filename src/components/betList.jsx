import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../actions';
import { BrowserRouter, Redirect } from 'react-router-dom';

import BetItem from './betItem';
import BetDetail from './BetDetail';
import Comments from './Comments';

class betList extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      fetched: false,
      selected: false,
      displayComments: false,
      firsttimeSelect: false
    }

    this.props.actions.fetchBetInfo();

  }

  componentWillReceiveProps(nextProps) {

    if (nextProps.currentBet){
      this.setState({fetched: true});
    }

  }

  showBetDetails(){
    this.setState({ selected: true, firsttimeSelect: true });

  }

  exitBetDetails(){
    this.setState({ selected: false });
  }

  showComments(){
    this.setState({ displayComments: true});
  }

  exitComments(){
    this.setState({ displayComments: false});
  }

  currentBetsWithoutChat() {
    var bItem = this.props.currentBet.map((bet) => {
      return <div>
              <BetItem key = { bet.title }
                      bets = { bet }
                      SelectBet = { () => { this.props.actions.onSelectBet({ bet }) } }
                      ShowBet = { () => { this.showBetDetails() } }
              />
              </div>

    });

    return bItem;
  }

  currentBets() {
    var bItem = this.props.currentBet.map((bet) => {
      return <div className="betsbets">
              <BetItem key = { bet.title }
                      bets = { bet }
                      SelectBet = { () => { this.props.actions.onSelectBet({ bet }) } }
                      ShowBet = { () => { this.showBetDetails() } }
              />

              <img onClick ={ () => { this.showComments() } } src = "../style/images/chat.png" className="chatIcon"/>

            </div>

    });

    return bItem;
  }

  render(){
      if (this.state.fetched === false){
        return <img src = '../style/images/loading.jpg'/>
      }

      if (this.state.displayComments === true){
        return <div>
               <button className = "exit"> <img src = "https://cdn2.iconfinder.com/data/icons/interface-part-1/32/circle-ex-512.png" onClick = { () => { this.exitComments() } } />  </button>
                <Comments />
              </div>
      }

      if (this.state.selected === true){
        return <BetDetail fetchDetails = { () => { this.props.actions.fetchSelectedBet( this.props.selectedBet ) } }
                          exOut = { () => { this.exitBetDetails() } }
                          inviterWon = { (inviter) => { this.props.actions.addWinner( {winner: inviter, betid: this.props.selectedBet}  ) } }
                          invitedWon = { (invited) => { this.props.actions.addWinner( {winner: invited, betid: this.props.selectedBet} ) } }
               />
      }

      else if (this.state.firsttimeSelect === false){
        return (
            <div>
              <h2 className="beepbeep"> Current Bets </h2>

             { this.currentBetsWithoutChat() }

            </div>
          );
      }

      else {
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
