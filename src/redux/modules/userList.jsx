export const GET = 'chatroom/userList/GET';

const reducer = (state = [], action) => {
    switch(action.type) {
        case GET:
            return action.userList;
        default:
            return state;
    }
}

export default reducer;

export const getUserList = userList => {
    return {
        type: GET,
        userList: userList
    }
}
