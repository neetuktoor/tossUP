import React from 'react';

class BetItem extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      responded: false,
    }
  }

  selectBet(){
    //change the state of the selected Bet
    this.props.SelectBet(this.props.bets);
    this.props.ShowBet();
  }


  renderCurrentBets = () => {
    if ( this.props.bets.title === ''){
      return <div> </div>
    }

    else if (this.state.responded === false){
      return <div className = "currentbets" onClick = { () => { this.selectBet() } } >
        <h2 className="betTitle"> {this.props.bets.title } </h2>
        <div className = "participants"> { this.props.bets.p1 }   vs   { this.props.bets.p2 } </div>
        <div className = "profiles"> <img className= "profilePic" src = { this.props.bets.p1pic }></img> vs <img className= "profilePic2" src = { this.props.bets.p2pic }></img>
        <h5 className="prizeText"> Prize : { this.props.bets.prize } </h5> </div>
        </div>

    }
    return <div>  </div>
  }


  render(){
    return <div>{ this.renderCurrentBets() }</div>
  }
}


export default BetItem;
