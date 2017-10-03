import {FETCH_BETS, SELECT_BET} from '../actions';

const initialState = {
  currentBets: [{title: '', date: '', prize: '', p1: '', p1pic: '', p2: '', p2pic: ''}],
  selectedBet: ''
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

    default:
      return state;
  }
}
