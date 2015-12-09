import { SET_CURRENT_CHANNEL } from "../actions/socket";
import { SET_USER_DATA } from "../actions/user";

export const currentChannel = (state = {}, action) => {
    switch(action.type) {
        case SET_USER_DATA:
            return Object.assign({}, state, {
                id: action.userData.channelId,
                name: ""
            });
        case SET_CURRENT_CHANNEL:
            return action.currentChannel;
        default:
            return state;
    }
};
