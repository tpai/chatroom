import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";

import { UserList } from "../components/List";

export class Join extends Component {
	render() {
		return (
			<div>
				<input type="text" placeholder="Username" />
				{' '}
				<button>Join</button>
				<UserList users={[{name: "user1"}, {name: "user2"}]} />
			</div>
		)
	}
}

export default connect()(Join);