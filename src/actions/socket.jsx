import { socket } from "../../socket.io";

export const SET_CURRENT_CHANNEL = "SET_CURRENT_CHANNEL";
export const setCurrentChannel = channel => {
    socket.emit("set current channel", channel.id);
    return {
        type: SET_CURRENT_CHANNEL,
        currentChannel: {
            id: channel.id,
            name: channel.name
        }
    };
};

export const SEND_MESSAGE = "SEND_MESSAGE";
export const sendMessage = msg => {
    socket.emit("send message", msg);
    return {
        type: SEND_MESSAGE
    };
};
