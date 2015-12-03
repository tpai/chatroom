export const GET_CHANNEL_LIST = "GET_CHANNEL_LIST";
export const getChannelList = (channelList) => {
	return {
		type: GET_CHANNEL_LIST,
		channelList: channelList
	};
};