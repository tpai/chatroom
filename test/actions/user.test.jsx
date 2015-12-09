import expect from "expect";
import {
    SET_USER_DATA, setUserData,
    GET_USER_LIST, getUserList
} from "src/actions/user";

describe("Action::user", () => {
    it("#setUserData()", () => {
        const expectedAction = {
            type: SET_USER_DATA,
            userData: {
                id: "oxox",
                name: "Who"
            }
        };

        expect(
            setUserData({
                id: "oxox",
                name: "Who"
            })
        ).toEqual(expectedAction);
    })

    it("#getUserList()", () => {
        const expectedAction = {
            type: GET_USER_LIST,
            userList: [{
                id: "oxox",
                name: "Who"
            }]
        };

        expect(
            getUserList([{
                id: "oxox",
                name: "Who"
            }])
        ).toEqual(expectedAction);
    })
})
