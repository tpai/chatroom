export const SET = 'chatroom/userData/SET';

const reducer = (state = {}, action) => {
    switch(action.type) {
        case SET:
            return action.userData;
        default:
            return state;
    }
}

export default reducer;

export const setUserData = userData => {
    return {
        type: SET,
        userData: userData
    }
}
