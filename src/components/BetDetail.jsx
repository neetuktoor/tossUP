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

    console.log("winner", this.props.betDetails.winner );
    if (this.props.betDetails.winner === ""){
     return <div className = "profiles container" >
            <h2 className="betTitle2"> { this.props.betDetails.title } <button className = "exitDeets" onClick = { () => { this.exitDetails() } } > X </button></h2>
            <img className="hProfilePic" src = { this.props.betDetails.inviterpic }/> VS <img className="hProfilePic2" src = { this.props.betDetails.invitedpic }/>
            <div className = "pps"> <strong>Participant 1: </strong> { this.props.betDetails.invitername }<strong>          Participant 2: </strong> { this.props.betDetails.invitedname }  </div>
            <div className = "row six">
              <div className = "detailText hello1 col-md-4"> <img src = "../style/images/trophy2.png"/><strong>Prize: </strong> { this.props.betDetails.prize } </div>
              <div className = "detailText hello2 col-md-4"> <img src = "../style/images/edit-icon.png"/><strong> Terms: </strong>{ this.props.betDetails.details }</div></div>
            <div className = "detailText"> <strong>Winner: </strong> <button className="addW" onClick = { () =>{ this.addWinner(this.props.betDetails.invitername) } }  > Add { this.props.betDetails.invitername } as winner! </button><button className="addW" onClick = { () =>{ this.addWinner(this.props.betDetails.invitedname) } }> Add { this.props.betDetails.invitedname } as winner! </button></div>

            <div className = "endDateText"> <strong>End Date: </strong> { this.props.betDetails.date }</div>

           </div>
    } else{
      return <div className = "profiles" >
            <h2 className="betTitle2"> { this.props.betDetails.title } <button className = "exitDeets" onClick = { () => { this.exitDetails() } } > X </button></h2>
            <img className="hProfilePic" src = { this.props.betDetails.inviterpic }/> VS <img className="hProfilePic2" src = { this.props.betDetails.invitedpic }/>
            <div className = "pps"> <strong>Participant 1: </strong> { this.props.betDetails.invitername } <strong>         Participant 2: </strong> { this.props.betDetails.invitedname }  </div>
            <div className = "row six">
              <div className = "detailText hello1 col-md-4"> <img src = "../style/images/trophy2.png"/><strong>Prize: </strong> { this.props.betDetails.prize } </div>
              <div className = "detailText hello2 col-md-4"> <img src = "../style/images/edit-icon.png"/><strong> Terms: </strong>{ this.props.betDetails.details }</div></div>
            <div className = "detailText"> <strong>Winner: </strong>{ this.props.betDetails.winner }</div>
            <div className = "endDateText"> <strong>End Date: </strong> { this.props.betDetails.date }</div>
            </div>
    }
  }


  render(){
    if (this.state.fetchedDetails === false){
      return <img src = '../style/images/loading.jpg'/>
    }

    if (this.state.displayComments === true){

      return <div className="detailsContainer">
             { this.renderDetails() }
             <button className="expand" onClick = { () => { this.exitComments() } } > - </button>
             <Comments />
            </div>
    }


      return <div className="detailsContainer">
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
