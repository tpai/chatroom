import update from "react-addons-update";
import { GET_MESSAGE_LIST } from "../actions/msg";

export const messageList = (state = [], action) => {
    switch(action.type) {
        case GET_MESSAGE_LIST:
            return update(state, {$set: action.messageList});
        default:
            return state;
    }
};
