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
    console.log("winner this ", this.props.betDetails );
    if (this.props.betDetails.winner === ""){
     return <div className = "container profiles" >
              <div className = "row">
                <h2 className= "col-md-12"> { this.props.betDetails.title } <button className = "exitDeets" onClick = { () => { this.exitDetails() } } > X </button></h2>
              </div>
              <div className = "row against">
                <div className="col-md-5"><img  className = "hProfilePic" src = { this.props.betDetails.inviterpic }/><div className = "row">{ this.props.betDetails.invitername }</div></div>
                <div className = "col-md-2">VS</div> <div className = "col-md-5"><img className = "hProfilePic2" src = { this.props.betDetails.invitedpic }/><div className = "row">{ this.props.betDetails.invitedname }</div></div>
              </div>
            
            <div className = "row">  
              <div className = " col-md-6"> Prize: { this.props.betDetails.prize }</div>
              <div className = " col-md-6"> Terms: { this.props.betDetails.details } </div>
            </div>
            <div className = ""> EndDate: { this.props.betDetails.date }</div>
            <div className = "row">
              <div className = " col-md-12"> Winner: <button onClick = { () =>{ this.addWinner(this.props.betDetails.invitername) } }  > Add { this.props.betDetails.invitername } as winner to this match! </button><button onClick = { () =>{ this.addWinner(this.props.betDetails.invitedname) } }> Add { this.props.betDetails.invitedname } as winner to this match! </button></div>
            </div>
            </div>
    } else{
      return <div className = "profiles" >
            <h2 className="betTitle2"> { this.props.betDetails.title } <button className = "exitDeets" onClick = { () => { this.exitDetails() } } > X </button></h2>
            <div className = 'prizeText'> <img className="hProfilePic" src = { this.props.betDetails.inviterpic }/> VS <img className="hProfilePic2" src = { this.props.betDetails.invitedpic }/></div>
            <div className = 'prizeText'> { this.props.betDetails.invitername }  </div> <div className = 'prizeText'> { this.props.betDetails.invitedname }  </div>
            <div className = "prizeText"> Prize: { this.props.betDetails.prize }</div>
            <div className = "prizeText"> EndDate: { this.props.betDetails.date }</div>
            <div className = "prizeText"> Winner: { this.props.betDetails.winner }</div>
            <div className = "prizeText"> { this.props.betDetails.details } </div>
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
