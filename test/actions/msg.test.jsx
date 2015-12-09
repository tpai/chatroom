import expect from "expect";
import { GET_MESSAGE_LIST, getMessageList } from "src/actions/msg";

describe("Action::msg", () => {
    it("#getMessageList()", () => {
        const expectedAction = {
            type: GET_MESSAGE_LIST,
            messageList: [{
                _id: "oxox",
                channelId: 1,
                text: "Yo!",
                user: "Man"
            }]
        };

        expect(
            getMessageList([{
                _id: "oxox",
                channelId: 1,
                text: "Yo!",
                user: "Man"
            }])
        ).toEqual(expectedAction);
    })
})
