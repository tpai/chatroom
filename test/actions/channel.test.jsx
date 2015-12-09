import expect from "expect";
import { GET_CHANNEL_LIST, getChannelList } from "src/actions/channel";

describe("Action::channel", () => {
    it("#getChannelList()", () => {
        const expectedAction = {
            type: GET_CHANNEL_LIST,
            channelList: [{
                _id: "oxox",
                id: 1,
                name: "general"
            }]
        };

        expect(
            getChannelList([{
                _id: "oxox",
                id: 1,
                name: "general"
            }])
        ).toEqual(expectedAction);
    })
})
