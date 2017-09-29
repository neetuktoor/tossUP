import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../actions';
import { BrowserRouter, Redirect } from 'react-router-dom';

class betItem extends React.Component {
  constructor(props){
    super(props);
<<<<<<< HEAD

  }

=======
    
  }

>>>>>>> 19bdba714e4442daf19d04d416379da49f3354c4
  render(){
    return(
      <div>
        <h2> { this.props.bet.bet } </h2>
        <h3>{this.props.bet.participant1} vs. {this.props.bet.participant2}</h3>
        Prize: { this.props.bet.prize }
      </div>
    );
  }
}

export default betItem;
