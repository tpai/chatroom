export const GET_MESSAGE_LIST = "GET_MESSAGE_LIST";
export const getMessageList = messageList => {
    return {
        type: GET_MESSAGE_LIST,
        messageList: messageList
    };
};
