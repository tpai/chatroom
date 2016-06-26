import update from "react-addons-update";

export const GET = 'chatroom/messageList/GET';

export const reducer = (state = [], action) => {
    switch(action.type) {
        case GET:
            return update(state, {$set: action.messageList});
        default:
            return state;
    }
}

export default reducer;

export const getMessageList = messageList => {
    return {
        type: GET,
        messageList: messageList
    }
}
