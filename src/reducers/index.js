import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as FormReducer } from 'redux-form';


//when action creators fire signInUser or signOutUser, returns authenticated true or false
// and is imported into reducers to send out state
import AuthReducer from './auth';
import UserReducer from './user';
import NotifsReducer from './notifs';
import BetsReducer from './bets';
import CommentsReducer from './comments';

//combines all the reducers to export

const rootReducer = combineReducers ({
	form: FormReducer,
	router: routerReducer,
	auth: AuthReducer,
	user: UserReducer,
	notifs: NotifsReducer,
  	bets: BetsReducer,
  	comments: CommentsReducer
});

export default rootReducer;

