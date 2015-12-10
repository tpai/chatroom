import React, { Component } from "react";
import { render } from "react-dom";
import { Router, Route, History } from "react-router";

import Join from "./src/containers/Join";
import Channel from "./src/containers/Channel";

export default class AppRouter extends Component {
	render() {
		return (
			<Router>
				<Route path="/" component={Join} history={History} />
				<Route path="/channel/:id" component={Channel} history={History} />
			</Router>
		);
	}
}
