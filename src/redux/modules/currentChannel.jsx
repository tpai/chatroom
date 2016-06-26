import objectAssign from 'object-assign';

import { SET as SET_USER_DATA } from 'redux/modules/userData';

export const SET = 'chatroom/currentChannel/SET';

const reducer = (state = {}, action) => {
    switch(action.type) {
        case SET_USER_DATA:
            return objectAssign({}, state, {
                id: action.userData.channelId,
                name: ''
            });
        case SET:
            return action.currentChannel;
        default:
            return state;
    }
}

export default reducer;

import socket from 'client.socket';

export const setCurrentChannel = channel => {
    socket.emit('set current channel', channel.id);
    return {
        type: SET,
        currentChannel: {
            id: channel.id,
            name: channel.name
        }
    };
};
