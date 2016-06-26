import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import { UserListCount, ChannelList } from 'components/List';
import { setCurrentChannel } from 'redux/modules/currentChannel';

export class Join extends Component {
    constructor(props) {
        super(props);
    }
    onJoinClick() {
        const { dispatch, router } = this.props;
        let selectChannel = ReactDOM.findDOMNode(this.refs.channel);
        let index = selectChannel.selectedIndex;
        let options = selectChannel.options;
        let channelId = options[index].value;
        let channelName = options[index].textContent;
        dispatch(setCurrentChannel({
            id: channelId,
            name: channelName
        }));
        router.push({ pathname: `/channel/${channelId}` });
    }
    render() {
        return (
            <div>
                <ChannelList ref="channel" channels={this.props.channelList} />
                {' '}
                <button onClick={this.onJoinClick.bind(this)}>Join</button>
                {' '}
                <UserListCount users={this.props.userList} />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        userList: state.userList,
        channelList: state.channelList
    }
}

export default connect(mapStateToProps)(withRouter(Join));
