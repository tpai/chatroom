import { socket } from "../../index"; 

export const USER_JOIN = "USER_JOIN";
export const userJoin = (name) => {
	socket.emit("new user", { name: name });
	return {
		type: USER_JOIN,
		currentUser: name
	};
};

export const GET_USER_LIST = "GET_USER_LIST";
export const getUserList = (userList) => {
	return {
		type: GET_USER_LIST,
		userList: userList
	};
};