import { GET_MESSAGE_LIST } from "../actions/msg";

export const messageList = (state = [], action) => {
    switch(action.type) {
        case GET_MESSAGE_LIST:
            return action.messageList;
           // return action.messageList.filter(msg => state.indexOf(msg) === -1).concat(state)
        default:
            return state;
    }
};
