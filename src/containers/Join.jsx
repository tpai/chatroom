import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";

import { UserList, ChannelList } from "../components/List";
import { userJoin } from "../actions/user";
import { socket } from "../../index";

export class Join extends Component {
	constructor(props) {
		super(props);
	}
	componentDidMount() {
		socket.emit("get user list");
		socket.emit("get channel list");
	}
	onJoinClick() {
		const { dispatch } = this.props;
		let usernameInput = this.refs.username;
		dispatch(userJoin(usernameInput.value));
		usernameInput.value = "";
	}
	render() {
		return (
			<div>
				<ChannelList withRef="channel" channels={this.props.channelList} />
				{' '}
				<input type="text" ref="username" placeholder="Username" />
				{' '}
				<button onClick={this.onJoinClick.bind(this)}>Join</button>
				<h4>Online User</h4>
				<UserList users={this.props.userList} />
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