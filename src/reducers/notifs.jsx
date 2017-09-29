import { FETCH_INVITE_NOTIFICATIONS, FETCH_ACCEPTED_NOTIFICATIONS } from '../actions';

const initialState = {
	invited: [{bet: '', inviter: '', betid: '', inviterid: ''}],
	accepted: [{bet: '', invited: '', betid: '', invitedid: ''}]
}
export default function notifications (state = initialState, action){
	switch(action.type){
		case FETCH_INVITE_NOTIFICATIONS:
			return {
				...state,
				invited: action.payload
			}
		case FETCH_ACCEPTED_NOTIFICATIONS:
			return{
				...state,
				accepted: action.payload
			}

		default:

			return state;
	}
}
