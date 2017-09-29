import { FETCH_INVITE_NOTIFICATIONS, FETCH_ACCEPTED_NOTIFICATIONS, FETCH_DECLINED_NOTIFICATIONS } from '../actions';

const initialState = {
	invited: [{bet: '', inviter: 'No namer', betid: '', inviterid: ''}],
	accepted: [{bet: '', invited: 'No namer', betid: '', invitedid: ''}],
	declined: [{bet: '', invited: 'No namer', betid: '', invitedid: ''}]
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
		case FETCH_DECLINED_NOTIFICATIONS:
			
			return{
				...state,
				declined: action.payload
			}

		default:

			return state;
	}
}
