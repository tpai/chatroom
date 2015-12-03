import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";

export class Chanel extends Component {
	render() {
		return (
			<div>
				<h1>Channel</h1>
			</div>
		)
	}
}

export default connect()(Chanel);