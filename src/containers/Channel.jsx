import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import socket from 'client.socket';
import UserInput from 'components/UserInput';
import { MessageList } from 'components/List';

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
        socket.emit('send message', msg);
        msgDOM.value = '';
    }
    componentWillReceiveProps(nextProps) {
        const { history } = this.props;
        // it'll reset path if reconnect after disconnect
        if(nextProps.current.channel.id === -1)
            history.replaceState(null, `/`);
    }
    render() {
        const { current, messageList } = this.props;
        return (
            <div>
                <button onClick={this.onBackClick}>Back To Lobby</button>
                <hr />
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
    onBackClick = e => {
        e.preventDefault();
        const { router } = this.props;
        router.push({ pathname: '/' });
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

export default connect(mapStateToProps)(withRouter(Channel));
