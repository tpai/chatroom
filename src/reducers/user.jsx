import { USER_JOIN, GET_USER_LIST } from "../actions/user";

export const currentUser = (state = "", action) => {
    switch(action.type) {
        case USER_JOIN:
            return action.currentUser;
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
