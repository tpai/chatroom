export const SET_USER_DATA = "SET_USER_DATA";
export const setUserData = userData => {
	return {
		type: SET_USER_DATA,
		userData: userData
	};
};

export const GET_USER_LIST = "GET_USER_LIST";
export const getUserList = userList => {
	return {
		type: GET_USER_LIST,
		userList: userList
	};
};
