import { CREATE_BET } from '../actions';

export default function (state={}, action) {
	switch(action.type){
		case FETCH_USER_INFO:
    if (action.payload.title ){
      var displayTitle = action.payload.title;
    }
    // }else{
    //
    // }
    //
    // if (action.payload.prize ){
    //   var displayPrize = action.payload.prize;
    //
    // }else{
    //
    // }
    //
    // if (action.payload.date ){
    //   var displayDate = action.payload.date;
    //
    // }else{
    //
    // }
    //
    //   if(action.payload.addUser) {
    //     var displayUser = action.payload.addUser;
    //   }

     return {
       displayTitle: displayTitle,
      //  displayPrize: displayPrize,
      //  displayDate: displayDate,
      //  displayUser: displayUser

    };

    default:

      return state;

  }
}
