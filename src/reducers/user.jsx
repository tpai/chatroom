import { GET_USER_LIST } from "../actions/user";

export const userList = (state = [], action) => {
	switch(action.type) {
		case GET_USER_LIST:
			return action.userList;
		default:
			return state;
	}
};