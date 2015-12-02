import React, { Component } from "react";
import { render } from "react-dom";
import { Router, Route } from "react-router";

import Join from "./src/containers/Join";

export default class AppRouter extends Component {
	render() {
		return (
			<Router history={this.props.history}>
				<Route path="/" component={Join} />
			</Router>
		);
	}
}