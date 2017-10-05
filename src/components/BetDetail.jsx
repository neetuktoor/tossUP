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

  addWinner(winner){
    if (winner === this.props.betDetails.invitername){
      this.props.inviterWon(winner);
    }
    else{
      this.props.invitedWon(winner);
    }

  }

  renderDetails = () => {
    console.log("winner", this.props.betDetails.winner );
    if (this.props.betDetails.winner === undefined){
     return <div className = "profiles" >
            <h2> { this.props.betDetails.title } <button className = "exit" onClick = { () => { this.exitDetails() } } > X </button></h2>
            <div className = 'participantsdetail'> <img className="profilePic" src = { this.props.betDetails.inviterpic }/> VS <img className="profilePic" src = { this.props.betDetails.invitedpic }/></div>
            <div className = 'p1detail'> { this.props.betDetails.invitername }  </div> <div className = 'p2detail'> { this.props.betDetails.invitedname }  </div>
            <div className = "prizeText"> Prize: { this.props.betDetails.prize }</div>
            <div className = "datedetails"> EndDate: { this.props.betDetails.date }</div>
            <div className = "winner"> Winner: <button onClick = { () =>{ this.addWinner(this.props.betDetails.invitername) } }  > Add { this.props.betDetails.invitername } as winner to this match! </button><button onClick = { () =>{ this.addWinner(this.props.betDetails.invitedname) } }> Add { this.props.betDetails.invitedname } as winner to this match! </button></div>
            <div className = "description"> { this.props.betDetails.details } </div>
            </div>
    } else{
      return <div className = "profiles" >
            <h2> { this.props.betDetails.title } <button className = "exit" onClick = { () => { this.exitDetails() } } > X </button></h2>
            <div className = 'participantsdetail'> <img className="profilePic" src = { this.props.betDetails.inviterpic }/> VS <img className="profilePic" src = { this.props.betDetails.invitedpic }/></div>
            <div className = 'p1detail'> { this.props.betDetails.invitername }  </div> <div className = 'p2detail'> { this.props.betDetails.invitedname }  </div>
            <div className = "prizeText"> Prize: { this.props.betDetails.prize }</div>
            <div className = "datedetails"> EndDate: { this.props.betDetails.date }</div>
            <div className = "winner"> Winner: { this.props.betDetails.winner }</div>
            <div className = "description"> { this.props.betDetails.details } </div>
            </div>
    }
  }


  render(){
    if (this.state.fetchedDetails === false){
      return <img src = '../style/images/loading.jpg'/>
    }

    if (this.state.displayComments === true){

      return <div>
             { this.renderDetails() }
             <button className="expand" onClick = { () => { this.exitComments() } } > - </button>
             <Comments />
            </div>
    }


      return <div>
                { this.renderDetails() }
                <button className="expand" onClick = { () => { this.openComments() } } > ^ </button>
          </div>
    }


}

function mapStateToProps(state) {

    return {
      betDetails: state.bets.selectedDetails
    };
}


export default connect (mapStateToProps, null) (BetDetail);
