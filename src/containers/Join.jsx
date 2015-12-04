import React, { Component, PropTypes } from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import { updatePath } from "redux-simple-router";

import { UserListCount, ChannelList } from "../components/List";
import { userJoin } from "../actions/user";
import { setCurrentChannel } from "../actions/channel";
import { socket } from "../../index";

export class Join extends Component {
	constructor(props) {
		super(props);
	}
	onJoinClick() {
		const { dispatch } = this.props;
        let selectChannel = ReactDOM.findDOMNode(this.refs.channel).value;
        dispatch(setCurrentChannel(selectChannel));
        dispatch(updatePath(`/channel/${selectChannel}`));
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

const mapStateToProps = (state) => {
	return {
		userList: state.userList,
		channelList: state.channelList
	}
}

export default connect(mapStateToProps)(Join);
