import { FETCH_USER_INFO, USER_ERROR } from '../actions';

const initialState = {
	displayName: 'No Namer',
	email: 'nonamer@nonameyet.com',
	profileURL: '../style/images/Nopic.png',
	error : null
};

export default function user(state = initialState, action){
	switch(action.type){
		case FETCH_USER_INFO:
			if (action.payload.displayName !== null){
				let displayName = action.payload.displayName;
			} else{
				displayName = 'No Namer';
			}

			if (action.payload.photoURL !== null){
				let profileURL =  action.payload.photoURL;
			} 
			else {
				profileURL = '../style/images/Nopic.png';
			}

			let email = action.payload.emailVerified;
			
			return {
				displayName: displayName,
				email: email,
				profileURL: profileURL
			};

		case USER_ERROR: 
			return {
				...state,
				error: action.payload.message
			}

		default:

			return state;

	}
}