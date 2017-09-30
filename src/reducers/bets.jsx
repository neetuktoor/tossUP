import {FETCH_BETS} from '../actions';

const initialState = {
  currentBets: [{title: '', date: '', prize: '', p1: '', p1pic: '', p2: '', p2pic: ''}]
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
