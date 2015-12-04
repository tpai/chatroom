import { SET_USER_DATA, GET_USER_LIST } from "../actions/user";

export const userData = (state = {}, action) => {
    switch(action.type) {
        case SET_USER_DATA:
            return action.userData;
        default:
            return state;
    }
};

export const userList = (state = [], action) => {
	switch(action.type) {
		case GET_USER_LIST:
			return action.userList;
		default:
			return state;
	}
};
