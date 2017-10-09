import { createStore, compose, applyMiddleware } from 'redux'; //getting applyMiddleware to use redux promise
//what redux thunk does is forces action creator to hold off on dispatching action objec
//it resolves the promise and gives us actual result of the call
//Also, swhen calling dispatch an an action object to send to reducer, we can call dispatch to call another action creator function

import reduxThunk from 'redux-thunk';
import rootReducer from '../reducers';
import * as Actions from '../actions';


export default function configureStore(initialState){
	const store = createStore(
		rootReducer,
		initialState,

		compose (
				applyMiddleware(reduxThunk), //this is where we are passing the reduxpromise
				window.devToolsExtension ? window.devToolsExtension() : f => f
			)
		);

	if (module.hot) {
		module.hot.accept('../reducers', () => {
			const nextRootReducer = require('../reducers').default;
			store.replaceReducer(nextRootReducer);
		});
	}

	store.dispatch(Actions.verifyAuth());

	
	return store; 
}
