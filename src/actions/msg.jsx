import { socket } from "../../socket.io";

export const SEND_MESSAGE = "SEND_MESSAGE";
export const sendMessage = msg => {
    socket.emit("send message", msg);
    return {
        type: SEND_MESSAGE
    };
};

export const GET_MESSAGE_LIST = "GET_MESSAGE_LIST";
export const getMessageList = messageList => {
    return {
        type: GET_MESSAGE_LIST,
        messageList: messageList
    };
};
