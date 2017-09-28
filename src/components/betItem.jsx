import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../actions';
import { BrowserRouter, Redirect } from 'react-router-dom';

class betItem extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      fetched: false
    }
  }

  renderBetItem = () => {
    console.log("bet item", this.state.responded)
        if (!this.state.fetched) {
          return <img src = '../style/images/loading.jpg'/>
        }
          return <div> booioi </div>
        }

        render(){
          return <div> { this.renderBetItem() } </div>
        }
}

export default betItem;
