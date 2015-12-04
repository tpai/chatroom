import { GET_CHANNEL_LIST } from "../actions/channel";

export const channelList = (state = [], action) => {
	switch(action.type) {
		case GET_CHANNEL_LIST:
			return action.channelList;
		default:
			return state;
	}
};

import { SET_CURRENT_CHANNEL } from "../actions/channel";

export const currentChannel = (state = "", action) => {
    switch(action.type) {
        case SET_CURRENT_CHANNEL:
            return action.channel;
        default:
            return state;
    }
};
