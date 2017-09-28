import {FETCH_BETS} from '../actions';

const initialState = {
  currentBets: [{bet: '', prize: '', participant1: '', participant2: ''}]
}

export default function bets (state = initialState, action) {
  switch(action.type){
    case FETCH_BETS:
      return {
        ...state,
        currentBets: action.payload
      }

    default:
      return state;
  }
}
