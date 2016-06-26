import React, { Component } from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';

import Lobby from 'containers/Lobby';
import Channel from 'containers/Channel';

export default class AppRouter extends Component {
    render() {
        return (
            <Router history={browserHistory}>
                <Route path="/" component={Lobby} />
                <Route path="/channel/:id" component={Channel} />
            </Router>
        );
    }
}
