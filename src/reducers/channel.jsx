import { GET_CHANNEL_LIST } from "../actions/channel";

export const channelList = (state = [], action) => {
	switch(action.type) {
		case GET_CHANNEL_LIST:
			return action.channelList;
		default:
			return state;
	}
};