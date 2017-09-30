import React from 'react';

class betItem extends React.Component {
  constructor(props){
    super(props);

    console.log("is it in here");
  }

  render(){
    return <div> { this.renderCurrentBets() } </div>
  }
}

export default betItem;
