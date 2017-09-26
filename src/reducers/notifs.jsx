import { FETCH_INVITE_NOTIFICATIONS } from '../actions';

const initialState = {
	invited: null
}
export default function notifications (state = initialState, action){
	switch(action.type){
		case FETCH_INVITE_NOTIFICATIONS:
			return {
				...state,
				invited: action.payload
			}

		default:
		
			return state;
	}
}