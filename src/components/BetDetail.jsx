import React from 'react';
import { connect } from 'react-redux';

import Comments from './Comments';

class BetDetail extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      fetchedDetails: false,
      displayComments: true,
    }

    this.props.fetchDetails();
    
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.betDetails){
      this.setState({ fetchedDetails: true});
    }
  }

  exitDetails(){
    this.props.exOut();
  }

  exitComments(){
    console.log("hello");
    this.setState({ displayComments: false });
  }

  openComments(){
    this.setState({ displayComments: true } );
  }


  renderDetails = () => {
    return <div>
          <h2> { this.props.betDetails.title } <button className = "exit"> <img src = "https://cdn2.iconfinder.com/data/icons/interface-part-1/32/circle-ex-512.png" onClick = { () => { this.exitDetails() } } />  </button></h2>
          <div className = 'participantsdetail'> <img src = { this.props.betDetails.inviterpic }/> VS <img src = { this.props.betDetails.invitedpic }/></div>
          <div className = 'p1detail'> { this.props.betDetails.invitername }  </div> <div className = 'p2detail'> { this.props.betDetails.invitedname }  </div> 
          <div className = "prizedetails"> Prize: { this.props.betDetails.prize }</div>
          <div className = "datedetails"> EndDate: { this.props.betDetails.date }</div>
          <div className = "winner"> Winner: <button> Add winner </button></div>
          <div className = "description"> { this.props.betDetails.details } </div>
          </div>
  }


  render(){
    if (this.state.fetchedDetails === false){
      return <img src = '../style/images/loading.jpg'/>
    }

    if (this.state.displayComments === true){

      return <div>
             { this.renderDetails() }
             <button><img className = "minimize" src = '../style/images/minimize.png' onClick = { () => { this.exitComments() } } /></button>
             <Comments />
            </div>
    }

    
      return <div>
                { this.renderDetails() }
                <button> <img className = "openchat" src = '../style/images/arrow-141-512.jpg' onClick = { () => { this.openComments() } } /></button>
          </div>
    }
  

}

function mapStateToProps(state) {

    return {
      betDetails: state.bets.selectedDetails
    };
}
  

export default connect (mapStateToProps, null) (BetDetail);
