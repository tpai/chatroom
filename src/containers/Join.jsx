import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";

import { UserList } from "../components/list";
import { userJoin } from "../actions/user";
import { socket } from "../../index";

export class Join extends Component {
	constructor(props) {
		super(props);
	}
	componentDidMount() {
		socket.emit("get user list");
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
		userList: state.userList
	}
}

export default connect(mapStateToProps)(Join);