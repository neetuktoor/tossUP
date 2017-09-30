import React from 'react';

class betItem extends React.Component {
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
      return <div> 
        Hello
        </div>
      
    }
    return <div> </div>
  }

  render(){
    return <div>{ this.renderCurrentBets() }</div>
  }
}
  

export default betItem;
