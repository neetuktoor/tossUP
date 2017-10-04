import {FETCH_COMMENTS} from '../actions';

const initialState = {
	comments: [{comment: '', username: '', userpic: '', id: ''}]
}

export default function comments (state = initialState, action){
	switch(action.type){
		case FETCH_COMMENTS:
			return{
				...state,
				comments: action.payload
			}

		default:
			return state;
	}
}