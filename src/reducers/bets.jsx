import {FETCH_BETS, SELECT_BET, FETCH_SELECTED_DETAILS} from '../actions';

const initialState = {
  currentBets: [{title: '', date: '', prize: '', p1: '', p1pic: '', p2: '', p2pic: ''}],
  selectedBet: '',
  selectedDetails: {title: '', inviterpic: '', invitername: '', date: '', prize: '', invitedpic: '', invitedname: '', details: '', winner: ''}
}

export default function bets (state = initialState, action) {
  switch(action.type){
    case FETCH_BETS:
      return {
        ...state,
        currentBets: action.payload
      }
    case SELECT_BET:
      return {
        ...state,
        selectedBet: action.payload
      }
    case FETCH_SELECTED_DETAILS:
      return{
        ...state,
        selectedDetails: action.payload
      } 
    default:
      return state;
  }
}
