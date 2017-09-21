import { CREATE_BET, ADD_TO_USER } from '../actions';

export default function (state={}, action) {
	switch(action.type){

		case CREATE_BET:
      var displayTitle = action.payload.title;
      var displayDescription = action.payload.description;
      var displayDate = action. payload.date;
      var addUser = action.payload.addUser;
      var displayPrize = action.payload.prize;

    case ADD_TO_USER:
      var displayTitle = action.payload.title;



    default:

      return state;

  }
}
