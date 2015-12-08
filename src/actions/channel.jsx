import { socket } from "../../index";

export const GET_CHANNEL_LIST = "GET_CHANNEL_LIST";
export const getChannelList = channelList => {
	return {
		type: GET_CHANNEL_LIST,
		channelList: channelList
	};
};
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
