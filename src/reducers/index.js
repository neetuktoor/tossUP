import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as FormReducer } from 'redux-form';

//when action creators fire signInUser or signOutUser, returns authenticated true or false 
// and is imported into reducers to send out state
import AuthReducer from './auth';


//combines all the reducers to export 
const rootReducer = combineReducers ({
	form: FormReducer,
	router: routerReducer,
	auth: AuthReducer
});

export default rootReducer;
 