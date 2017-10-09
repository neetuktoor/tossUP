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
			console.log(action.payload.username);
			if (action.payload.username ){
				var displayName = action.payload.username;

			} else{

			}

			if (action.payload.profile_picture){
				var profileURL =  action.payload.profile_picture;

			}

			else {
				profileURL = '../style/images/Nopic.png';
			}
			if( action.payload.email){
				var email = action.payload.email;
			}
			else {
				email = 'nonamer@nonameyet.com';
			}

			// console.log("Displayname and profilepic", displayName, profileURL);

			return {
				displayName: displayName,
				email: email,
				profileURL: profileURL
			};

		case USER_ERROR:
			return {
				...state,
				error: action.payload.error

			}

		default:

			return state;

	}
}

