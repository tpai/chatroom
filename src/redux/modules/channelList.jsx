export const GET = 'chatroom/channelList/GET';

const reducer = (state = [], action) => {
    switch(action.type) {
        case GET:
            return action.channelList;
        default:
            return state;
    }
};

export default reducer;

export const getChannelList = channelList => {
    return {
        type: GET,
        channelList: channelList
    };
};
