import { GET_CHANNEL_LIST } from "../actions/channel";

export const channelList = (state = [], action) => {
	switch(action.type) {
		case GET_CHANNEL_LIST:
			return action.channelList;
		default:
			return state;
	}
};

import objectAssign from "object-assign";
import { SET_CURRENT_CHANNEL } from "../actions/channel";
import { SET_USER_DATA } from "../actions/user";

export const currentChannel = (state = {}, action) => {
    switch(action.type) {
        case SET_USER_DATA:
            return objectAssign({}, state, {
                id: action.userData.channelId,
                name: ""
            });
        case SET_CURRENT_CHANNEL:
            return action.currentChannel;
        default:
            return state;
    }
};
