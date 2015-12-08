import React, { Component } from "react";

export default class UserInput extends Component {
    render() {
        const {
            current,
            onMessageSend
        } = this.props;
        return (
            <form onSubmit={onMessageSend}>
                <span>{current.user}在{current.channel.name}</span>
                {' '}
                <input type="text" ref="msg" />
                {' '}
                <button>Send</button>
            </form>
        )
    }
}
