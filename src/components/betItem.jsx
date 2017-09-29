import React from 'react';

class betItem extends React.Component {
  constructor(props){
    super(props);

    console.log("is it in here");
  }

  renderCurrentBets = () => {

    if ( this.props.bet.title === ''){
      return <div> You dont seem to like gambling. Make a bet if you do! </div>
    }

    return <div>
        <h2> { this.props.bets.title } </h2>
        <h3>  {this.props.bets.p1} vs. {this.props.bets.p2}</h3>
        <div className = 'p1'> { this.props.bets.p1pic } </div> <div className = 'p2'> { this.props.bet.p2pic } </div>
        Prize: { this.props.bets.prize } </div>
  }


  render(){
    return <div> { this.renderCurrentBets() } </div>
  }
}

export default betItem;
