import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";

export class Chanel extends Component {
    render() {
        const { currentUser, currentChannel } = this.props;
		return (
			<div>
				<h1>{currentUser}@{currentChannel}&gt;</h1>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
    return {
        currentUser: state.userData.name,
        currentChannel: state.currentChannel
    }
}

export default connect(mapStateToProps)(Chanel);
