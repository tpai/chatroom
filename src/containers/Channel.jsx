import React, { Component, PropTypes } from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";

import UserInput from "../components/UserInput";
import { MessageList } from "../components/List";
import { sendMessage } from "../actions/socket";

export class Channel extends Component {
    onMessageSend(e) {
        e.preventDefault();
        const { dispatch, current } = this.props;
        const msgDOM = ReactDOM.findDOMNode(this.refs.userInput.refs.msg);
        const msgText = msgDOM.value;
        const msg = {
            user: current.user,
            channelId: current.channel.id,
            text: msgText
        };
        dispatch(sendMessage(msg));
        msgDOM.value = "";
    }
    render() {
        const { current, messageList } = this.props;
        return (
            <div>
                <UserInput
                    ref="userInput"
                    current={current}
                    onMessageSend={this.onMessageSend.bind(this)}
                    />
                <MessageList
                    messageList={messageList}
                    />
            </div>
        )
    }
}

Channel.PropTypes = {
    current: PropTypes.object.required
}

const mapStateToProps = state => {
    return {
        current: {
            user: state.userData.name,
            channel: state.currentChannel
        },
        messageList: state.messageList
    }
}

export default connect(mapStateToProps)(Channel);
