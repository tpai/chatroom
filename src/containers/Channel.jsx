import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";

export class Chanel extends Component {
    render() {
        const { currentChannel } = this.props;
		return (
			<div>
				<h1>{currentChannel}</h1>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
    return {
        currentChannel: state.currentChannel
    }
}

export default connect(mapStateToProps)(Chanel);
