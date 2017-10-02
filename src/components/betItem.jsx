import React from 'react';

class BetItem extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      responded: false
    }
  }


  renderCurrentBets = () => {
    if ( this.props.bets.title === ''){
      return <div> </div>
    }

    else if (this.state.responded === false){
      return <div className = "currentbets" > 
        <h2> {this.props.bets.title } </h2>
        <div className = "participants"> { this.props.bets.p1 } vs { this.props.bets.p2 } </div>
        <div className = "profiles"> <img src = { this.props.bets.p1pic }></img> vs <img src = { this.props.bets.p2pic }></img> </div>
        Prize : { this.props.bets. prize }
        </div>
      
    }
    return <div>  </div>
  }


  render(){
    return <div>{ this.renderCurrentBets() }</div>
  }
}
  

export default BetItem;
