import { SET_CURRENT_CHANNEL } from "../actions/socket";

export const currentChannel = (state = {}, action) => {
    switch(action.type) {
        case SET_CURRENT_CHANNEL:
            return action.currentChannel;
        default:
            return state;
    }
};
