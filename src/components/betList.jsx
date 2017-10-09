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
    console.log("hello", this.props.currentBet);
    if(this.props.currentBet[0].title === ''){
      return <div> No bets yet </div>
    }
    else{
    var bItem = this.props.currentBet.map((bet) => {
      return <div className="betsbets">
              <BetItem key = { bet.title }
                      bets = { bet }
                      SelectBet = { () => { this.props.actions.onSelectBet({ bet }) } }
                      ShowBet = { () => { this.showBetDetails() } }
              />
              </div>

    });

    return bItem;
  }
  }

  currentBets() {
    if(this.props.currentBet[0].title === ''){
      return <div> No bets yet </div>
    } else {
    var bItem = this.props.currentBet.map((bet) => {
      console.log('this one', this.props.currentBet.length);
      return <div className="currentbets">
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
  }

  render(){
      if (this.state.fetched === false){
        return <div >
                  <img className = "loading" src = "https://orig00.deviantart.net/b83e/f/2010/122/a/8/loading____please_wait_by_cyanide_cloud.png"/>
               </div>
      }

      if (this.state.displayComments === true){
        return <div >
               <button className = "exit" onClick = { () => { this.exitComments() } } > X </button>
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
            <div className = "betscontain" >

             { this.currentBetsWithoutChat() }

            </div>
          );
      }

      else {
          return(
            <div className = "betscontain">

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
