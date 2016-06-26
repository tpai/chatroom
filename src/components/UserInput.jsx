import React, { Component } from 'react';
import _ from 'lodash';

export default class UserInput extends Component {
    render() {
        const {
            current,
            onMessageSend
        } = this.props;
        return (
            <form onSubmit={onMessageSend}>
                <div>{current.user} is in {_.lowerCase(current.channel.name)} channel.</div>
                <br />
                <input type="text" ref="msg" />
                {' '}
                <button>Say</button>
            </form>
        )
    }
}
